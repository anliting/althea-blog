import EventEmmiter from 'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js';
import altheaCore from '/lib/core.static.js';
import site from '/lib/site.js';

let {html}=altheaCore;
function Pagemodule(id,priority,name,definitions){
    this.id=id;
    this.priority=priority;
    this.name=name;
    this.definitions=definitions;
}
Pagemodule.prototype.compile=function(s){
    this.definitions.map(d=>{
        // data bug patch
        s=s||'';
        s=s.split(d.name).join(d.content);
    });
    s=s.replace(/\[nothing\][\s\S]*?\[\/nothing\]/g,s=>{
        return ''
    }).replace(
        /\[ignorePluralSpaceCharacters\][\s\S]*?\[\/ignorePluralSpaceCharacters\]/g,
        s=>{
            return s.substring(
                '[ignorePluralSpaceCharacters]'.length,
                s.length-'[/ignorePluralSpaceCharacters]'.length
            ).replace(/ {2,}/g,'')
        }
    ).replace(
        /\[ignoreNewlineCharacters\][\s\S]*?\[\/ignoreNewlineCharacters\]/g,
        s=>{
            return s.substring(
                '[ignoreNewlineCharacters]'.length,
                s.length-'[/ignoreNewlineCharacters]'.length
            ).replace(/\n/g,'')
        }
    ).replace(/\[htmlentities\][\s\S]*?\[\/htmlentities\]/g,s=>{
        return html.encodeText(s.substring(14,s.length-15))
    }).replace(/\[sp2nbsp\][\s\S]*?\[\/sp2nbsp\]/g,s=>{
        return sp2nbsp(s.substring(9,s.length-10))
    }).replace(/\[nl2br\][\s\S]*?\[\/nl2br\]/g,s=>{
        return nl2br(s.substring(7,s.length-8))
    });
    return s
    function sp2nbsp(s){
        return s.split(' ').join('&nbsp;')
    }
    function nl2br(s){
        return s.split('\r\n').join('<br>')
    }
};

async function loadPagemodules(blog){
    let[
        pagemodules,
    ]=await Promise.all([
        blog._site.then(site$$1=>
            site$$1.send('getPagemodules')
        ),
    ]);
    pagemodules.map(p=>
        blog.pagemodules.push(new Pagemodule(
            p.id,
            p.priority,
            p.name,
            p.definitions
        ))
    );
    return blog
}

let {dom}=altheaCore;
function html_stars(rating){
    let output='';
    for(let i=0;i<5;i++){
        output+="<img src=images/"+(
            2*i+2<=rating?
                'star-full'
            :2*i+1<=rating?
                'star-half'
            :
                'star-empty'
        )+".png style=width:18px>";
    }
    return output
}
function tableofcontents(e){
    let
        id_page=e.parentNode.id.substr(13,e.parentNode.id.length),
        s=[0],
        v,
        a;
    v=e;
    a=e.parentNode.getElementsByClassName('tablethis');
    for(let i=0;i<a.length;i++){
        let p=a[i];
        p.id='h'+id_page+'_'+i;
        let r=+p.tagName[1];
        while(s[s.length-1]>r){
            s.pop();
            v=v.parentNode.parentNode;
        }
        if(s[s.length-1]==r)
            v=v.parentNode;
        if(s[s.length-1]<r){
            s.push(r);
            v.appendChild(dom.ul());
            v=v.lastChild;
        }
        v.appendChild(li(p));
        v=v.lastChild;
    }
    function li(p){
        return dom.li(a_href(p))
    }
    function a_href(p){
        return dom.a({
            innerHTML:p.innerHTML,
            href:location.href+'#'+p.id,
        })
    }
}
function star_all(e){
    let a=e.getElementsByClassName('star');
    for(let i=0;i<a.length;i++){
        a[i].innerHTML=html_stars(a[i].innerHTML);
        a[i].style.visibility='visible';
    }
}
function tableofcontents_all(e){
    let a=e.getElementsByClassName('tableofcontents');
    for(let i=0;i<a.length;i++){
        tableofcontents(a[i]);
        a[i].style.visibility='visible';
    }
}
var Page = ({
    star_all,
    tableofcontents_all,
});

let {dom: dom$3}=altheaCore;
function setup(){
    let
        page=this,
        a_comment,
        textarea_comment__form_comment;
    a_comment=dom$3.a();
    a_comment.className='a_comment functionbutton';
    a_comment.href='javascript:';
    a_comment.innerHTML='<i class=material-icons>comment</i>';
    a_comment.onclick=()=>{
        $&&$('html,body').animate({
            scrollTop:
                $(textarea_comment__form_comment).offset().top+
                    80-$(window).height()
        },320);
        textarea_comment__form_comment.focus();
    };
    textarea_comment__form_comment=dom$3.textarea();
    textarea_comment__form_comment.className='textarea_comment';
    textarea_comment__form_comment.name='content';
    textarea_comment__form_comment.placeholder='Comment ...';
    textarea_comment__form_comment.addEventListener('focus',()=>{
        page.input_submit__form_comment.style.display='inline';
    });
    this.a_comment=a_comment;
    this.textarea_comment__form_comment=textarea_comment__form_comment;
    this.input_submit__form_comment=input_submit__form_comment();
    function input_submit__form_comment(){
        let input_submit__form_comment=dom$3.input();
        input_submit__form_comment.className='input_comment_submit';
        input_submit__form_comment.type='submit';
        input_submit__form_comment.value='Submit';
        input_submit__form_comment.style.display='none';
        return input_submit__form_comment
    }
}

