import { Site, dom, moduleLoader } from '/lib/core.static.js';

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
        {className:`
            mdc-textfield
            mdc-textfield--fullwidth
            mdc-textfield--textarea
        `},
        n=>{n.dataset.mdcAutoInit='MDCTextfield';},
        input=dom.textarea({className:'mdc-textfield__input',rows:8}),
        dom.span({className:'mdc-textfield__label'},name),
    );
    return{node,input}
}
function createSiteNode(){
    return dom.div(
        (async()=>{
            let
                data=await this.send('blog_getData'),
                title=mdcTextdfield('Title'),
                description=mdcTextdfield('Description'),
                bannerTitle=mdcTextdfieldTextarea('Banner Title (HTML)'),
                tagline=mdcTextdfieldTextarea('Tagline (HTML)'),
                footer=mdcTextdfieldTextarea('Footer (HTML)'),
                og;
            title.input.value=data.title;
            description.input.value=data.description;
            bannerTitle.input.value=data.bannerTitle;
            tagline.input.value=data.tagline;
            footer.input.value=data.footer;
            return dom.div(
                {className:'shadow content'},
                dom.p(title.node),
                dom.p(description.node),
                dom.p(bannerTitle.node),
                dom.p(tagline.node),
                dom.p(footer.node),
                dom.p(
                    dom.label(
                        og=dom.input({type:'checkbox',checked:data.og}),
                        'Use open graph.',
                    ),
                ),
                dom.p(dom.button('Apply',{onclick:async()=>{
                    data.title=title.input.value;
                    data.description=description.input.value;
                    data.bannerTitle=bannerTitle.input.value;
                    data.tagline=tagline.input.value;
                    data.footer=footer.input.value;
                    data.og=og.checked;
                    await this.send({
                        function:'blog_setData',
                        data,
                    });
                    alert('Applied.');
                }})),
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
            dom.a({
                className:`material-icons`,
                onclick:()=>this.out(),
            },'chevron_left'),
            ' ',
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

let css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ];
function ControlPanel(){
    TreeUi.apply(this,arguments);
    this._nodes={};
    this.node=dom.div({className:'controlPanel'},
        this._nodes.title=dom.h2(),
    )
    ;(async()=>{
        let module=await moduleLoader();
        await module.scriptByPath('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js');
        this.in({
            title:'Blog Control Panel',
            node:dom.div({className:'shadow'},
                dom.ul({className:'mdc-list'},
                    dom.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:'Site',
                                node:createSiteNode.call(this)
                            }),
                        },
                        'Site',
                        dom.a({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    ),
                    dom.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:'Tags',
                                node:createTagsNode.call(this)
                            }),
                        },
                        'Tags',
                        dom.a({
                            className:`
                                mdc-list-item__end-detail
                                material-icons
                            `
                        },'chevron_right'),
                    ),
                )
            )
        });
    })();
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype);
ControlPanel.style=async function(){
    let module=await moduleLoader();
    return style+(
        await Promise.all(css.map(s=>module.getByPath(s)))
    ).join('')
};

let site=new Site;
let controlPanel=new ControlPanel;
controlPanel.send=site.send.bind(site)
;(async()=>{
    dom.head(
        dom.style(
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
            await ControlPanel.style(),
        )
    );
    dom.body(
        dom(controlPanel.node)
    );
})();
