import { Site, dom } from '/lib/core.static.js';

function createSiteNode(){
    return dom.div(
        dom.div({className:'material menu'},
            dom.div(
                {
                    className:'out',
                    onclick:()=>{
                        this.out();
                    }
                },
                'Site',
            )
        ),
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
                {className:'material content'},
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
        dom.div({className:'material menu'},
            dom.div(
                {
                    className:'out',
                    onclick:()=>{
                        this.out();
                    }
                },
                'Tags',
            )
        ),
        dom.div(
            {className:'material content'},
            tagsPage.mainDiv,
        ),
    )
}

var style = `
.controlPanel .material{
    background-color:#fff;
    box-shadow:0 1px 4px rgba(0,0,0,.4);
}
.controlPanel .material.menu>div{
    padding:16px;
}
.controlPanel .material.menu>div+div{
    border-top:1px solid #ddd;
}
.controlPanel .material.menu>div.out:before{
    margin-right:16px;
    content:'<';
}
.controlPanel .material.menu>div.in:after{
    float:right;
    content:'>';
}
.controlPanel .material.content{
    padding:16px;
}
.controlPanel .material.menu+.material.content{
    margin-top:16px;
}
`;

function ControlPanel(){
    this.array=[];
    this.ui=dom.div({className:'controlPanel'},
        dom.h2('Blog Control Panel'),
    );
    this.in(dom.div({className:'material menu'},
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createSiteNode.call(this));
            },
        },'Site'),
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createTagsNode.call(this));
            },
        },'Tags'),
    ));
}
ControlPanel.prototype.in=function(e){
    if(this.array.length)
        this.ui.removeChild(this.array[this.array.length-1]);
    this.array.push(e);
    this.ui.appendChild(e);
};
ControlPanel.prototype.out=function(){
    this.ui.removeChild(this.array.pop());
    if(this.array.length)
        this.ui.appendChild(this.array[this.array.length-1]);
};
ControlPanel.style=style;

let site=new Site;
dom.head(
    dom.style(`
        body{
            font-family:sans-serif;
            background-color:#eee;
            overflow-y:scroll;
        }
        body>.main{
            max-width:600px;
            margin:0 auto;
        }
    `,ControlPanel.style)
);
let controlPanel=new ControlPanel;
controlPanel.send=site.send.bind(site);
dom.body(
    dom(controlPanel.ui,
        n=>{n.classList.add('main');}
    )
);