let {dom: dom$5}=altheaCore;
var commentForm = page=>{
    let form=dom$5.form(
        page.textarea_comment__form_comment,
        dom$5.br(),
        page.input_submit__form_comment
    );
    form.className='form_newcomment';
    form.onsubmit=async e=>{
        e.preventDefault();
        e.stopPropagation();
        await page.blog._site.then(site$$1=>
            site$$1.send({
                function:'newComment',
                page:page.id,
                content:page.textarea_comment__form_comment.value,
            })
        );
        page.blog.status=page.blog.status;
    };
    return form
};

let {dom: dom$6,html: html$2}=altheaCore;
var commentDiv = (page,comment)=>{
    let div=dom$6.div();
    div.className='comments'
    ;(async()=>{
        comment=await comment;
        await comment.load([
            'content',
            'id_user_owner',
            'timestamp_insert',
        ]);
        let[
            cu,
            u,
        ]=await Promise.all([
            (async()=>{
                let u=await page.blog._currentUser;
                await u.load('isadmin');
                return u
            })(),
            (async()=>{
                let site$$1=await page.blog._site;
                let u=await site$$1.getUser(comment.id_user_owner);
                await u.load('username');
                return u
            })(),
        ]);
        div.innerHTML=
            `<table style=width:100%><tr><td>${
                u.username
            }</td><td style=text-align:right>${
                comment.timestamp_insert
            }</td></tr></table><div>${
                html$2.encodeText(comment.content)
            }</div>`;
        if(cu.isadmin)
            div.appendChild(deleteA(comment.id));
    })();
    return div
    function deleteA(id){
        let a=dom$6.a('delete',{href:'javascript:'});
        a.onclick=async e=>{
            e.preventDefault();
            e.stopPropagation();
            let site$$1=await page.blog._site;
            await site$$1.send({
                function:'deleteComment',
                id
            });
            page.blog.status=page.blog.status;
        };
        return a
    }
};

let {dom: dom$4,html: html$1}=altheaCore;
function PageView(page){
    EventEmmiter.call(this);
    this.domElement=createDiv(this,page);
}
Object.setPrototypeOf(PageView.prototype,EventEmmiter.prototype);
function createDiv(pageView,page){
    let
        div=dom$4.div();
    pageView.hide=!page.ispublic&&!page.blog.status.pageId;
    div.className='post';
    page.div=div;
    page.blog.pages_loaded.push(page.id);
    // tags
    let contentDiv=div_blog_content(pageView,page);
    pageView.on('clickHideshow',()=>{
        pageView.hide=!pageView.hide;
        $&&$(contentDiv).toggle(320);
    });
    div.appendChild(page.h1_title());
    div.appendChild(page.div_author=    page.createAuthorDiv());
    div.appendChild(page.div_date=      page.createDateDiv());
    div.appendChild(
        page.table_privacy=page.createPrivacyTable(pageView)
    );
    div.appendChild(contentDiv);
    div.appendChild(div_facebooklike(page));
    page.blog.isFacebookLoaded&&FB.XFBML.parse(div)
    ;(async()=>{
        let site$$1=await page.blog._site;
        let p=await site$$1.getPage(page.id);
        await p.load('comments');
        let comments=p.comments;
        await Promise.all(
            comments.map(comment=>
                div.appendChild(
                    commentDiv(page,site$$1.getComment(comment))
                )
            )
        );
        div.appendChild(commentForm(page));
    })();
    return div
}
function div_blog_content(pageView,page){
    let
        div=dom$4.div({
            id:'blog_content_'+page.id,
            innerHTML:page.blog.pagemodules[
                page.id_pagemodule-1
            ].compile(page.content),
        });
    div.style.display=pageView.hide?'none':'block';
    for(let s of div.getElementsByTagName('script'))
        eval(s.innerHTML);
    page.blog.emit('pageContentLoad',div);
    page.blog.on('pageContentLoadListenerAdd',listener=>
        listener(div)
    );
    return div
}
function div_facebooklike(page){
    let div=dom$4.div({className:'fb-like'});
    div.setAttribute(
        'data-href','https://anliting.com/'+page.id
    );
    div.setAttribute('data-layout','standard');
    div.setAttribute('data-action','like');
    div.setAttribute('data-show-faces','true');
    div.setAttribute('data-share','true');
    return div
}

