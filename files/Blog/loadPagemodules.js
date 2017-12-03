async function loadPagemodules(blog){
    let res=await blog._site.send('blog_getPagemodules0')
    let pagemodules=await Promise.all(res.map(async id=>{
        let pagemodule=await blog._site.getPagemodule(id)
        await Promise.all([
            pagemodule.load([
                'priority',
                'name',
            ]),
            pagemodule.definitions,
        ])
        return pagemodule
    }))
    blog.pagemodules.push(...pagemodules)
    return blog
}
export default loadPagemodules
