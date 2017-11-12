import { Site, dom, moduleLoader } from '/lib/core.static.js';

let css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ];
let loaded;
function loadMaterial(){
    if(!loaded)
        loaded=(async()=>{
            let module=await moduleLoader();
            await Promise.all([
                (async()=>{
                    dom.head(dom.style(
                        await Promise.all(css.map(s=>module.getByPath(s)))
                    ));
                })(),
                module.scriptByPath('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'),
            ]);
        })();
    return loaded
}

function mdcRaisedButton(name){
    return dom.button(
        {className:'mdc-button mdc-button--raised'},
        n=>{n.dataset.mdcAutoInit='MDCRipple';},
        name,
    )
}
function mdcSwitch(name){
    let node,input;
    node=dom.label(
        dom.span(
            {className:`mdc-switch`,},
            input=dom.input({
                type:'checkbox',
                className:'mdc-switch__native-control',
            }),
            dom.div({className:`mdc-switch__background`},
                dom.div({className:`mdc-switch__knob`}),
            ),
        ),
        ` ${name}`,
    );
    return{node,input}
}
function mdcTextdfield(name){
    let node,input;
    node=dom.label(
        dom.span(n=>{n.style.color='#888';},`${name}: `),
        {className:`
            mdc-textfield
            mdc-textfield--fullwidth
        `},
        n=>{n.dataset.mdcAutoInit='MDCTextfield';},
        input=dom.input({className:'mdc-textfield__input',}),
        dom.div({className:'mdc-textfield__bottom-line'}),
    );
    return{node,input}
}
function mdcTextdfieldTextarea(name){
    let node,input;
    node=dom.label(
        dom.span(n=>{n.style.color='#888';},`${name}: `),
        dom.span(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
                mdc-textfield--textarea
            `,},
            input=dom.textarea({className:'mdc-textfield__input',rows:8}),
        ),
    );
    return{node,input}
}
function createSiteNode(){
    return dom.div(
        (async()=>{
            let
                data=await this.send('blog_getData'),
                title=      mdcTextdfield('Title'),
                description=mdcTextdfield('Description'),
                bannerTitle=mdcTextdfieldTextarea('Banner Title (HTML)'),
                tagline=    mdcTextdfieldTextarea('Tagline (HTML)'),
                footer=     mdcTextdfieldTextarea('Footer (HTML)'),
                og=         mdcSwitch('Use open graph.'),
                apply=      mdcRaisedButton('Apply');
            title.input.value=data.title;
            description.input.value=data.description;
            bannerTitle.input.value=data.bannerTitle;
            tagline.input.value=data.tagline;
            footer.input.value=data.footer;
            og.input.checked=data.og;
            return dom.div(
                {className:'shadow content'},
                dom.p(title.node),
                dom.p(description.node),
                dom.p(bannerTitle.node),
                dom.p(tagline.node),
                dom.p(footer.node),
                dom.p(og.node),
                dom.p(
                    dom(apply,{onclick:async()=>{
                        data.title=title.input.value;
                        data.description=description.input.value;
                        data.bannerTitle=bannerTitle.input.value;
                        data.tagline=tagline.input.value;
                        data.footer=footer.input.value;
                        data.og=og.input.checked;
                        await this.send({
                            function:'blog_setData',
                            data,
                        });
                        alert('Applied.');
                    }})
                ),
                n=>{mdc.autoInit(n);},
            )
        })(),
    )
}

let site$1=new Site;
function TagsPage(){
    this.mainDiv=dom.div(async()=>{
        let data=await site$1.send('getTagsWithCount');
        return dom.table(
            {
                className:'bordered padding4px',
                innerHTML:`
                    <thead>
                        <tr>
                            <th>Tagname
                            <th>Count
                        </tr>
                    </thead>
                `
            },
            n=>{
                n.style.margin='0 auto';
            },
            data.map(tr_tag),
        )
    });
    function tr_tag(tag){
        return dom.tr(td_name(),td_count())
        function td_name(){
            let td=dom.td(a_name());
            td.style.fontFamily='Monospace';
            return td
        }
        function a_name(){
            let a=dom.a(tag.tagname);
            a.href='/tags/'+encodeURIComponent(tag.tagname);
            return a
        }
        function td_count(){
            let td=dom.td(tag.count);
            td.style.textAlign='right';
            return td
        }
    }
}

function createTagsNode(){
    let tagsPage=new TagsPage;
    return dom.div(
        dom.div(
            {className:'shadow content'},
            tagsPage.mainDiv,
        ),
    )
}

var style = `
.controlPanel .shadow{
    background-color:#fff;
    box-shadow:0 1px 4px rgba(0,0,0,.4);
}
.controlPanel .content{
    padding:16px;
}
.controlPanel .mdc-textfield.mdc-textfield--fullwidth.mdc-textfield--textarea textarea{
    resize:none;
}
.controlPanel>h2{
    margin-left:16px;
    cursor:default;
}
`;

function TreeUi(){
    this.array=[];
}
TreeUi.prototype._apply=function(e){
    dom(this._nodes.title,
        {innerHTML:'',},
        1<this.array.length&&[
            dom.a(
                {
                    className:`material-icons`,
                    onclick:()=>this.out()
                },
                n=>{
                    n.style.marginRight='8px';
                },
                'keyboard_backspace',
            ),
        ],
        e.title,
    );
    this.node.appendChild(e.node);
};
TreeUi.prototype.in=function(e){
    if(this.array.length)
        this.node.removeChild(this.array[this.array.length-1].node);
    this.array.push(e);
    this._apply(e);
};
TreeUi.prototype.out=function(){
    this.node.removeChild(this.array.pop().node);
    if(this.array.length)
        this._apply(this.array[this.array.length-1]);
};

let root=[
        {
            title:'Site',
            function:createSiteNode,
        },
        {
            title:'Tags',
            function:createTagsNode,
        },
    ];
function ControlPanel(){
    TreeUi.apply(this,arguments);
    this._nodes={};
    this.node=dom.div({className:'controlPanel'},
        this._nodes.title=dom.h2(),
    );
    this.in({
        title:'Blog Control Panel',
        node:dom.div({className:'shadow'},
            dom.ul({className:'mdc-list'},
                root.map(o=>
                    dom.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:o.title,
                                node:o.function.call(this),
                            }),
                        },
                        o.title,
                        dom.a({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    )
                ),
            )
        )
    });
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype);
ControlPanel.style=style;

let site=new Site;(async()=>{
    await loadMaterial();
    let controlPanel=new ControlPanel;
    controlPanel.send=site.send.bind(site);
    dom.head(dom.style(
        `
            body{
                margin:0;
                overflow-y:scroll;
                background-color:#eee;
                font-family:sans-serif;
            }
            body>.controlPanel{
                max-width:600px;
                margin:0 auto;
            }
        `,
        ControlPanel.style,
    ));
    dom.body(
        dom(controlPanel.node)
    );
})();