/*
    // derived from
    let str_pages_derived_from='Derived from: '
    isfirst=1
    page.page_derived_from.map(q=>{
        if(!isfirst)
            str_pages_derived_from+=', '
        str_pages_derived_from+='<a href='+q.id+'>'
            +html.encodeText(q.title)
            +'</a>'
        isfirst=0
    })
    str_pages_derived_from+='<br>'
    // end derived from
    // derived to
    let str_pages_derived_to='Derived to: '
    isfirst=1
    page.page_derived_to.map(q=>{
        if(!isfirst)
            str_pages_derived_to+=', '
        str_pages_derived_to+='<a href="'+q.id+'">'
            +html.encodeText(q.title)
            +'</a>'
        isfirst=0
    })
    str_pages_derived_to+='<br>'
    // end derived to
*/

var view = {get(){
    return new PageView(this)
}};

let {dom: dom$8}=altheaCore;
let str_show='<i class=material-icons>expand_more</i>';
let str_hide='<i class=material-icons>expand_less</i>';
function createHideShowA(page,pageView){
    let a_hideshow=dom$8.a({
        className:'a_hideshow functionbutton',
        href:'javascript:',
        innerHTML:pageView.hide?str_show:str_hide,
    });
    a_hideshow.onclick=()=>{
        pageView.emit('clickHideshow');
        a_hideshow.innerHTML=
            pageView.hide?str_show:str_hide;
    };
    return a_hideshow
}

let {dom: dom$9,order}=altheaCore;
function privacyTd(page){
    return dom$9.td(span_privacy())
    function span_privacy(){
        let span=dom$9.span(span=>{span.style.fontStyle='italic';});
        let a=[
            (async()=>{
                let site$$1=await page.blog._site;
                let u=await site$$1.getUser(page.authorId);
                return span.appendChild(await u.a)
            })(),
            document.createTextNode(' '),
            dateSpan(),
        ];
        if(!page.ispublic){
            a.push(document.createTextNode(' '));
            a.push(privateSpan());
        }
        order(
            a,
            span.insertBefore.bind(span),
            span.appendChild.bind(span)
        );
        return span
        function dateSpan(){
            let span=dom$9.span(
                dateToString(new Date(page.timestamp_insert))
            );
            span.title=`Last modified: ${
                page.datetime_lastmodified
            }`;
            return span
        }
        function privateSpan(){
            return dom$9.span('private')
        }
        function dateToString(d){
            return`${d.getFullYear()}-${1+d.getMonth()}-${
                d.getDate()
            }`
        }
        /*` ${page.content.length}Bytes.`*/
    }
}

let {dom: dom$7}=altheaCore;
function createPrivacyTable(pageView){
    let
        page=this,
        table_privacy;
    table_privacy=dom$7.table(
        tr_privacy(page),
        tr_tags()
    );
    table_privacy.style.width='100%';
    table_privacy.style.marginBottom='20px';
    return table_privacy
    function tr_privacy(page){
        return dom$7.tr(
            privacyTd(page),
            td_functions()
        )
    }
    function td_functions(){
        let td=dom$7.td(
            createHideShowA(page,pageView),
            page.a_comment
        );
        td.className='td_pageButtons';
        td.style.width='100px'
        ;(async()=>{
            let u=await page.blog._currentUser;
            await u.load('isadmin');
            if(u.isadmin){
                td.appendChild(a_editpage());
                td.appendChild(a_removepage());
            }
        })();
        return td
        function a_editpage(){
            let a=dom$7.a();
            a.className='a_editpage functionbutton';
            a.href=page.id+'/edit';
            a.innerHTML='<i class=material-icons>mode_edit</i>';
            return a
        }
        function a_removepage(){
            let a=dom$7.a();
            a.className='functionbutton a_removepage';
            a.href='javascript:';
            a.onclick=()=>{
                if(confirm('Remove?')){
                    remove();
                }
            };
            a.innerHTML='<i class=material-icons>remove</i>';
            return a
            function remove(){
                site.send({
                    function:'removePage',
                    page:page.id
                });
            }
        }
    }
    function tr_tags(){
        return dom$7.tr(td())
    }
    function td(){
        let
            td=dom$7.td(),
            isFirst;
        if(page.tags.length){
            page.tags.sort();
            td.appendChild(
                document.createTextNode('Tagged: ')
            );
            isFirst=true;
            page.tags.map(e=>{
                if(isFirst)
                    isFirst=false;
                else
                    td.appendChild(
                        document.createTextNode(', ')
                    );
                td.appendChild(
                    page.blog._anchor_addTag({name:e})
                );
            });
        }
        return td
/*+(p.page_derived_from.length!=0?str_pages_derived_from:'')
+(p.page_derived_to.length!=0?str_pages_derived_to:'')*/
    }
}

