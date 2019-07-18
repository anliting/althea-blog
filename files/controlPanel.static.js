import { doe, load } from '/lib/core.static.js';
import { Site } from '/plugins/blog/core.static.js';

function mdcRaisedButton(name){
    return doe.button(
        {className:'mdc-button mdc-button--raised'},
        name,
        n=>mdc.ripple.MDCRipple.attachTo(n),
    )
}
function mdcSwitch(name){
    let node,input;
    node=doe.label(
        doe.span(
            {className:`mdc-switch`,},
            input=doe.input({
                type:'checkbox',
                className:'mdc-switch__native-control',
            }),
            doe.div({className:`mdc-switch__background`},
                doe.div({className:`mdc-switch__knob`}),
            ),
        ),
        ` ${name}`,
    );
    return {node,input}
}
function mdcTextdfield(name){
    let node,input;
    node=doe.div(
        doe.span(n=>{n.style.color='#888';},`${name}: `),
        doe.div(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
            `},
            input=doe.input({className:'mdc-textfield__input',}),
            doe.div({className:'mdc-textfield__bottom-line'}),
            n=>mdc.textfield.MDCTextfield.attachTo(n),
        )
    );
    return {node,input}
}
function mdcTextdfieldTextarea(name){
    let node,input;
    node=doe.label(
        doe.span(n=>{n.style.color='#888';},`${name}: `),
        doe.span(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
                mdc-textfield--textarea
            `,},
            input=doe.textarea({className:'mdc-textfield__input',rows:8}),
        ),
    );
    return {node,input}
}
function createSiteNode(){
    return doe.div(async n=>{
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
        doe(n,doe.div(
            {className:'shadow content'},
            doe.p(title.node),
            doe.p(description.node),
            doe.p(bannerTitle.node),
            doe.p(tagline.node),
            doe.p(footer.node),
            doe.p(og.node),
            doe.p(
                doe(apply,{onclick:async()=>{
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
        ));
    })
}

async function appendComments(n){
    doe(n,await Promise.all((
        await this._io.getComments()
    ).sort((a,b)=>b-a).map(async id=>{
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
        return doe.p(
            user.a,
            ' commented on ',
            page.a,
            ' at ',
            (new Date(data.timestamp_insert)).toLocaleString(),
            '.',
        )
    })));
}
function createCommentsNode(){
    return doe.div(
        {className:'shadow content'},
        n=>{
            appendComments.call(this,n);
        }
    )
}

function TagsPage(io){
    this._io=io;
    this.mainDiv=doe.div(async n=>{
        let data=await this._io.getTagsWithCount();
        doe(n,doe.table(
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
        ));
    });
    function tr_tag(tag){
        return doe.tr(td_name(),td_count())
        function td_name(){
            let td=doe.td(a_name());
            td.style.fontFamily='Monospace';
            return td
        }
        function a_name(){
            let a=doe.a(tag.tagname);
            a.href='/tags/'+encodeURIComponent(tag.tagname);
            return a
        }
        function td_count(){
            let td=doe.td(tag.count);
            td.style.textAlign='right';
            return td
        }
    }
}

function createTagsNode(){
    let tagsPage=new TagsPage({
        getTagsWithCount:this._io.getTagsWithCount,
    });
    return doe.div(
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
`;

function TreeUi(){
    this.array=[];
}
TreeUi.prototype._apply=function(e){
    doe(this._nodes.title,
        {innerHTML:'',},
        ...(1<this.array.length?[
            doe.span(
                {
                    className:`material-icons`,
                    onclick:()=>this.out()
                },
                n=>{
                    n.style.marginRight='8px';
                },
                'keyboard_backspace',
            ),
        ]:[]),
        e.title,
    );
    doe(this.node,e.node);
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
    this.node=doe.div({className:'controlPanel mdc-typography'},
        this._nodes.title=doe.h2(),
    );
    this.in({
        title:'Blog Control Panel',
        node:doe.div({className:'shadow'},
            doe.ul({className:'mdc-list'},
                ...root.map(o=>
                    doe.li(
                        {
                            className:'mdc-list-item',
                            onclick:()=>this.in({
                                title:o.title,
                                node:o.function.call(this),
                            }),
                        },
                        o.title,
                        doe.span({
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
    doe.head(doe.style(
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
    doe.body(
        doe(controlPanel.node)
    );
})();
