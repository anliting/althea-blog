import{Snapshot,hacker,doe}from'/lib/core.static.js'
import{Blog,Site}from'/plugins/blog/core.static.js'
import setupAutoScroll from './blog/setupAutoScroll.js'
let
    site=new Site,
    blog=loadBlog(arg.status),
    main=createMainThread()
if(
    localStorage.althea&&
    0<=String(localStorage.althea).split(' ').indexOf('h')
)
    setupApi()
//setupProgress(main)
function loadBlog(status){
    return new Blog(site,status)
}
function createMainThread(){
    createThisThread()
    return createBlogThread()
}
async function createThisThread(){
    history.replaceState(
        JSON.stringify(blog.status),
        ''
    )
    let push=1
    blog.on('statusChange',()=>{
        if(!push)
            return
        history.pushState(
            JSON.stringify(blog.status),
            '',
            blog.path.calcPathByStatus(blog.status)
        )
    })
    addEventListener('popstate',e=>{
        if(!e.state)
            return
        push=0
        blog.status=JSON.parse(e.state)
        push=1
    })
    blog.on('location',p=>location=p)
}
async function createBlogThread(){
    let view=blog.view
    await blog.load
    setupGetNextOnScrollEvent()
    setupAutoScroll(blog)
    doe.head(view.style)
    doe.body(view.div)
    document.body.addEventListener('keydown',e=>
        view.keydown(e)
    )
}
async function setupProgress(a){
    let p=new Progress(a),v=p.view
    let style=Object.assign(document.createElement('style'),{
        textContent:Progress.style
    })
    doe.head(style)
    doe.body(v.node)
    await p.complete
    await new Promise(rs=>setTimeout(rs,2*p._animationDelay))
    doe.head(1,style)
    doe.body(1,v.node)
    v.free
}
async function setupApi(){
    hacker.site=site
    hacker.blog=blog
    let
        snapshot=new Snapshot(window)
    console.log('js/blog.js:',snapshot.new)
    window.hacker=hacker
}
function setupGetNextOnScrollEvent(){
    addEventListener('scroll',()=>{
        if(!(
            !('pageId' in blog.status)&&
            blog.pages_loaded.length<32&&(
                !blog.status.pageId&&
                !blog.status.pageversionId
            )
        ))
            return
        let top=document.documentElement.scrollTop
        // fix for chromium/chrome
        top=top||document.body.scrollTop
        top+8*screen.height<document.body.scrollHeight||
            blog.getting||
            blog._getNext()
    })
}