let {dom: dom$2}=altheaCore;
function BlogPage$1(blog,id,ispublic,title,id_pagemodule){
    EventEmmiter.call(this);
    this.blog=blog;
    this.id=id;
    this.ispublic=ispublic;
    this.title=title;
    this.id_pagemodule=id_pagemodule;
    setup.call(this);
}
Object.setPrototypeOf(BlogPage$1.prototype,EventEmmiter.prototype);
Object.defineProperty(BlogPage$1.prototype,'view',view);
BlogPage$1.prototype.createPrivacyTable=createPrivacyTable;
BlogPage$1.prototype.getHref=function(){
    return this.preferredPagename?
        this.preferredPagename
    :
        this.id
};
BlogPage$1.prototype.h1_title=function(){
    let page=this;
    let h1_title=dom$2.h1(a_h1_title());
    h1_title.style.textAlign='center';
    return h1_title
    function a_h1_title(){
        let a=dom$2.a(page.title);
        a.className='title';
        a.href=page.getHref();
        a.onclick=e=>{
            if(
                e.which!==1||
                e.ctrlKey||
                e.shiftKey
            )
                return
            e.preventDefault();
            page.blog.status={pageId:page.id};
        };
        return a
    }
};
BlogPage$1.prototype.createAuthorDiv=function(){
    let div=dom$2.div();
    div.style.textAlign='center';
    div.style.display='none';
    div.style.fontSize='1.5em'
    ;(async()=>{
        let site$$1=await this.blog._site;
        let u=await site$$1.getUser(this.authorId);
        await u.load('nickname');
        dom$2(div,u.nickname);
    })();
    return div
};
BlogPage$1.prototype.createDateDiv=function(){
    let
        div=dom$2.div(),
        date=new Date(this.datetime_lastmodified);
    div.style.textAlign='center';
    div.style.display='none';
    div.style.fontSize='1.5em';
    div.style.marginTop='0.67em';
    div.style.marginBottom='2em';
    div.textContent=
        `${1900+date.getYear()}-${1+date.getMonth()}-${date.getDate()}`;
    return div
};

let {dom: dom$1,AltheaObject}=altheaCore;
function Page$1(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Page$1.prototype,AltheaObject.prototype);
Page$1.prototype._loader='getPage';
Object.defineProperty(Page$1.prototype,'a',{get(){
    let a=dom$1.a({href:this.id});
    this.lastversion.then(async pv=>{
        await pv.load('title');
        a.textContent=pv.title||'Untitled';
    });
    return a
}});
Object.defineProperty(Page$1.prototype,'lastversion',{async get(){
    await this.load('lastversionId');
    return this._site.getPageversion(this.lastversionId)
}});
Page$1.BlogPage=BlogPage$1;

let BlogPage=   Page$1.BlogPage;
async function update_to_content(process,pages){
    let site$$1=await this._site;
    pages=await Promise.all(pages.map(async p=>{
        let page=await site$$1.getPage(p);
        let res=await Promise.all([
            page.load([
                'preferredPagename',
                'page_derived_from',
                'page_derived_to',
                'author',
                'timestamp_insert',
                'timestamp_lastmodified',
            ]),
            page.lastversion.then(pageVersion=>pageVersion.load([
                'public',
                'title',
                'content',
                'id_pagemodule',
            ])),
        ]).then(vals=>({
            page:vals[0],
            pageVersion:vals[1],
        }));
        page=new BlogPage(
            this,
            res.page.id,
            res.pageVersion.public,
            res.pageVersion.title,
            res.pageVersion.id_pagemodule
        );
        this.pages[page.id]=page;
        page.preferredPagename=     res.page.preferredPagename;
        page.page_derived_from=     res.page.page_derived_from;
        page.page_derived_to=       res.page.page_derived_to;
        page.content=               res.pageVersion.content;
        page.authorId=              res.page.author;
        page.timestamp_insert=      res.page.timestamp_insert;
        page.datetime_lastmodified= res.page.timestamp_lastmodified;
        let pv=await res.pageVersion.load('tags');
        page.tags=pv.tags.sort((a,b)=>a.localeCompare(b));
        return page
    }));
    await site$$1.load;
    if(!process.continue)
        return
    pages.map(page=>{
        this.emit('pageLoad',page);
    });
    if(process.status.pageId){
        document.title=
            this.pages[process.status.pageId].title+
            ' - '+
            site$$1.name;
    }else{
        document.title=site$$1.name;
    }
}

async function _getNext(){
    this.getting=this.getting||0;
    this.getting++;
    let
        process={
            status:this._status,
            continue:1
        };
    this.once('statusChange',()=>
        process.continue=0
    );
    let data=await this._site.then(site$$1=>
        site$$1.send({
            function:       'getSuggestedPages',
            page:           process.status.pageId||0,
            pageversion:    process.status.pageversionId||0,
            tags_selected:  process.status.tagNames||[],
            pages_loaded:   this.pages_loaded,
        })
    );
    await this._loadPagemodules;
    await update_to_content.call(this,process,data.slice(0,4));
    this.getting--;
}

function calcPathByStatus(status){
    if('pageId' in status)
        return site.path.blog.page(status.pageId)
    if('tagNames' in status)
        return site.path.blog.tag(status.tagNames)
    return site.path.blog.root
}
function getHrefByPage(page){
    return site.path.blog.page(page.id)
}
function getHrefByTags(tags){
    return site.path.blog.tag(tags)
}
var path = {
    calcPathByStatus,
    getHrefByPage,
    getHrefByTags,
};

