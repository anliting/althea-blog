import { dom, load } from '/lib/core.static.js';
import { Site } from '/plugins/blog/core.static.js';

function mdcRaisedButton(name){
    return dom.button(
        {className:'mdc-button mdc-button--raised'},
        name,
        n=>mdc.ripple.MDCRipple.attachTo(n),
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
    node=dom.div(
        dom.span(n=>{n.style.color='#888';},`${name}: `),
        dom.div(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
            `},
            input=dom.input({className:'mdc-textfield__input',}),
            dom.div({className:'mdc-textfield__bottom-line'}),
            n=>mdc.textfield.MDCTextfield.attachTo(n),
        )
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
                data=await this._io.getData(),
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
                        await this._io.setData(data);
                        alert('Applied.');
                    }})
                ),
            )
        })(),
    )
}

function createCommentsNode(){
    return dom.div(
        {className:'shadow content'},
        (async()=>{
            let data=await this._io.getComments();
            data.sort((a,b)=>b-a);
            return data.map(async id=>{
                let data=await this._io.getComment({
                    id,
                    columns:[
                        'id_page',
                        'id_user_owner',
                        'timestamp_insert'
                    ]
                });
                let[
                    user,
                    page,
                ]=await Promise.all([
                    this._io.getUser(data.id_user_owner),
                    this._io.getPage(data.id_page),
                ]);
                return dom.p(
                    user.a,
                    ' commented on ',
                    page.a,
                    ' at ',
                    (new Date(data.timestamp_insert)).toLocaleString(),
                    '.',
                )
            })
        })()
    )
}

function TagsPage(io){
    this._io=io;
    this.mainDiv=dom.div(async()=>{
        let data=await this._io.getTagsWithCount();
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
    let tagsPage=new TagsPage({
        getTagsWithCount:this._io.getTagsWithCount,
    });
    return dom.div(
        {className:'shadow content'},
        tagsPage.mainDiv,
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
`

function TreeUi(){
    this.array=[];
}
TreeUi.prototype._apply=function(e){
    dom(this._nodes.title,
        {innerHTML:'',},
        1<this.array.length&&[
            dom.span(
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

let
    root=[
        {
            title:'Site',
            function:createSiteNode,
        },
        {
            title:'Comments',
            function:createCommentsNode,
        },
        {
            title:'Tags',
            function:createTagsNode,
        },
    ];
function ControlPanel(io){
    TreeUi.apply(this,arguments);
    this._io=io;
    this._nodes={};
    this.node=dom.div({className:'controlPanel mdc-typography'},
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
                        dom.span({
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

let site=new Site
;(async()=>{
    await load.material();
    let controlPanel=new ControlPanel({
        getComment(doc){
            doc.function='blog_getComment';
            return site.send(doc)
        },
        getComments:()=>site.send('blog_getComments'),
        getData:()=>site.send('blog_getData'),
        getPage:site.getPage.bind(site),
        getTagsWithCount:()=>site.send('blog_getTagsWithCount'),
        getUser:site.getUser.bind(site),
        setData:data=>site.send({function:'blog_setData',data}),
    });
    dom.head(dom.style(
        `
            a:active,a:link,a:visited{
                color:blue;
            }
            body{
                margin:0;
                overflow-y:scroll;
                background-color:#eee;
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
