import {Progress,Snapshot,hacker,load} from '/lib/core.static.js'
import {Blog,Site}from '/plugins/blog/core.static.js'
import setupAutoScroll from './blog/setupAutoScroll.js'
let site=new Site
;(async()=>{
    let
        module=await load.module(),
        blog=loadBlog(site,arg.status,Blog),
        main=createMainThread(site,blog)
    if(
        localStorage.althea&&
        0<=String(localStorage.althea).split(' ').indexOf('h')
    )
        setupApi(hacker,Snapshot,blog)
    setupProgress(Progress,[
        site,
        blog,
        {p:main,s:4}
    ])
})()
function loadBlog(site,status,Blog){
    return new Blog(site,status)
}
function createMainThread(site,blog){
    return[
        {p:createThisThread(blog),s:1},
        {p:createBlogThread(site,blog),s:3},
    ]
}
async function createThisThread(blog){
    blog=await blog
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
async function createBlogThread(site,blog){
    let
        view=blog.view
    blog=await blog
    site=await site
    view=await view
    await blog.load
    setupGetNextOnScrollEvent(blog)
    setupAutoScroll(blog)
    document.body.appendChild(view.div)
    document.body.addEventListener('keydown',e=>
        view.keydown(e)
    )
    document.head.appendChild(await view.style)
}
async function setupProgress(Progress,a){
    let p=new Progress(a),v=p.view
    let style=Object.assign(document.createElement('style'),{
        textContent:Progress.style
    })
    document.head.appendChild(style)
    document.body.appendChild(v.node)
    await p.complete
    await new Promise(rs=>setTimeout(rs,2*p._animationDelay))
    document.head.removeChild(style)
    document.body.removeChild(v.node)
    v.free
}
async function setupApi(hacker,Snapshot,blog){
    hacker.blog=await blog
    let
        snapshot=new Snapshot(window)
    console.log('js/blog.js:',snapshot.new)
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
        let top=document.documentElement.scrollTop
        // fix for chromium/chrome
        top=top||document.body.scrollTop
        top+8*screen.height<document.body.scrollHeight||
            blog.getting||
            blog._getNext()
    })
}