let {dom: dom$10}=altheaCore;
function anchor_addTag(tag){
    let
        tagsToSelect=(this.status.tagNames||[]).slice();
    tagsToSelect.push(tag.name);
    let
        a=dom$10.a(tag.name,{
            className:'addTag',
            href:path.getHrefByTags(tagsToSelect),
        });
    a.onclick=e=>{
        if(
            e.which!=1||
            e.ctrlKey||
            e.shiftKey
        )
            return
        e.preventDefault();
        e.stopPropagation();
        this.status={
            tagNames:tagsToSelect.slice()
        };
    };
    return a
}

let {dom: dom$13}=altheaCore;
async function checkSetupIndex(blog,div){
    if(!blog.status.tagNames)
        return
    let a;
    {
        let
            vals=await Promise.all([
                blog._site,
                getPagesByTags(),
            ]),
            site$$1=vals[0],
            pages=vals[1];
        a=await Promise.all(pages.map(async id=>{
            let page=await site$$1.getPage(id);
            let pageversion=await(await page.lastversion).load([
                'public',
                'title'
            ]);
            return{
                page,
                public:pageversion.public,
                title:pageversion.title,
            }
        }));
    }
    a.sort((a,b)=>a.title.localeCompare(b.title));
    chunks(a,12).map(a=>{
        let ul=dom$13.ul();
        ul.style.float='left';
        for(let p of a){
            let
                li=dom$13.li(),
                a=p.page.a;
            if(!p.public)
                a.style.color='black';
            a.addEventListener('click',e=>{
                if(
                    e.which!=1||
                    e.ctrlKey||
                    e.shiftKey
                )
                    return
                e.preventDefault();
                e.stopPropagation();
                blog.status={
                    pageId:p.page.id
                };
            });
            li.appendChild(a);
            ul.appendChild(li);
        }
        div.appendChild(ul);
    });
    div.appendChild(createClearBothDiv());
    function createClearBothDiv(){
        return dom$13.div(n=>{n.style.clear='both';})
    }
    async function getPagesByTags(){
        return(await blog._site).send({
            function:'getPagesByTags',
            tags:blog.status.tagNames
        })
    }
    function chunks(a,n){
        let res=[];
        for(let i=0;i*n<a.length;i++)
            res.push(a.slice(i*n,(i+1)*n));
        return res
    }
}

let {dom: dom$14}=altheaCore;
function createInput(blog,view){
    let input=dom$14.input();
    input.setAttribute('list',view.datalist_input_searchForTag.id);
    input.addEventListener('keydown',e=>{
        if(e.keyCode!=13)
            return
        e.preventDefault();
        e.stopPropagation();
        let tagToAdd=input.value;
        input.value='';
        let tagsToSelect=blog.status.tagNames?
            blog.status.tagNames.slice()
        :
            [];
        tagsToSelect.push(tagToAdd);
        if(e.shiftKey)
            open(path.getHrefByTags(
                tagsToSelect
            ),'_blank').focus();
        else
            blog.status={tagNames:tagsToSelect};
    });
    input.addEventListener('focus',()=>{
        view.setupSuggestedTags();
    });
    /*input.addEventListener('blur',()=>{
        view.hideSuggestedTags()
    })*/
    return input
}

let {dom: dom$15}=altheaCore;
function setupSelectedTagsDiv(blog,div){
    if(!('tagNames' in blog.status))
        return
    blog.status.tagNames.map((t,i)=>{
        div.appendChild(span());
        function span(){
            let span=dom$15.span(
                t+' ',
                a(),{
                    id:'span_tag_'+t,
                    className:'tag_selected',
                }
            );
            span.style.marginRight='4px';
            return span
        }
        function a(){
            let anchor=dom$15.a('-');
            let tagsToSelect=(blog.status.tagNames||[]).slice();
            tagsToSelect.splice(i,1);
            anchor.href='javascript:';
            anchor.addEventListener('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                blog.status=tagsToSelect.length==0?{}:{
                    tagNames:tagsToSelect
                };
            });
            return anchor
        }
    });
}

var event = {
    onceClickOrBlurButNotMouseDown(n,listener){
        let mousedown=false;
        let l=e=>{
            if(mousedown)
                return
            n.removeEventListener('click',l);
            n.removeEventListener('blur',l);
            n.removeEventListener('mousedown',onmousedown);
            listener();
        },onmousedown=e=>{
            mousedown=true;
            addEventListener('mouseup',e=>
                mousedown=false
            ,{once:true});
        };
        n.addEventListener('click',l);
        n.addEventListener('blur',l);
        n.addEventListener('mousedown',onmousedown);
    }
};

