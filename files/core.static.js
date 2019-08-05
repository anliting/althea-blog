import { doe, html, EventEmmiter, order, AltheaObject, load as load$1, arg, browser, ImageUploader, dom, Site as Site$1 } from '/lib/core.static.js';

async function loadPagemodules(blog){
    let res=await blog._site.send('blog_getPagemodules');
    let pagemodules=await Promise.all(res.map(async id=>{
        let pagemodule=await blog._site.getPagemodule(id);
        await Promise.all([
            pagemodule.load([
                'priority',
                'name',
            ]),
            pagemodule.definitions,
        ]);
        return pagemodule
    }));
    blog.pagemodules.push(...pagemodules);
    return blog
}

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
            doe(v,doe.ul());
            v=v.lastChild;
        }
        doe(v,li(p));
        v=v.lastChild;
    }
    function li(p){
        return doe.li(a_href(p))
    }
    function a_href(p){
        return doe.a({
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
var corePlugins = [
    star_all,
    tableofcontents_all,
];

function setup(){
    let
        page=this,
        a_comment,
        textarea_comment__form_comment;
    a_comment=doe.a();
    a_comment.className='a_comment functionbutton';
    a_comment.href='javascript:';
    a_comment.innerHTML='<i class=material-icons>comment</i>';
    a_comment.onclick=()=>{
        textarea_comment__form_comment.focus();
    };
    textarea_comment__form_comment=doe.textarea();
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
        let input_submit__form_comment=doe.input();
        input_submit__form_comment.className='input_comment_submit';
        input_submit__form_comment.type='submit';
        input_submit__form_comment.value='Submit';
        input_submit__form_comment.style.display='none';
        return input_submit__form_comment
    }
}

var commentForm = page=>{
    let form=doe.form(
        page.textarea_comment__form_comment,
        doe.br(),
        page.input_submit__form_comment
    );
    form.className='form_newcomment';
    form.onsubmit=async e=>{
        e.preventDefault();
        e.stopPropagation();
        let site=await page.blog._site;
        await site.send({
            function:'blog_putComment',
            page:page.id,
            content:page.textarea_comment__form_comment.value,
        });
        page.blog._setStatusEmit(page.blog.status);
    };
    return form
};

var commentDiv = (page,comment)=>{
    let div=doe.div();
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
                let site=await page.blog._site;
                let u=await site.getUser(comment.id_user_owner);
                await u.load('username');
                return u
            })(),
        ]);
        div.innerHTML=
            `<table style=width:100%><tr><td>${
                u.username
            }</td><td style=text-align:right>${
                (new Date(comment.timestamp_insert)).toLocaleString()
            }</td></tr></table><div>${
                html.encodeText(comment.content)
            }</div>`;
        if(cu.isadmin)
            doe(div,deleteA(comment.id));
    })();
    return div
    function deleteA(id){
        let a=doe.a('delete',{href:'javascript:'});
        a.onclick=async e=>{
            e.preventDefault();
            e.stopPropagation();
            let site=await page.blog._site;
            await site.send({
                function:'blog_cutComment',
                id
            });
            page.blog._setStatusEmit(page.blog.status);
        };
        return a
    }
};

