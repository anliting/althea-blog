import {doe}from '/lib/core.static.js'
async function checkSetupIndex(blog,div){
    if(!blog.status.tagNames)
        return
    let a
    {
        let
            vals=await Promise.all([
                blog._site,
                getPagesByTags(),
            ]),
            site=vals[0],
            pages=vals[1]
        a=await Promise.all(pages.map(async id=>{
            let page=await site.getPage(id)
            let pageversion=await(await page.lastversion).load([
                'public',
                'title'
            ])
            return{
                page,
                public:pageversion.public,
                title:pageversion.title,
            }
        }))
    }
    a.sort((a,b)=>a.title.localeCompare(b.title))
    chunks(a,12).map(a=>{
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
                blog.status={
                    pageId:p.page.id
                }
            })
            doe(ul,doe(li,a))
        }
        doe(div,ul)
    })
    doe(div,createClearBothDiv())
    function createClearBothDiv(){
        return doe.div(n=>{n.style.clear='both'})
    }
    async function getPagesByTags(){
        return(await blog._site).send({
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
}
export default checkSetupIndex