let {dom: dom$17}=altheaCore;
function userA(blog,div,u){
    let a=dom$17.a(u.username,{href:'javascript:'});
    a.onclick=e=>{
        e.preventDefault();
        e.stopPropagation();
        let n=userDiv(blog,u);
        event.onceClickOrBlurButNotMouseDown(n,()=>div.removeChild(n));
        dom$17(div,n);
        n.focus();
    };
    return a
}
function userDiv(blog,u){
    let div=dom$17.div(innerDiv(blog,u),{tabIndex:0});
    div.style.position='relative';
    div.style.outline='none';
    div.style.height='0';
    div.style.width='100%';
    div.style.top='8px';
    return div
}
function innerDiv(blog,u){
    return dom$17.div(
        logoutA(blog),
        dom$17.br(),
        dom$17.a('Profile',{href:`user/${u.username}`}),
        u.isadmin&&[
            dom$17.br(),
            dom$17.a('Drive',{href:`home/${u.username}`}),
            dom$17.br(),
            dom$17.a('Settings',{href:'settings'}),
            dom$17.br(),
            dom$17.a('New Page',{href:'newpage'}),
        ],n=>{
            n.style.margin='0 auto';
            n.style.backgroundColor='white';
            n.style.border='1px solid lightgray';
        }
    )
}
function logoutA(blog){
    let a=dom$17.a('Logout');
    a.href='javascript:';
    a.onclick=async e=>{
        e.preventDefault()
        ;(await blog._site).logout;
    };
    return a
}

let {dom: dom$16}=altheaCore;
function createNavigationBar(view){
    let
        blog=view.blog,
        div=dom$16.div({className:'navigationBar'},menuA());
    blog._site.then(site$$1=>{
        perUser(site$$1,async u=>{
            await u.load(['isAnonymous','username','isadmin']);
            let a=u.isAnonymous?loginA():userA(blog,div,u);
            div.appendChild(a);
            {
                let f=()=>{
                    div.removeChild(a);
                    site$$1.off('userChange',f);
                };
                site$$1.on('userChange',f);
            }
        });
    });
    return div
    function aboutA(){
        return dom$16.a('About',{href:'about'})
    }
    function perUser(site$$1,func){
        site$$1.currentUser.then(func);
        site$$1.on('userChange',()=>{
            site$$1.currentUser.then(func);
        });
    }
    function loginA(){
        let a=dom$16.a('Login',{href:'javascript:'});
        a.onclick=async e=>{
            e.preventDefault();
            e.stopPropagation()
            ;(await blog._site).showLoginForm;
        };
        return a
    }
    function menuA(){
        let a=dom$16.a('Menu');
        a.href='javascript:';
        a.onclick=e=>{
            e.preventDefault();
            e.stopPropagation();
            let n=menuDiv();
            event.onceClickOrBlurButNotMouseDown(n,()=>
                div.removeChild(n)
            );
            div.appendChild(n);
            n.focus();
        };
        return a
    }
    function menuDiv(){
        let div=dom$16.div(innerDiv());
        div.style.position='relative';
        div.style.height='0';
        div.style.width='100%';
        div.style.outline='none';
        div.style.top='8px';
        div.tabIndex=0;
        return div
        function innerDiv(){
            let div=dom$16.div(aboutA());
            div.style.margin='0 auto';
            div.style.backgroundColor='white';
            div.style.border='1px solid lightgray';
            return div
        }
    }
}

let {dom: dom$12}=altheaCore;
function createHeader(blog,view){
    let div=dom$12.div(
        createTitle(),
        createTagline(),
        createNavigationBar(view),
        createSearchForTags(view),
        createTags(view),
        createIndex()
    );
    div.className='header';
    return div
    function createTitle(){
        let div=dom$12.div();
        div.className='title'
        ;(async()=>{
            let site$$1=await blog._site;
            await site$$1.load;
            div.appendChild(
                createA(
                    site$$1.clientUrlRoot,
                    site$$1.bannerTitle
                )
            );
        })();
        return div
        function createA(clientUrlRoot,bannerTitle){
            let a=dom$12.a({href:''});
            a.onclick=e=>{
                if(
                    e.which!=1||
                    e.ctrlKey||
                    e.shiftKey
                )
                    return
                e.preventDefault();
                e.stopPropagation();
                blog.status={};
            };
            a.textContent=bannerTitle;
            return a
        }
    }
    function createTagline(){
        let div=dom$12.div();
        div.className='tagline';
        blog._site.then(s=>s.load).then(site$$1=>{
            div.innerHTML=site$$1.blogTagline;
        });
        return div
    }
    function createSearchForTags(view){
        let div=dom$12.div(
            createSelectedTagsDiv(),
            view.input=createInput(blog,view),
            view.datalist_input_searchForTag
        );
        div.className='searchForTags';
        return div
        function createSelectedTagsDiv(){
            let div=dom$12.div();
            div.className='selectedTags';
            setupSelectedTagsDiv(blog,div);
            blog.on('statusChange',()=>{
                div.innerHTML='';
                setupSelectedTagsDiv(blog,div);
            });
            return div
        }
    }
    function createTags(view){
        let div=dom$12.div();
        div.className='tags';
        blog.on('statusChange',()=>{
            div.innerHTML='';
            if(document.activeElement==view.input)
                view.setupSuggestedTags();
        });
        view.tagsDiv=div;
        return div
    }
    function createIndex(){
        let div=dom$12.div();
        div.className='index';
        checkSetupIndex(blog,div);
        blog.on('statusChange',()=>{
            div.innerHTML='';
            checkSetupIndex(blog,div);
        });
        return div
    }
}

