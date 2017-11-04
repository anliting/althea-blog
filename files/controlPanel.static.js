import { Site, dom, moduleLoader } from '/lib/core.static.js';

function createSiteNode(){
    return dom.div(
        (async()=>{
            let
                data=await this.send('blog_getData'),
                title,
                description,
                bannerTitle,
                tagline,
                footer,
                og;
            return dom.div(
                {className:'shadow content'},
                dom.p('Title: ',
                    title=dom.input({value:data.title})
                ),
                dom.p('Description: ',
                    description=dom.input({value:data.description})
                ),
                dom.p('Banner Title: ',
                    bannerTitle=dom.textarea(data.bannerTitle)
                ),
                dom.p('Tagline: ',
                    tagline=dom.textarea(data.tagline)
                ),
                dom.p('Footer: ',
                    footer=dom.textarea(data.footer)
                ),
                dom.p(
                    dom.label(
                        og=dom.input({type:'checkbox',checked:data.og}),
                        'Use open graph.',
                    ),
                ),
                dom.p(dom.button('Apply',{onclick:async()=>{
                    data.title=title.value;
                    data.description=description.value;
                    data.bannerTitle=bannerTitle.value;
                    data.tagline=tagline.value;
                    data.footer=footer.value;
                    data.og=og.checked;
                    await this.send({
                        function:'blog_setData',
                        data,
                    });
                    alert('Applied.');
                }})),
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
    if(this.array.length<2)
        this._nodes.title.textContent=e.title;
    else
        dom(this._nodes.title,
            {innerHTML:'',},
            dom.a({
                className:`material-icons`,
                onclick:()=>this.out(),
            },'chevron_left'),
            ' ',
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
}
Object.setPrototypeOf(ControlPanel.prototype,TreeUi.prototype);
ControlPanel.style=style;

let css=[
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
    ];
let site=new Site;
let controlPanel=new ControlPanel;
controlPanel.send=site.send.bind(site)
;(async()=>{
    let module=await moduleLoader();
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
            await Promise.all(css.map(s=>module.getByPath(s))),
            ControlPanel.style,
        )
    );
    dom.body(
        dom(controlPanel.node)
    );
})();
