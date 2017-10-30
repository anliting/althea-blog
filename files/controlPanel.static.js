import { Site, dom } from '/lib/core.static.js';

let site=new Site;
function TagsPage(){
}
TagsPage.prototype.initialize=async function(){
    this.isInitialized=true;
    this.mainDiv=dom.div();
    let data=await site.send('getTagsWithCount');
    this.mainDiv.innerHTML='';
    let table=dom.table();
    table.classList.add('bordered');
    table.classList.add('padding4px');
    this.mainDiv.appendChild(table);
    table.innerHTML=
        '<thead>'+
            '<tr>'+
                '<th>Tagname'+
                '<th>Count'+
            '</tr>'+
        '</thead>';
    data.map(
        tag=>table.appendChild(tr_tag(tag))
    );
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
};

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
`;

function createTagsPage(){
    let tagsPage=new TagsPage;
    tagsPage.initialize();
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
            {className:'material'},
            n=>{n.style.marginTop='16px';},
            tagsPage.mainDiv,
        ),
    )
}
function ControlPanel(){
    this.array=[];
    this.ui=dom.div({className:'controlPanel'},
        dom.h2('Blog Control Panel'),
    );
    this.in(dom.div({className:'material menu'},
        dom.div({
            className:'in',
            onclick:()=>{
            },
        },'Site'),
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createTagsPage.call(this));
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
    if(!this.array.length)
        return
    this.ui.removeChild(this.array.pop());
    if(this.array.length)
        this.ui.appendChild(this.array[this.array.length-1]);
};
ControlPanel.style=style;

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
dom.body(
    dom((new ControlPanel).ui,
        n=>{n.classList.add('main');}
    )
);