function keydown(e){
    let
        blog=this.blog,
        view=this;
    if(0<=[
        'INPUT',
        'TEXTAREA',
    ].indexOf(
        document.activeElement.tagName
    ))
        return
    if(!e.ctrlKey&&!e.shiftKey){
        if(handle())
            pdAndSp();
    }else if(!e.ctrlKey&&e.shiftKey){
        if(handleShift())
            pdAndSp();
    }
    function pdAndSp(){
        e.preventDefault();
        e.stopPropagation();
    }
    function handle(){
        // e h l o t
        if(e.keyCode==69){ // e
            let x=currentPage();
            if(!x)
                return
            ;(async()=>{
                let u=await blog._currentUser;
                if(u.isadmin)
                    blog.emit('location',blog.pages[x.id].getHref()+'/edit');
            })();
        }else if(e.keyCode==72){ // h
            blog.status={};
        }else if(e.keyCode==76){ // l
            Promise.all([
                blog._currentUser,
                blog._site,
            ]).then(vals=>{
                let
                    user=vals[0],
                    site$$1=vals[1];
                if(user.isAnonymous)
                    site$$1.showLoginForm;
                else
                    site$$1.logout;
            });
        }else if(e.keyCode==79){ // o
            let x=currentPage();
            if(!x)
                return
            blog.status={
                pageId:x.id
            };
        }else if(e.keyCode==84){ // t
            view.input.focus();
        }else{
            return false
        }
        return true
    }
    function handleShift(){
        // E H O
        if(e.keyCode==69){ // E
            let x=currentPage();
            if(!x)
                return
            open(
                blog.pages[x.id].getHref()+'/edit',
                '_blank'
            ).focus();
        }else if(e.keyCode==72){ // H
            (async()=>{
                let user=await blog._currentUser;
                await user.load('username');
                blog.emit('location','home/'+user.username);
            })();
        }else if(e.keyCode==79){ // O
            let x=currentPage();
            if(!x)
                return
            open(path.getHrefByPage(blog.pages[x.id]),'_blank').focus();
        }else
            return false
        return true
    }
    function currentPage(){
        let x=blog.pages[blog.status.pageId];
        Object.keys(blog.pages).map(i=>{
            let e=blog.pages[i];
            if(!e.div)
                return
            if(
                e.div.getBoundingClientRect().top<1&&(
                    !x||
                    x.div.getBoundingClientRect().top<
                    e.div.getBoundingClientRect().top
                )
            )
                x=e;
        });
        return x
    }
}

function randomId(length){
    let res='';
    while(res.length<length)
        res+=Math.random().toString(36).slice(2);
    return 'a'+res
}

let {dom: dom$18}=altheaCore;
function install_datalist_tags_suggested(blogView){
    blogView.datalist_input_searchForTag=dom$18.datalist();
    // known best solution
    blogView.datalist_input_searchForTag.id=randomId(16);
}

let {dom: dom$19}=altheaCore;
function use_list_tags__count_suggested(blogView,list,div){
    list.sort((a,b)=>
        a.name.localeCompare(b.name)
    );
    blogView.datalist_input_searchForTag.innerHTML='';
    list.map(e=>{
        let o=dom$19.option({value:e.name});
        blogView.datalist_input_searchForTag.appendChild(o);
    });
    let tagsToSelect=(blogView.blog.status.tagNames||[]).slice();
    list.map((t,i)=>{
        if(i%12==0)
            div.appendChild(ul());
        if((blogView.blog.status.tagNames||[]).indexOf(t.name)!==-1)
            return
        div.lastChild.appendChild(li(t));
    });
    div.appendChild(div_clearboth());
    function ul(){
        return dom$19.ul(ul=>{ul.style.float='left';})
    }
    function li(t){
        return dom$19.li(a(t))
    }
    function a(t){
        tagsToSelect.push(t.name);
        let a=blogView.blog._anchor_addTag(t);
        tagsToSelect.pop();
        a.innerHTML+=
            '&nbsp;<span style=color:purple>('+
            t.count+')</span>';
        return a
    }
    function div_clearboth(){
        return dom$19.div(div=>{div.style.clear='both';})
    }
}

function initialize_tags_suggested(div_tags){
    div_tags.style.display='none';
    div_tags.innerHTML='';
}

var style = `
body{
    margin:0px;
}
.a_hideshow{
    float:left;
}
.a_comment{
    float:left;
}
.a_dfspage{
    float:left;
}
.a_editpage{
    float:left;
}
.a_deletepage{
    float:left;
}
.a_removepage{
    float:left;
}
`;

