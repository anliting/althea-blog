(async()=>{
    ;(await module.importByPath('lib/general.static.js',{mode:1}))(module)
    ;(await module.shareImport('../l/repository.js'))(module)
    let
        site=module.repository.blog.site,
        blog=loadBlog(site,module.arguments.status)
        main=createMainThread(site,blog)
    if(
        localStorage.althea&&
        0<=String(localStorage.althea).split(' ').indexOf('h')
    )
        setupApi(blog)
    setupProgress([
        site,
        blog,
        {p:main,s:4}
    ])
})()
async function loadBlog(site,status){
    let Blog=await module.repository.blog.Blog
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
        view=               blog.then(o=>o.view),
        setupAutoScroll=    module.shareImport('blog/setupAutoScroll.js')
    blog=await blog
    site=await site
    view=await view
    setupAutoScroll=await setupAutoScroll
    await blog.load
    setupGetNextOnScrollEvent(blog)
    setupAutoScroll(blog)
    document.body.appendChild(view.div)
    document.body.addEventListener('keydown',e=>
        view.keydown(e)
    )
    document.head.appendChild(await view.style)
}
async function setupProgress(a){
    let Progress=await module.repository.althea.Progress
    let p=new Progress(a),v=p.view
    document.head.appendChild(Progress.style)
    document.body.appendChild(v.node)
    await p.complete
    await new Promise(rs=>setTimeout(rs,2*p._animationDelay))
    document.head.removeChild(Progress.style)
    document.body.removeChild(v.node)
    v.free
}
async function setupApi(blog){
    module.repository.althea.hacker.then(async hacker=>
        hacker.blog=await blog
    )
    let
        Snapshot=await module.repository.althea.Snapshot,
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
