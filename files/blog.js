import{Snapshot,hacker,doe}from'/lib/core.static.js'
import{Blog,Site}from'/plugins/blog/core.static.js'
import setupAutoScroll from './blog/setupAutoScroll.js'
let
    site=new Site,
    blog=new Blog(site,arg.status),
    main=createMainThread()
if(
    localStorage.althea&&
    0<=String(localStorage.althea).split(' ').indexOf('h')
)
    setupApi()
function createMainThread(){
    createThisThread()
    return createBlogThread()
}
async function createThisThread(){
    history.replaceState(
        JSON.stringify(blog.status),
        ''
    )
    blog.on('statusChange',()=>{
        history.pushState(
            JSON.stringify(blog.status),
            '',
            blog.path.calcPathByStatus(blog.status)
        )
    })
    onpopstate=e=>{
        if(!e.state)
            return
        blog.status=JSON.parse(e.state)
    }
    blog.on('location',p=>location=p)
}
async function createBlogThread(){
    let view=blog.view
    await blog.load
    setupGetNextOnScrollEvent()
    setupAutoScroll(blog)
    doe.head(view.style)
    doe.body(view.div)
    addEventListener('keydown',e=>
        view.keydown(e)
    )
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
    onscroll=()=>{
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
    }
}
