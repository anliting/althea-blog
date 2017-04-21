async function loadPagemodules(blog){
    let[
        Pagemodule,
        pagemodules,
    ]=await Promise.all([
        module.repository.blog.Pagemodule,
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
loadPagemodules
