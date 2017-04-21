async function loadPagemodules(blog){
    let vals=await Promise.all([
        module.repository.althea.Pagemodule,
        blog._site.then(site=>
            site.send('getPagemodules')
        ),
    ])
    let
        Pagemodule=     vals[0],
        pagemodules=    vals[1]
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