function PageView(page){
    EventEmmiter.call(this);
    this.domElement=createDiv(this,page);
}
Object.setPrototypeOf(PageView.prototype,EventEmmiter.prototype);
function createDiv(pageView,page){
    let 
        div=doe.div();
    pageView.hide=!page.ispublic&&!page.blog.status.pageId;
    div.className='post';
    page.div=div;
    page.blog.pages_loaded.push(page.id);
    // tags
    let contentDiv=div_blog_content(pageView,page);
    pageView.on('clickHideshow',()=>{
        if(pageView.hide){
            contentDiv.style.display='';
            pageView.hide=0;
        }else{
            contentDiv.style.display='none';
            pageView.hide=1;
        }
    });
    doe(div,
        page.h1_title(),
        page.div_author=    page.createAuthorDiv(),
        page.div_date=      page.createDateDiv(),
        page.table_privacy= page.createPrivacyTable(pageView),
        contentDiv,
        div_facebooklike(page),
    );
    page.blog.isFacebookLoaded&&FB.XFBML.parse(div)
    ;(async()=>{
        let site=await page.blog._site;
        let p=await site.getPage(page.id);
        await p.load('comments');
        let comments=p.comments;
        await Promise.all(
            comments.map(comment=>
                doe(div,
                    commentDiv(page,site.getComment(comment))
                )
            )
        );
        doe(div,commentForm(page));
    })();
    return div
}
function div_blog_content(pageView,page){
    let
        div=doe.div({
            id:'blog_content_'+page.id,
            className:'content',
            innerHTML:
                page.id_pagemodule?
                    page.blog.pagemodules[
                        page.id_pagemodule-1
                    ].compile(page.content)
                :
                    page.content
            ,
        });
    div.style.display=pageView.hide?'none':'block';
    for(let s of div.getElementsByTagName('script'))
        if(s.type=='')
            eval(s.innerHTML);
    page.blog._addPageDiv(div);
    return div
}
function div_facebooklike(page){
    let div=doe.div({className:'fb-like'});
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

let
    str_show='<i class=material-icons>expand_more</i>',
    str_hide='<i class=material-icons>expand_less</i>';
function createHideShowA(page,pageView){
    let a_hideshow=doe.a({
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

function privacyTd(page){
    return doe.td(span_privacy())
    function span_privacy(){
        let span=doe.span(span=>{span.style.fontStyle='italic';});
        let a=[
            (async()=>{
                let site=await page.blog._site;
                let u=await site.getUser(page.authorId);
                let a=await u.a;
                doe(span,a);
                return a
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
            let span=doe.span(
                dateToString(new Date(page.timestamp_insert))
            );
            span.title=`Last modified: ${
                page.datetime_lastmodified
            }`;
            return span
        }
        function privateSpan(){
            return doe.span('private')
        }
        function dateToString(d){
            return `${d.getFullYear()}-${1+d.getMonth()}-${
                d.getDate()
            }`
        }
        /*` ${page.content.length}Bytes.`*/
    }
}

function createPrivacyTable(pageView){
    let
        page=this,
        table_privacy;
    table_privacy=doe.table(
        tr_privacy(page),
        tr_tags()
    );
    table_privacy.style.width='100%';
    table_privacy.style.marginBottom='20px';
    return table_privacy
    function tr_privacy(page){
        return doe.tr(
            privacyTd(page),
            td_functions()
        )
    }
    function td_functions(){
        let td=doe.td(
            createHideShowA(page,pageView),
            page.a_comment
        );
        td.className='td_pageButtons';
        td.style.width='100px'
        ;(async()=>{
            let u=await page.blog._currentUser;
            await u.load('isadmin');
            if(u.isadmin)
                doe(td,a_editpage(),a_removepage());
        })();
        return td
        function a_editpage(){
            let a=doe.a();
            a.className='a_editpage functionbutton';
            a.href=page.id+'/edit';
            a.innerHTML='<i class=material-icons>mode_edit</i>';
            return a
        }
        function a_removepage(){
            return doe.a({
                className:'functionbutton a_removepage',
                href:'javascript:',
                onclick:()=>{
                    if(confirm('Remove?')){
                        remove();
                    }
                },
                innerHTML:'<i class=material-icons>remove</i>',
            })
            function remove(){
                page.blog._site.send({
                    function:'blog_cutPage',
                    page:page.id
                });
            }
        }
    }
    function tr_tags(){
        return doe.tr(td())
    }
    function td(){
        let
            td=doe.td(),
            isFirst;
        if(page.tags.length){
            page.tags.sort();
            doe(td,'Tagged: ');
            isFirst=true;
            page.tags.map(e=>{
                if(isFirst)
                    isFirst=false;
                else
                    doe(td,', ');
                doe(td,page.blog._anchor_addTag({name:e}));
            });
        }
        return td
/*+(p.page_derived_from.length!=0?str_pages_derived_from:'')
+(p.page_derived_to.length!=0?str_pages_derived_to:'')*/
    }
}

function BlogPage(blog,id,ispublic,title,id_pagemodule){
    EventEmmiter.call(this);
    this.blog=blog;
    this.id=id;
    this.ispublic=ispublic;
    this.title=title;
    this.id_pagemodule=id_pagemodule;
    setup.call(this);
}
Object.setPrototypeOf(BlogPage.prototype,EventEmmiter.prototype);
Object.defineProperty(BlogPage.prototype,'view',view);
BlogPage.prototype.createPrivacyTable=createPrivacyTable;
BlogPage.prototype.getHref=function(){
    return this.preferredPagename?
        this.preferredPagename
    :
        this.id
};
BlogPage.prototype.h1_title=function(){
    let page=this;
    let h1_title=doe.h1(a_h1_title());
    h1_title.style.textAlign='center';
    return h1_title
    function a_h1_title(){
        let a=doe.a(page.title);
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
            page.blog._setStatusEmit({pageId:page.id});
        };
        return a
    }
};
BlogPage.prototype.createAuthorDiv=function(){
    return doe.div(async n=>{
        n.style.textAlign='center';
        n.style.display='none';
        n.style.fontSize='1.5em';
        let u=await this.blog._site.getUser(this.authorId);
        await u.load('nickname');
        doe(n,u.nickname);
    })
};
BlogPage.prototype.createDateDiv=function(){
    let date=new Date(this.datetime_lastmodified);
    return doe.div(
        n=>{
            doe(n.style,{
                textAlign:'center',
                display:'none',
                fontSize:'1.5em',
                marginTop:'0.67em',
                marginBottom:'2em',
            });
        },
        `${1900+date.getYear()}-${1+date.getMonth()}-${
            date.getDate()
        }`
    )
};

function Page(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Page.prototype,AltheaObject.prototype);
Page.prototype._loader='blog_getPage';
Object.defineProperty(Page.prototype,'a',{get(){
    return doe.a({href:this.id},async a=>{
        let pv=await this.lastversion;
        await pv.load('title');
        a.textContent=pv.title||'Untitled';
    })
}});
Object.defineProperty(Page.prototype,'lastversion',{async get(){
    await this.load('lastversionId');
    return this._io.getPageversion(this.lastversionId)
}});
Page.BlogPage=BlogPage;

let BlogPage$1=Page.BlogPage;
async function getData(status){
    let data=await this._site.send({
        function:       'blog_getSuggestedPages',
        page:           status.pageId||0,
        pageversion:    status.pageversionId||0,
        tags_selected:  status.tagNames||[],
        pages_loaded:   this.pages_loaded,
    });
    let pages=data.slice(0,4);
    pages=await Promise.all(pages.map(async p=>{
        let page=await this._site.getPage(p);
        let res=await(async()=>{
            let vals=await Promise.all([
                page.load([
                    'preferredPagename',
                    'page_derived_from',
                    'page_derived_to',
                    'author',
                    'timestamp_insert',
                    'timestamp_lastmodified',
                    'tags',
                    'public',
                ]),
                (async()=>
                    (await page.lastversion).load([
                        'title',
                        'content',
                        'id_pagemodule',
                    ])
                )(),
            ]);
            return {
                page:vals[0],
                pageVersion:vals[1],
            }
        })();
        await this._loadPagemodules;
        page=new BlogPage$1(
            this,
            res.page.id,
            res.page.public,
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
        page.tags=res.page.tags.sort((a,b)=>a.localeCompare(b));
        return page
    }));
    let title=await this._title;
    return [title,pages]
}
function getNext(){
    let interrupted;
    return {
        interrupt(){
            interrupted=1;
        },
        promise:(async()=>{
            let[title,pages]=await getData.call(this,this._status);
            if(interrupted)
                return
            pages.map(page=>{
                this.emit('pageLoad',page);
            });
            if(this._status.pageId){
                document.title=
                    this.pages[this._status.pageId].title+
                    ' - '+
                    title;
            }else{
                document.title=title;
            }
        })(),
    }
}
function getNextIfNotGetting(){
    if(this._getting)
        return
    this._getting=1;
    let
        task=getNext.call(this),
        beforeStatusChange,
        onEnd;
    onEnd=()=>{
        this.off('_beforeStatusChange',beforeStatusChange);
        this._getting=0;
        onEnd=0;
    };
    this.on('_beforeStatusChange',beforeStatusChange=()=>{
        task.interrupt();
        if(onEnd)
            onEnd();
    })
    ;(async()=>{
        await task.promise;
        if(onEnd)
            onEnd();
    })();
}

function anchor_addTag(tag){
    let tagsToSelect=(this.status.tagNames||[]).slice();
    tagsToSelect.push(tag.name);
    return doe.a(tag.name,{
        className:'addTag',
        href:this.path.getHrefByTags(tagsToSelect),
        onclick:e=>{
            if(
                e.which!=1||
                e.ctrlKey||
                e.shiftKey
            )
                return
            e.preventDefault();
            e.stopPropagation();
            this._setStatusEmit({
                tagNames:tagsToSelect.slice()
            });
        }
    })
}

function checkSetupIndex(blog,div){
    let end=()=>{};
    if(blog.status.tagNames)
        (async()=>{
            let a;
            let ended;
            end=()=>{ended=1;};
            {
                let pages=await getPagesByTags();
                a=await Promise.all(pages.map(async id=>{
                    let
                        page=await blog._site.getPage(id),
                        pageversion;
                    await Promise.all([
                        page.load([
                            'public',
                        ]),
                        (async()=>{
                            pageversion=await page.lastversion;
                            await pageversion.load([
                                'title'
                            ]);
                        })()
                    ]);
                    return {
                        page,
                        public:page.public,
                        title:pageversion.title,
                    }
                }));
            }
            if(ended)
                return
            a.sort((a,b)=>a.title.localeCompare(b.title));
            doe(div,chunks(a,12).map(a=>{
                let ul=doe.ul();
                ul.style.float='left';
                for(let p of a){
                    let
                        li=doe.li(),
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
                        blog._setStatusEmit({
                            pageId:p.page.id
                        });
                    });
                    doe(ul,doe(li,a));
                }
                return ul
            }),createClearBothDiv());
            end=()=>{div.innerHTML='';};
            function createClearBothDiv(){
                return doe.div(n=>{n.style.clear='both';})
            }
            async function getPagesByTags(){
                return blog._site.send({
                    function:'blog_getPagesByTags',
                    tags:blog.status.tagNames
                })
            }
            function chunks(a,n){
                let res=[];
                for(let i=0;i*n<a.length;i++)
                    res.push(a.slice(i*n,(i+1)*n));
                return res
            }
        })();
    return ()=>end()
}

function createInput(blog,view){
    let input=doe.input();
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
            open(blog._site.path.getHrefByTags(
                tagsToSelect
            ),'_blank').focus();
        else
            blog._setStatusEmit({tagNames:tagsToSelect});
    });
    input.addEventListener('focus',()=>{
        view.setupSuggestedTags();
    });
    /*input.addEventListener('blur',()=>{
        view.hideSuggestedTags()
    })*/
    return input
}

function setupSelectedTagsDiv(blog,div){
    if(!('tagNames' in blog.status))
        return
    blog.status.tagNames.map((t,i)=>{
        doe(div,span());
        function span(){
            let span=doe.span(
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
            let anchor=doe.a('-');
            let tagsToSelect=(blog.status.tagNames||[]).slice();
            tagsToSelect.splice(i,1);
            anchor.href='javascript:';
            anchor.addEventListener('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                blog._setStatusEmit(tagsToSelect.length==0?{}:{
                    tagNames:tagsToSelect
                });
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

function userA(blog,div,u){
    let a=doe.a(u.username,{href:'javascript:'});
    a.onclick=e=>{
        e.preventDefault();
        e.stopPropagation();
        let n=userDiv(blog,u);
        event.onceClickOrBlurButNotMouseDown(n,()=>div.removeChild(n));
        doe(div,n);
        n.focus();
    };
    return a
}
function userDiv(blog,u){
    let div=doe.div(innerDiv(blog,u),{tabIndex:0});
    div.style.position='relative';
    div.style.outline='none';
    div.style.height='0';
    div.style.width='100%';
    div.style.top='8px';
    return div
}
function innerDiv(blog,u){
    return doe.div(
        logoutA(blog),
        doe.br(),
        doe.a('Profile',{href:`user/${u.username}`}),
        ...(u.isadmin?[
            doe.br(),
            doe.a('Drive',{href:`home/${u.username}`}),
            doe.br(),
            doe.a('Control Panel',{href:'control-panel'}),
            doe.br(),
            doe.a('Blog Control Panel',{href:'blog-control-panel'}),
            doe.br(),
            doe.a('New Page',{href:'newpage'}),
        ]:[]),n=>{
            n.style.margin='0 auto';
            n.style.backgroundColor='white';
            n.style.border='1px solid lightgray';
        }
    )
}
function logoutA(blog){
    let a=doe.a('Logout');
    a.href='javascript:';
    a.onclick=async e=>{
        e.preventDefault();
        blog._site.logout;
    };
    return a
}

function createNavigationBar(view){
    let
        blog=view.blog,
        div=doe.div({className:'navigationBar'},menuA()),
        site=blog._site;
    perUser(site,async u=>{
        await u.load(['isAnonymous','username','isadmin']);
        let a=u.isAnonymous?loginA():userA(blog,div,u);
        doe(div,a);
        {
            let f=()=>{
                doe(div,1,a);
                site.off('userChange',f);
            };
            site.on('userChange',f);
        }
    });
    return div
    function aboutA(){
        return doe.a('About',{href:'about'})
    }
    function perUser(site,func){
(async()=>func(await site.currentUser))();
        site.on('userChange',
            async()=>func(await site.currentUser)
        );
    }
    function loginA(){
        let a=doe.a('Login',{href:'javascript:'});
        a.onclick=async e=>{
            e.preventDefault();
            e.stopPropagation();
            blog._site.showLoginForm;
        };
        return a
    }
    function menuA(){
        let a=doe.a('Menu');
        a.href='javascript:';
        a.onclick=e=>{
            e.preventDefault();
            e.stopPropagation();
            let n=menuDiv();
            event.onceClickOrBlurButNotMouseDown(n,()=>
                div.removeChild(n)
            );
            doe(div,n);
            n.focus();
        };
        return a
    }
    function menuDiv(){
        let div=doe.div(innerDiv());
        div.style.position='relative';
        div.style.height='0';
        div.style.width='100%';
        div.style.outline='none';
        div.style.top='8px';
        div.tabIndex=0;
        return div
        function innerDiv(){
            let div=doe.div(aboutA());
            div.style.margin='0 auto';
            div.style.backgroundColor='white';
            div.style.border='1px solid lightgray';
            return div
        }
    }
}

function createHeader(blog,view){
    let blog_getData=blog._site.send('blog_getData');
    return doe.div(
        {className:'header'},
        createTitle(),
        createTagline(),
        createNavigationBar(view),
        createSearchForTags(view),
        createTags(view),
        createIndex()
    )
    function createTitle(){
        return doe.div({className:'title'},async n=>
            doe(n,createA((await blog_getData).bannerTitle))
        )
        function createA(bannerTitle){
            return doe.a({href:'',innerHTML:bannerTitle,onclick(e){
                if(
                    e.which!=1||
                    e.ctrlKey||
                    e.shiftKey
                )
                    return
                e.preventDefault();
                e.stopPropagation();
                blog._setStatusEmit({});
            }})
        }
    }
    function createTagline(){
        return doe.div({className:'tagline'},
            async n=>{
                doe(n,{innerHTML:(await blog_getData).tagline});
            }
        )
    }
    function createSearchForTags(view){
        return doe.div(
            {className:'searchForTags'},
            createSelectedTagsDiv(),
            view.input=createInput(blog,view),
            view.datalist_input_searchForTag
        )
        function createSelectedTagsDiv(){
            return doe.div({className:'selectedTags'},n=>{
                setupSelectedTagsDiv(blog,n);
                blog.on('_statusChange',()=>{
                    n.innerHTML='';
                    setupSelectedTagsDiv(blog,n);
                });
            })
        }
    }
    function createTags(view){
        return doe.div({className:'tags'},n=>{
            blog.on('_statusChange',()=>{
                n.innerHTML='';
                if(document.activeElement==view.input)
                    view.setupSuggestedTags();
            });
            view.tagsDiv=n;
        })
    }
    function createIndex(){
        return doe.div({className:'index'},n=>{
            let end=checkSetupIndex(blog,n);
            blog.on('_statusChange',()=>{
                end();
                end=checkSetupIndex(blog,n);
            });
        })
    }
}

function keydown(e){
    let
        blog=this.blog,
        site=this.blog._site,
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
            blog._setStatusEmit({});
        }else if(e.keyCode==76){ // l
(async()=>{
                let[
                    user,
                    site,
                ]=await Promise.all([
                    blog._currentUser,
                    blog._site,
                ]);
                if(user.isAnonymous)
                    site.showLoginForm;
                else
                    site.logout;
            })();
        }else if(e.keyCode==79){ // o
            let x=currentPage();
            if(!x)
                return
            blog._setStatusEmit({
                pageId:x.id
            });
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
            open(
                site.path.getHrefByPage(blog.pages[x.id]),
                '_blank'
            ).focus();
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

function install_datalist_tags_suggested(blogView){
    blogView.datalist_input_searchForTag=doe.datalist();
    // known best solution
    blogView.datalist_input_searchForTag.id=randomId(16);
}

function use_list_tags__count_suggested(blogView,list,div){
    list.sort((a,b)=>
        a.name.localeCompare(b.name)
    );
    blogView.datalist_input_searchForTag.innerHTML='';
    list.map(e=>
        doe(blogView.datalist_input_searchForTag,
            doe.option({value:e.name})
        )
    );
    let tagsToSelect=(blogView.blog.status.tagNames||[]).slice();
    list.map((t,i)=>{
        if(i%12==0)
            doe(div,ul());
        if((blogView.blog.status.tagNames||[]).indexOf(t.name)!==-1)
            return
        doe(div.lastChild,li(t));
    });
    doe(div,div_clearboth());
    function ul(){
        return doe.ul(ul=>{ul.style.float='left';})
    }
    function li(t){
        return doe.li(a(t))
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
        return doe.div(div=>{div.style.clear='both';})
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
.blog{
    outline:none;
}
`;

function createContents(blog){
    let div=doe.div({className:'contents'});
    blog.on('pageLoad',page=>{
        doe(div,page.view.domElement);
    });
    blog.on('_statusChange',()=>{
        div.innerHTML='';
    });
    return div
}
function createFooter(view){
    return doe.div({className:'footer'},async div=>{
        div.innerHTML=(await view.blog._site.send('blog_getData')).footer;
    })
}
function BlogView(blog){
    this.blog=blog;
    this.div=doe.div({className:'blog',tabIndex:-1,onkeydown:e=>
        this.keydown(e)
    });
    install_datalist_tags_suggested(this);
    {
        let s=doe.style();
        let u=()=>
            this.blog._styles.map(n=>
                doe(s,n)
            );
        u();
        this.blog.on('_style',u);
        this.style=s;
        blog._style(document.createTextNode(style));
    }
    doe(this.div,
        createHeader(blog,this),
        createContents(blog),
        createFooter(this),
    );
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
        blog._site.send({
            function:'blog_getSuggestedTags',
            tags:blog.status.tagNames||[]
        }),
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

var createPath = site=>{
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
    return {
        calcPathByStatus,
        getHrefByPage,
        getHrefByTags,
    }
};

function Blog(site,status){
    EventEmmiter.call(this);
    this._site=site;
    this._status=status;
    this.path=createPath(site);
    this.pages={};
    this.pagemodules=[];
    this.pages_loaded=[];
    // refresh on userChange
    site.on('userChange',()=>{
        this._setStatusEmit(this.status);
    });
    // start page plugin
    this._pageDivs=[];
    this._pagePlugins=corePlugins.slice();
    // end page plugin
    this._getNext();
    this._styles=[];
    this._loadPagemodules=loadPagemodules(this);
    this.view=new BlogView(this);
    this._getting=0;
    this._title=(async()=>
        (await this._site.send('blog_getData')).title
    )();
    this.load=Promise.all([
        site.applyPlugins('blog',this),
        (async()=>{
(await site.loadPlugins('blog_page')).forEach(p=>
                this._addPagePlugin(p)
            );
        })(),
        load$1.materialIcon(),
    ]);
}
Object.setPrototypeOf(Blog.prototype,EventEmmiter.prototype);
Blog.prototype._anchor_addTag=anchor_addTag;
Object.defineProperty(Blog.prototype,'_currentUser',{async get(){
    return this._site.currentUser
}});
Blog.prototype._getNext=getNextIfNotGetting;
Blog.prototype._setStatusEmit=function(s){
    this.status=s;
    this.emit('statusChange');
};
Blog.prototype._style=function(n){
    this._styles.push(n);
    this.emit('_style');
};
Blog.prototype._addPageDiv=async function(div){
    this._pageDivs.push(div);
    await Promise.all(this._pagePlugins.map(p=>p(div)));
};
Blog.prototype._addPagePlugin=async function(p){
    await Promise.all(this._pageDivs.map(p));
    this._pagePlugins.push(p);
};
Object.defineProperty(Blog.prototype,'status',{get(){
    return this._status
},set(val){
    this.emit('_beforeStatusChange');
    this._status=val;
    this.pages={};
    this.pages_loaded=[];
    this.emit('_statusChange');
    this._getNext();
}});

function newPageContentUi(
    getPagemodule,plugins,source,pagemoduleId
){
    if(pagemoduleId){
        let pagemodule=getPagemodule(pagemoduleId);
        source=pagemodule.compile(source);
    }
    let n=doe.div({innerHTML:source});
    plugins.map(f=>f(n));
    return n
}
var editors = {
    html:{
        come(){
            this._nodes.div_textarea_content.style.display='';
        },
        leave(){
            this._nodes.div_textarea_content.style.display='none';
        },
    },
    htmleditor:{
        come(){
            this._nodes.div_htmleditor.innerHTML=
                this.textarea_content.value;
            this.htmleditor=new HTMLEditor(
                this._nodes.div_htmleditor
            );
            this._nodes.div_htmleditor.style.display='';
        },leave(){
            this.textarea_content.value=
                this.htmleditor.html();
            this._nodes.div_htmleditor.style.display='none';
        },
    },
    preview:{
        come(){
            this._nodes.div_preview.style.display='';
            this._nodes.div_preview.innerHTML='';
            doe(
                this._nodes.div_preview,
                newPageContentUi(
                    id=>this.pagemodules[id-1],
                    this._pagePlugins,
                    this.textarea_content.value,
                    parseInt(this._nodes.select_id_pagemodule.value,10),
                )
            );
        },leave(){
            this._nodes.div_preview.style.display='none';
        },
    },
};

function setup_form(){
    let
        editpage=this,
        button_save=this._nodes.button_save,
        button_submit=this._nodes.button_submit,
        input_newtag=this._nodes.input_newtag,
        input_newname=this._nodes.input_newname;
    addEventListener('keydown',e=>{
        if(!(
            e.ctrlKey&&e.shiftKey&&e.keyCode==83
        ))
            return
        ;(async()=>{
            let page=await editpage.submit();
            onbeforeunload=null;
            location=page.id;
        })();
    });
    button_save.addEventListener('click',()=>{
        // to-do: let user know
        editpage.submit();
    });
    button_submit.addEventListener('click',async()=>{
        let page=await editpage.submit();
        onbeforeunload=null;
        location=page.id;
    });
    input_newtag.addEventListener('keypress',e=>{
        editpage.setOfTags.onkeypress(e);
    });
    input_newname.addEventListener('keypress',e=>{
        editpage.setOfNames.onkeypress(e);
    });
}

async function submit(){
    this.changeEditor('html');
    let id,data={
        id_pagemodule:  +this._nodes.select_id_pagemodule.value,
        ispublic:       this._nodes.select_privacy.value==3,
        tags:           this.setOfTags.toArray(),
        pagenames:      this.setOfNames.toArray(),
        title:          this._nodes.input_title.value,
        content:        this.textarea_content.value,
    };
    if(this.id){
        id=this.id;
        await this._site.send({
            function:'blog_setPage',
            id_page:this.id,
            data,
        });
    }else
        id=await this._site.send({
            function:'blog_putPage',
            data,
        });
    return {id}
}

var style$1 = `html{
    height:100%;
}
body{
    margin:0px;
    min-height:360px;
    height:100%;
}
body>.main{
    margin:0px auto;
    max-width:600px;
    width:100%;
    height:100%;
}
body>.main>table{
    width:100%;
    height:100%;
}
body>.main>table td{
    padding:2px;
}
input.title{
    box-sizing:border-box;
    width:100%;
}
.contentTc{
    height:100%;
}
.content{
    height:100%;
}
.content>textarea{
    box-sizing:border-box;
    width:100%;
    height:100%;
}
.htmleditor{
    margin:0px;
    border:1px solid lightgray;
    padding:8px;
    height:100%;
    overflow-y:auto;
    line-height:100%;
}
.preview{
    margin:0px;
    border:1px solid lightgray;
    padding:8px;
    height:100%;
    overflow-y:auto;
    line-height:100%;
}
span.tag{
    border:solid 1px lightgray;
    margin-right:4px;
    margin-bottom:4px;
    font-family:sans-serif;
}
span.tag a{
    text-decoration:none;
}
span.name{
    border:solid 1px lightgray;
    margin-right:4px;
    margin-bottom:4px;
    font-family:sans-serif;
}
span.name a{
    text-decoration:none;
}
/* 2015-09-02 Make something float. */
span.tag{
    float:left;
}
span.name{
    float:left;
}
`;

function createNodes(){
    this._nodes={};
    this._nodes.main=doe.div({className:'main'},
        this._nodes.table_content=doe.table(
            doe.tr(doe.td(
                this._nodes.select_id_pagemodule=doe.select(
                    doe.option(
                        {value:0},
                        'No Pagemodule',
                    ),
                ),' ',
                this._nodes.select_privacy=doe.select(
                    doe.option({value:0},'Hidden'),
                    doe.option({value:1},'Private'),
                    doe.option({value:2},'Unlisted'),
                    doe.option({value:3},'Public'),
                ),' ',
                this._nodes.button_save=doe.button('Save'),' ',
                this._nodes.button_submit=doe.button('Submit'),' ',
            )),
            doe.tr(doe.td(
                this._nodes.span_tags=doe.span(),
                this._nodes.input_newtag=doe.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Tag ...',
                    disabled:true,
                },n=>{
                    n.setAttribute('list',this._datalistId);
                }),
            )),
            doe.tr(doe.td(
                this._nodes.span_names=doe.span(),
                this._nodes.input_newname=doe.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Name ...',
                    disabled:true,
                }),
            )),
            doe.tr(doe.td(
                this._nodes.input_title=doe.input({
                    className:'title',
                    type:'text',
                    placeholder:'Title',
                    disabled:true,
                }),
            )),
            doe.tr(doe.td(
                doe.button(
                    {onclick:e=>{
                        e.preventDefault();
                        this.changeEditor('html');
                    }},
                    'HTML'
                ),' ',
                ...(arg.h?[
                    doe.button(
                        {onclick:e=>{
                            e.preventDefault();
                            this.changeEditor('htmleditor');
                        }},
                        'WYSIWYG'
                    ),' ',
                ]:[]),
                doe.button(
                    {onclick:e=>{
                        e.preventDefault();
                        this.changeEditor('preview');
                    }},
                    'Preview'
                ),
            )),
            doe.tr(doe.td({className:'contentTc'},
                this._nodes.div_textarea_content=doe.div(
                    {className:'content'},
                    this._nodes.textarea_content=doe.textarea({
                        disabled:true
                    }),
                ),
                this._nodes.div_htmleditor=doe.div(
                    {className:'htmleditor'},
                    n=>{n.style.display='none';}
                ),
                this._nodes.div_preview=doe.div(
                    {className:'preview'},
                    n=>{n.style.display='none';}
                ),
            )),
        ),
        this._nodes.tags=doe.datalist({id:this._datalistId}),
    );
}

function SetForm(span_tags,input){
    this.tags=[];
    this.tagIdInTagsByName={};
    this.span_tags=span_tags;
    this.input=input;
}
SetForm.prototype.toArray=function(){
    let res=[];
    this.tags.map(t=>res.push(t.name));
    return res
};
SetForm.prototype.addTag=function(name){
    let
        setForm=this,
        tag=new Tag(name);
    setForm.tags.push(tag);
    setForm.tagIdInTagsByName[name]=setForm.tags.length-1;
    doe(setForm.span_tags,tag.body);
    function Tag(name){
        let
            span_name,
            span=doe.span(
                {className:'tag'},
                span_name=doe.span({innerHTML:name}),
                ' ',
                a(),
            );
        this.body=span;
        this.name=name;
        function a(){
            return doe.a({
                href:'javascript:',
                onclick(){
                    let id=setForm.tagIdInTagsByName[name];
                    setForm.tags[id]=setForm.tags[setForm.tags.length-1];
                    setForm.tagIdInTagsByName[setForm.tags[id].name]=id;
                    delete setForm.tagIdInTagsByName[name];
                    setForm.tags.pop();
                    span.parentNode.removeChild(span);
                },
                innerHTML:`
                    <i class=material-icons style=font-size:16pt>
                        remove
                    </i>
                `
            },a=>{
                a.style.verticalAlign='middle';
                a.style.display='inline-block';
            })
        }
    }
};
SetForm.prototype.onkeypress=function(e){
    let name=this.input.value;
    if(
        e.key!='Enter'||
        this.input.value==''||
        this.tagIdInTagsByName[name]!==undefined
    )
        return
    e.stopPropagation();
    this.input.value='';
    this.addTag(name);
};

function setup$1(editpage,isMobile){
    let main=editpage._nodes.main;
    editpage.textarea_content=editpage._nodes.textarea_content;
    onbeforeunload=()=>{
        return ''
    };
    main.classList.add(!isMobile?'nonMobile':'mobile');
    editpage.setup_form();
    editpage.emit('setUp');
    editpage.setUp=true;
}

function update(editpage,data){
    let textarea_content=editpage._nodes.textarea_content;
    data.pagemodules.map(async e=>{
        await e.definitions;
        editpage.pagemodules.push(e);
    });
    editpage._nodes.select_privacy.value=
        editpage.id&&data.page.ispublic?3:1;
    data.pagemodules.sort((a,b)=>
        a.priority-b.priority
    );
    data.pagemodules.map(e=>{
        let option=doe.option(e.name,{value:e.id});
        if(editpage.id&&e.id==data.lastversion_page.id_pagemodule)
            option.selected='selected';
        doe(editpage._nodes.select_id_pagemodule,option);
    });
    editpage.id&&data.page.tags.map(e=>{
        editpage.setOfTags.addTag(e);
    });
    editpage.id&&data.page.pagenames.map(e=>{
        editpage.setOfNames.addTag(e);
    });
    data.tags.map(e=>{
        doe(editpage._nodes.tags,doe.option({value:e}));
    });
    if(editpage.id){
        editpage._nodes.input_title.value=
            data.lastversion_page.title;
        textarea_content.value=
            data.lastversion_page.content;
    }
    editpage._nodes.input_newtag.disabled=false;
    editpage._nodes.input_newname.disabled=false;
    editpage._nodes.input_title.disabled=false;
    editpage._nodes.textarea_content.disabled=false;
    if(editpage.id){
        textarea_content.selectionStart=
        textarea_content.selectionEnd=0;
        textarea_content.focus();
    }
}

async function getData$1(editpage){
    let res={};
    if(editpage.id){
        let
            site=await editpage._site,
            page=await site.getPage(editpage.id),
            pageversion=await page.lastversion;
        await Promise.all([
            page.load([
                'public',
                'lastversionId',
                'preferredPagename',
                'timestamp_insert',
                'timestamp_lastmodified',
                'author',
                'pagenames',
                'tags',
            ]),
            pageversion.load([
                'content',
                'id_page',
                'id_pagemodule',
                'id_user_author',
                'timestamp_insert',
                'title',
            ]),
        ]);
        res.page={
            id:page.id,
            id_user_author:page.author,
            ispublic:page.public,
            id_lastversion:page.lastversionId,
            preferredPagename:page.preferredPagename,
            timestamp_insert:page.timestamp_insert,
            timestamp_lastmodified:page.timestamp_lastmodified,
            pagenames:page.pagenames,
            tags:page.tags,
        };
        res.lastversion_page={
            content:pageversion.content,
            id:pageversion.id,
            id_page:pageversion.id_page,
            id_pagemodule:pageversion.id_pagemodule,
            id_user_author:pageversion.id_user_author,
            timestamp_insert:pageversion.timestamp_insert,
            title:pageversion.title,
        };
    }
    return res
}
async function initialize(editpage){
    editpage.isMobile=browser.isMobile;
    document.title=!editpage.id?'New Page':'Edit Page';
    setup$1(editpage,editpage.isMobile);
    let res=await Promise.all([
        getData$1(editpage),
        editpage._site.send('blog_getTags'),
        (async()=>{
            let res=await editpage._site.send('blog_getPagemodules');
            return Promise.all(res.map(async id=>{
                let pagemodule=await editpage._site.getPagemodule(id);
                return pagemodule.load([
                    'priority',
                    'name',
                ])
            }))
        })(),
    ]);
    let data=res[0];
    data.tags=res[1];
    data.pagemodules=res[2];
    update(editpage,data);
}

function load(){
    this.load=(async()=>{
        await Promise.all([
            (async()=>{
                doe.body(
                    doe.script({
                        src:'https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js',
                        onload(){
                            doe.body(1,this);
                        }
                    })
                );
            })(),
            load$1.materialIcon(),
        ]);
        this.pagemodules=[];
        this.setOfTags=new SetForm(
            this._nodes.span_tags,
            this._nodes.input_newtag,
        );
        this.setOfNames=new SetForm(
            this._nodes.span_names,
            this._nodes.input_newname,
        );
        this.currentEditor='html';
        this.load=this._site.applyPlugins('editpage',this);
        this._pagePlugins=[
            ...corePlugins,
            ...await this._site.loadPlugins('blog_page'),
        ];
        // start set up image uploader
        let imageUploader=new ImageUploader({
            send:this._site.send.bind(this._site),
            post:this._site.post.bind(this._site),
        });
        let fileButton=dom.createFileButton('Image');
        fileButton.on('file',async a=>{
            fileButton.n.disabled=true;
            let imageIds=await imageUploader.uploadImages(a);
            imageIds.map(id=>
                this.textarea_content.value+=
                    `<a href=img/${id}.jpg><img src=img/${
                        id
                    }c800x600.jpg style=width:100%></a>\n`
            );
            fileButton.n.disabled=false;
        });
        doe(this._nodes.table_content,createUploadImageTr());
        function createUploadImageTr(){
            return doe.tr(createUploadImageTd())
        }
        function createUploadImageTd(){
            return doe.td(fileButton.n)
        }
        // end set up image uploader
        initialize(this);
    })();
}

function Editpage(site,environment){
    EventEmmiter.call(this);
    this.id=environment.id_page||0;
    this._site=site;
    this._datalistId=Math.random().toString(36).substring(2);
    createNodes.call(this);
    this.node=this._nodes.main;
    load.call(this);
}
Object.setPrototypeOf(Editpage.prototype,EventEmmiter.prototype);
Object.defineProperty(Editpage.prototype,'currentUser',{get(){
    return this._site.currentUser
}});
Editpage.prototype.setup_form=setup_form;
Editpage.prototype.submit=submit;
Editpage.prototype.editors=editors;
Editpage.prototype.changeEditor=function(id){
    this.editors[this.currentEditor].leave.call(this);
    this.currentEditor=id;
    this.editors[this.currentEditor].come.call(this);
};
Editpage.style=style$1;

function Pagemodule(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Pagemodule.prototype,AltheaObject.prototype);
Pagemodule.prototype._loader='blog_getPagemoduleInfo';
Object.defineProperty(Pagemodule.prototype,'definitions',{get(){
    return (async()=>{
        return this.definitionsSync=
            await this._io.getDefinitionByPagemodule()
    })()
}});
Pagemodule.prototype.compile=function(s){
    this.definitionsSync.map(d=>{
        // data bug patch
        s=s||'';
        s=s.split(d.name).join(d.content);
    });
    s=s.replace(/\[encodeURIComponent\][\s\S]*?\[\/encodeURIComponent\]/g,s=>{
        return encodeURIComponent(s.substring(
            '[encodeURIComponent]'.length,
            s.length-'[/encodeURIComponent]'.length
        ))
    }).replace(/\[nothing\][\s\S]*?\[\/nothing\]/g,s=>{
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

function Pageversion(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Pageversion.prototype,AltheaObject.prototype);
Pageversion.prototype._loader='blog_getPageversion';

function Comment(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Comment.prototype,AltheaObject.prototype);
Comment.prototype._loader='blog_getComment';

function Site(){
    Site$1.call(this);
    this._pagemodules={};
    this._pageversions={};
}
Object.setPrototypeOf(Site.prototype,Site$1.prototype);
Site.prototype.getComment=async function(id){
    return new Comment({
        send:this.send.bind(this),
    },id)
};
Site.prototype.getPage=async function(id){
    return new Page({
        send:this.send.bind(this),
        getPageversion:this.getPageversion.bind(this),
    },id)
};
Site.prototype.getPagemodule=async function(id){
    return this._pagemodules[id]||(this._pagemodules[id]=
        new Pagemodule({
            send:this.send.bind(this),
            getDefinitionByPagemodule:()=>
                this.send({
                    function:'blog_getDefinitionByPagemodule',
                    id,
                })
        },id)
    )
};
Site.prototype.getPageversion=async function(id){
    return this._pageversions[id]||(this._pageversions[id]=
        new Pageversion({
            send:this.send.bind(this),
        },id)
    )
};
Site.prototype.path=Object.setPrototypeOf({
    blog:{
        page:p=>p,
        root:'.',
        tag:a=>`tags/${a.map(encodeURIComponent).join('/')}`,
    },
    editpage:p=>`${p}/edit`,
    newpage:'newpage',
},Site$1.prototype.path);

var core = {
    Blog,
    Editpage,
    Site,
};

export default core;
export { Blog, Editpage, Site };
