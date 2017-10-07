import AltheaObject from '/lib/AltheaObject.js';
import dom from '/lib/tools/dom.js';
import EventEmmiter from 'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js';
import html from '/lib/tools/html.js';
import site from '/lib/site.js';
import order from '/lib/tools/order.js';

function setup(){
    let
        page=this,
        a_comment,
        textarea_comment__form_comment;
    a_comment=dom.a();
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
    textarea_comment__form_comment=dom.textarea();
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
        let input_submit__form_comment=dom.input();
        input_submit__form_comment.className='input_comment_submit';
        input_submit__form_comment.type='submit';
        input_submit__form_comment.value='Submit';
        input_submit__form_comment.style.display='none';
        return input_submit__form_comment
    }
}

var commentForm = page=>{
    let form=dom.form(
        page.textarea_comment__form_comment,
        dom.br(),
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

var commentDiv = (page,comment)=>{
    let div=dom.div();
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
                html.encodeText(comment.content)
            }</div>`;
        if(cu.isadmin)
            div.appendChild(deleteA(comment.id));
    })();
    return div
    function deleteA(id){
        let a=dom.a('delete',{href:'javascript:'});
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

function PageView(page){
    EventEmmiter.call(this);
    this.domElement=createDiv(this,page);
}
Object.setPrototypeOf(PageView.prototype,EventEmmiter.prototype);
function createDiv(pageView,page){
    let
        div=dom.div();
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
        div=dom.div({
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
    let div=dom.div({className:'fb-like'});
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

let str_show='<i class=material-icons>expand_more</i>';
let str_hide='<i class=material-icons>expand_less</i>';
function createHideShowA(page,pageView){
    let a_hideshow=dom.a({
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
    return dom.td(span_privacy())
    function span_privacy(){
        let span=dom.span(span=>{span.style.fontStyle='italic';});
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
            let span=dom.span(
                dateToString(new Date(page.timestamp_insert))
            );
            span.title=`Last modified: ${
                page.datetime_lastmodified
            }`;
            return span
        }
        function privateSpan(){
            return dom.span('private')
        }
        function dateToString(d){
            return`${d.getFullYear()}-${1+d.getMonth()}-${
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
    table_privacy=dom.table(
        tr_privacy(page),
        tr_tags()
    );
    table_privacy.style.width='100%';
    table_privacy.style.marginBottom='20px';
    return table_privacy
    function tr_privacy(page){
        return dom.tr(
            privacyTd(page),
            td_functions()
        )
    }
    function td_functions(){
        let td=dom.td(
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
            let a=dom.a();
            a.className='a_editpage functionbutton';
            a.href=page.id+'/edit';
            a.innerHTML='<i class=material-icons>mode_edit</i>';
            return a
        }
        function a_removepage(){
            let a=dom.a();
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
        return dom.tr(td())
    }
    function td(){
        let
            td=dom.td(),
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
    let h1_title=dom.h1(a_h1_title());
    h1_title.style.textAlign='center';
    return h1_title
    function a_h1_title(){
        let a=dom.a(page.title);
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
BlogPage.prototype.createAuthorDiv=function(){
    let div=dom.div();
    div.style.textAlign='center';
    div.style.display='none';
    div.style.fontSize='1.5em'
    ;(async()=>{
        let site$$1=await this.blog._site;
        let u=await site$$1.getUser(this.authorId);
        await u.load('nickname');
        dom(div,u.nickname);
    })();
    return div
};
BlogPage.prototype.createDateDiv=function(){
    let
        div=dom.div(),
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

function Page(){
    AltheaObject.apply(this,arguments);
}
Object.setPrototypeOf(Page.prototype,AltheaObject.prototype);
Page.prototype._loader='getPage';
Object.defineProperty(Page.prototype,'a',{get(){
    let a=dom.a({href:this.id});
    this.lastversion.then(async pv=>{
        await pv.load('title');
        a.textContent=pv.title||'Untitled';
    });
    return a
}});
Object.defineProperty(Page.prototype,'lastversion',{async get(){
    await this.load('lastversionId');
    return this._site.getPageversion(this.lastversionId)
}});
Page.BlogPage=BlogPage;

export default Page;
