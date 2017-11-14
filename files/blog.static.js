import { Progress, Snapshot, hacker, load } from '/lib/core.static.js';
import { Blog, Site } from '/plugins/blog/core.static.js';

function setupAutoScroll(blog){
    let
        period=16,
        speed=0.025,
        dy=0,
        isAutoScrollStarted=false,
        timeoutIdAutoScroll;
    document.body.addEventListener('keydown',e=>{
        if(!isAutoScrollStarted){
            isAutoScrollStarted=true;
            timeoutIdAutoScroll=setTimeout(autoScroll,0);
        }
        if(
            0<=
            [
                'INPUT',
                'TEXTAREA',
            ].indexOf(
                document.activeElement.tagName
            )
        )
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
            if(e.keyCode==67){ // c
                (async()=>{
                    let u=await blog._currentUser;
                    u.isadmin&&(location='blog-control-panel');
                })();
            }else if(e.keyCode==71) // g
                dy=-document.body.scrollHeight;
            else if(e.keyCode==74) // j
                dy=speed*innerHeight;
            else if(e.keyCode==75) // k
                dy=-speed*innerHeight;
            else if(e.keyCode==77) // m
                blog.navigationbar.toggle();
            else if(e.keyCode==78){ // n
                (async()=>{
                    let u=await blog._currentUser;
                    u.isadmin&&(location='newpage');
                })();
            }else if(e.keyCode==80){ // p
                print();
            }else if(e.keyCode==82){ // r
                location='user';
            }else
                return false
            return true
        }
        function handleShift(){
            if(e.keyCode==71) // G
                dy=document.body.scrollHeight;
            else if(e.keyCode==74){ // J
                let x=Infinity;
                Object.keys(blog.pages).map(i=>{
                    let e=blog.pages[i];
                    if(!e.div)
                        return
                    if(
                        1<e.div.getBoundingClientRect().top
                    )
                        x=Math.min(
                            x,
                            e.div.getBoundingClientRect().top
                        );
                });
                if(x!==Infinity)
                    document.body.scrollTop+=x;
            }else if(e.keyCode==75){ // K
                let x=-Infinity;
                Object.keys(blog.pages).map(i=>{
                    let e=blog.pages[i];
                    if(!e.div)
                        return
                    if(
                        e.div.getBoundingClientRect().top<0
                    )
                        x=Math.max(
                            x,
                            e.div.getBoundingClientRect().top
                        );
                });
                if(x!==-Infinity)
                    document.body.scrollTop+=x;
            }else if(e.keyCode==78){ // N
                open('newpage','_blank').focus();
            }else if(e.keyCode==80){ // P
                let originalTitle=document.title;
                document.title+='.html';
                print();
                document.title=originalTitle;
            }else
                return false
            return true
        }
    });
    document.body.addEventListener('keyup',e=>{
        resetAutoScroll();
    });
    function autoScroll(){
        scrollBy(0,dy);
        timeoutIdAutoScroll=setTimeout(autoScroll,period);
    }
    function resetAutoScroll(){
        dy=0;
        clearTimeout(timeoutIdAutoScroll);
        isAutoScrollStarted=false;
    }
}

let site=new Site;(async()=>{
    let
        module=await load.module(),
        blog=loadBlog(site,arg.status,Blog),
        main=createMainThread(site,blog);
    if(
        localStorage.althea&&
        0<=String(localStorage.althea).split(' ').indexOf('h')
    )
        setupApi(hacker,Snapshot,blog);
    setupProgress(Progress,[
        site,
        blog,
        {p:main,s:4}
    ]);
})();
function loadBlog(site,status,Blog$$1){
    return new Blog$$1(site,status)
}
function createMainThread(site,blog){
    return[
        {p:createThisThread(blog),s:1},
        {p:createBlogThread(site,blog),s:3},
    ]
}
async function createThisThread(blog){
    blog=await blog;
    history.replaceState(
        JSON.stringify(blog.status),
        ''
    );
    let push=1;
    blog.on('statusChange',()=>{
        if(!push)
            return
        history.pushState(
            JSON.stringify(blog.status),
            '',
            blog.path.calcPathByStatus(blog.status)
        );
    });
    addEventListener('popstate',e=>{
        if(!e.state)
            return
        push=0;
        blog.status=JSON.parse(e.state);
        push=1;
    });
    blog.on('location',p=>location=p);
}
async function createBlogThread(site,blog){
    let
        view=blog.view;
    blog=await blog;
    site=await site;
    view=await view;
    await blog.load;
    setupGetNextOnScrollEvent(blog);
    setupAutoScroll(blog);
    document.body.appendChild(view.div);
    document.body.addEventListener('keydown',e=>
        view.keydown(e)
    );
    document.head.appendChild(await view.style);
}
async function setupProgress(Progress$$1,a){
    let p=new Progress$$1(a),v=p.view;
    let style=Object.assign(document.createElement('style'),{
        textContent:Progress$$1.style
    });
    document.head.appendChild(style);
    document.body.appendChild(v.node);
    await p.complete;
    await new Promise(rs=>setTimeout(rs,2*p._animationDelay));
    document.head.removeChild(style);
    document.body.removeChild(v.node);
    v.free;
}
async function setupApi(hacker$$1,Snapshot$$1,blog){
    hacker$$1.blog=await blog;
    let
        snapshot=new Snapshot$$1(window);
    console.log('js/blog.js:',snapshot.new);
}
function setupGetNextOnScrollEvent(blog){
    addEventListener('scroll',()=>{
        if(!(
            !('pageId' in blog.status)&&
            blog.pages_loaded.length<32&&(
                !blog.status.pageId&&
                !blog.status.pageversionId
            )
        ))
            return
        let top=document.documentElement.scrollTop;
        // fix for chromium/chrome
        top=top||document.body.scrollTop;
        top+8*screen.height<document.body.scrollHeight||
            blog.getting||
            blog._getNext();
    });
}
