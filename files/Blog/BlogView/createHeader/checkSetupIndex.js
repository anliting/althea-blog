import{doe}from'/lib/core.static.js'
function checkSetupIndex(blog,div){
    let end=()=>{}
    if(blog.status.tagNames)
        (async()=>{
            let a
            let ended
            end=()=>{ended=1}
            {
                let pages=await getPagesByTags()
                a=await Promise.all(pages.map(async id=>{
                    let
                        page=await blog._site.getPage(id),
                        pageversion
                    await Promise.all([
                        page.load([
                            'public',
                        ]),
                        (async()=>{
                            pageversion=await page.lastversion
                            await pageversion.load([
                                'title'
                            ])
                        })()
                    ])
                    return{
                        page,
                        public:page.public,
                        title:pageversion.title,
                    }
                }))
            }
            if(ended)
                return
            a.sort((a,b)=>a.title.localeCompare(b.title))
            doe(div,chunks(a,12).map(a=>{
                let ul=doe.ul()
                ul.style.float='left'
                for(let p of a){
                    let
                        li=doe.li(),
                        a=p.page.a
                    if(!p.public)
                        a.style.color='black'
                    a.addEventListener('click',e=>{
                        if(
                            e.which!=1||
                            e.ctrlKey||
                            e.shiftKey
                        )
                            return
                        e.preventDefault()
                        e.stopPropagation()
                        blog._setStatusEmit({
                            pageId:p.page.id
                        })
                    })
                    doe(ul,doe(li,a))
                }
                return ul
            }),createClearBothDiv())
            end=()=>{div.innerHTML=''}
            function createClearBothDiv(){
                return doe.div(n=>{n.style.clear='both'})
            }
            async function getPagesByTags(){
                return blog._site.send({
                    function:'blog_getPagesByTags',
                    tags:blog.status.tagNames
                })
            }
            function chunks(a,n){
                let res=[]
                for(let i=0;i*n<a.length;i++)
                    res.push(a.slice(i*n,(i+1)*n))
                return res
            }
        })()
    return()=>end()
}
export default checkSetupIndex