let {dom: dom$11}=altheaCore;
function createContents(blog){
    let div=dom$11.div({className:'contents'});
    blog.on('pageLoad',page=>{
        div.appendChild(page.view.domElement);
    });
    blog.on('statusChange',()=>{
        div.innerHTML='';
    });
    return div
}
function createFooter(view){
    let div=dom$11.div();
    div.className='footer';
    view.blog._site.then(async site$$1=>{
        let res=await site$$1.send('getBlogFooter');
        div.innerHTML=res;
    });
    return div
}
function BlogView(blog){
    this.blog=blog;
    this.div=dom$11.div();
    this.div.className='blog';
    install_datalist_tags_suggested(this);
    {
        let s=dom$11.style();
        let u=()=>
            this.blog._styles.map(n=>
                s.appendChild(n)
            );
        u();
        this.blog.on('_style',u);
        this.style=Promise.resolve(s);
        blog._style(document.createTextNode(style));
    }
    this.div.appendChild(createHeader(blog,this));
    this.div.appendChild(createContents(blog));
    this.div.appendChild(createFooter(this));
}
BlogView.prototype.hideSuggestedTags=function(){
    this.tagsDiv.style.display='none';
};
BlogView.prototype.keydown=keydown;
BlogView.prototype.setupSuggestedTags=async function(){
    let
        view=this,
        blog=this.blog;
    let vals=await Promise.all([
        blog._site.then(site$$1=>
            site$$1.send({
                function:'getSuggestedTags',
                tags:blog.status.tagNames||[]
            })
        ),
    ]);
    let
        res=vals[0];
    initialize_tags_suggested(view.tagsDiv);
    use_list_tags__count_suggested(
        view,
        res,
        view.tagsDiv
    );
    view.tagsDiv.style.display='';
};

var view$1 = {get(){
    let view=new BlogView(this);
    return view
}};

function Blog(site$$1,status){
    EventEmmiter.call(this);
    this._site=site$$1;
    this._status=status;
    this.pages={};
    this.pagemodules=[];
    this.pages_loaded=[];
    // refresh on userChange
    this._site.then(site$$1=>{
        site$$1.on('userChange',()=>{
            this.status=this.status;
        });
    });
    // start add event listeners
    this.on('newListener',(event,listener)=>
        this.emit(event+'ListenerAdd',listener)
    );
    this.on('pageLoadListenerAdd',listener=>{
        for(let i in this.pages)
            listener(this.pages[i]);
    });
    this.on('pageContentLoad',Page.star_all);
    this.on('pageContentLoad',Page.tableofcontents_all);
    // end add event listeners
    this.load=this._site.then(site$$1=>{
        return site$$1.loadPlugins('blog',s=>
            eval(`let module=anlitingModule;${s}`)
        )
    });
    this._getNext();
    this._styles=[];
}
Object.setPrototypeOf(Blog.prototype,EventEmmiter.prototype);
Blog.prototype._anchor_addTag=anchor_addTag;
Object.defineProperty(Blog.prototype,'_currentUser',{async get(){
    return(await this._site).currentUser
}});
Blog.prototype._getNext=_getNext;
Object.defineProperty(Blog.prototype,'_loadPagemodules',{async get(){
    return this._loadPagemodules_||(this._loadPagemodules_=
        (await loadPagemodules)(this)
    )
}});
Blog.prototype._style=function(n){
    this._styles.push(n);
    this.emit('_style');
};
Object.defineProperty(Blog.prototype,'status',{get(){
    return this._status
},set(val){
    this._status=val;
    this.pages={};
    this.pages_loaded=[];
    this.emit('statusChange');
    this._getNext();
}});
Object.defineProperty(Blog.prototype,'view',view$1);
Blog.prototype.path=path;

let {AltheaObject: AltheaObject$1}=altheaCore;
function Comment(){
    AltheaObject$1.apply(this,arguments);
}
Object.setPrototypeOf(Comment.prototype,AltheaObject$1.prototype);
Comment.prototype._loader='getComment';

let {AltheaObject: AltheaObject$2}=altheaCore;
function Pagemodule0(){
    AltheaObject$2.apply(this,arguments);
}
Object.setPrototypeOf(Pagemodule0.prototype,AltheaObject$2.prototype);
Pagemodule0.prototype._loader='getPagemoduleInfo';
Object.defineProperty(Pagemodule0.prototype,'definitions',{get(){
    return this._site.send({
        function:'getDefinitionByPagemodule',
        id:this.id,
    })
}});

let {AltheaObject: AltheaObject$3}=altheaCore;
function Pageversion(){
    AltheaObject$3.apply(this,arguments);
}
Object.setPrototypeOf(Pageversion.prototype,AltheaObject$3.prototype);
Pageversion.prototype._loader='getPageversion';

let RawSite=altheaCore.Site;
function Site(){
    RawSite.call(this);
    this._pagemodules={};
    this._pageversions={};
}
Object.setPrototypeOf(Site.prototype,RawSite.prototype);
Site.prototype.getComment=async function(id){
    return new Comment(this,id)
};
Site.prototype.getPage=async function(id){
    // cache is disabled because of the comment feature
    return new Page$1(this,id)
};
Site.prototype.getPagemodule=async function(id){
    return this._pagemodules[id]||(this._pagemodules[id]=
        new Pagemodule0(this,id)
    )
};
Site.prototype.getPageversion=async function(id){
    return this._pageversions[id]||(this._pageversions[id]=
        new Pageversion(this,id)
    )
};

var core = {
    Blog,
    Comment,
    Page: Page$1,
    Pagemodule,
    Pagemodule0,
    Pageversion,
    Site,
};

export default core;
