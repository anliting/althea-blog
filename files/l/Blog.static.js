import EventEmmiter from 'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js';
import Pagemodule from '/plugins/althea-blog/l/Pagemodule.js';
import dom from '/lib/tools/dom.js';
import Page from '/plugins/althea-blog/l/Page.static.js';
import site from '/lib/site.js';

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
var Page$1 = ({
    star_all,
    tableofcontents_all,
});

let BlogPage=   Page.BlogPage;
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

function anchor_addTag(tag){
    let
        tagsToSelect=(this.status.tagNames||[]).slice();
    tagsToSelect.push(tag.name);
    let
        a=dom.a(tag.name,{
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
        let ul=dom.ul();
        ul.style.float='left';
        for(let p of a){
            let
                li=dom.li(),
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
        return dom.div(n=>{n.style.clear='both';})
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

function createInput(blog,view){
    let input=dom.input();
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

function setupSelectedTagsDiv(blog,div){
    if(!('tagNames' in blog.status))
        return
    blog.status.tagNames.map((t,i)=>{
        div.appendChild(span());
        function span(){
            let span=dom.span(
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
            let anchor=dom.a('-');
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

function userA(blog,div,u){
    let a=dom.a(u.username,{href:'javascript:'});
    a.onclick=e=>{
        e.preventDefault();
        e.stopPropagation();
        let n=userDiv(blog,u);
        event.onceClickOrBlurButNotMouseDown(n,()=>div.removeChild(n));
        dom(div,n);
        n.focus();
    };
    return a
}
function userDiv(blog,u){
    let div=dom.div(innerDiv(blog,u),{tabIndex:0});
    div.style.position='relative';
    div.style.outline='none';
    div.style.height='0';
    div.style.width='100%';
    div.style.top='8px';
    return div
}
function innerDiv(blog,u){
    return dom.div(
        logoutA(blog),
        dom.br(),
        dom.a('Profile',{href:`user/${u.username}`}),
        u.isadmin&&[
            dom.br(),
            dom.a('Drive',{href:`home/${u.username}`}),
            dom.br(),
            dom.a('Settings',{href:'settings'}),
            dom.br(),
            dom.a('New Page',{href:'newpage'}),
        ],n=>{
            n.style.margin='0 auto';
            n.style.backgroundColor='white';
            n.style.border='1px solid lightgray';
        }
    )
}
function logoutA(blog){
    let a=dom.a('Logout');
    a.href='javascript:';
    a.onclick=async e=>{
        e.preventDefault()
        ;(await blog._site).logout;
    };
    return a
}

function createNavigationBar(view){
    let
        blog=view.blog,
        div=dom.div({className:'navigationBar'},menuA());
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
        return dom.a('About',{href:'about'})
    }
    function perUser(site$$1,func){
        site$$1.currentUser.then(func);
        site$$1.on('userChange',()=>{
            site$$1.currentUser.then(func);
        });
    }
    function loginA(){
        let a=dom.a('Login',{href:'javascript:'});
        a.onclick=async e=>{
            e.preventDefault();
            e.stopPropagation()
            ;(await blog._site).showLoginForm;
        };
        return a
    }
    function menuA(){
        let a=dom.a('Menu');
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
        let div=dom.div(innerDiv());
        div.style.position='relative';
        div.style.height='0';
        div.style.width='100%';
        div.style.outline='none';
        div.style.top='8px';
        div.tabIndex=0;
        return div
        function innerDiv(){
            let div=dom.div(aboutA());
            div.style.margin='0 auto';
            div.style.backgroundColor='white';
            div.style.border='1px solid lightgray';
            return div
        }
    }
}

function createHeader(blog,view){
    let div=dom.div(
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
        let div=dom.div();
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
            let a=dom.a({href:''});
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
        let div=dom.div();
        div.className='tagline';
        blog._site.then(s=>s.load).then(site$$1=>{
            div.innerHTML=site$$1.blogTagline;
        });
        return div
    }
    function createSearchForTags(view){
        let div=dom.div(
            createSelectedTagsDiv(),
            view.input=createInput(blog,view),
            view.datalist_input_searchForTag
        );
        div.className='searchForTags';
        return div
        function createSelectedTagsDiv(){
            let div=dom.div();
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
        let div=dom.div();
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
        let div=dom.div();
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

function install_datalist_tags_suggested(blogView){
    blogView.datalist_input_searchForTag=dom.datalist();
    // known best solution
    blogView.datalist_input_searchForTag.id=randomId(16);
}

function use_list_tags__count_suggested(blogView,list,div){
    list.sort((a,b)=>
        a.name.localeCompare(b.name)
    );
    blogView.datalist_input_searchForTag.innerHTML='';
    list.map(e=>{
        let o=dom.option({value:e.name});
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
        return dom.ul(ul=>{ul.style.float='left';})
    }
    function li(t){
        return dom.li(a(t))
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
        return dom.div(div=>{div.style.clear='both';})
    }
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

function createContents(blog){
    let div=dom.div({className:'contents'});
    blog.on('pageLoad',page=>{
        div.appendChild(page.view.domElement);
    });
    blog.on('statusChange',()=>{
        div.innerHTML='';
    });
    return div
}
function createFooter(view){
    let div=dom.div();
    div.className='footer';
    view.blog._site.then(async site$$1=>{
        let res=await site$$1.send('getBlogFooter');
        div.innerHTML=res;
    });
    return div
}
function BlogView(blog){
    this.blog=blog;
    this.div=dom.div();
    this.div.className='blog';
    install_datalist_tags_suggested(this);
    {
        let s=dom.style();
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

var view = {get(){
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
    this.on('pageContentLoad',Page$1.star_all);
    this.on('pageContentLoad',Page$1.tableofcontents_all);
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
Object.defineProperty(Blog.prototype,'view',view);
Blog.prototype.path=path;

export default Blog;
