import Pagemodule from '/plugins/althea-blog/l/Pagemodule.js'
async function loadPagemodules(blog){
    let[
        pagemodules,
    ]=await Promise.all([
        blog._site.then(site=>
            site.send('getPagemodules')
        ),
    ])
    pagemodules.map(p=>
        blog.pagemodules.push(new Pagemodule(
            p.id,
            p.priority,
            p.name,
            p.definitions
        ))
    )
    return blog
}
export default loadPagemodules
