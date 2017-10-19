(async()=>{
    let lazyMap=await module.repository.althea.lazyMap
    return m=>{
        m.repository.blog=lazyMap({
            Blog:           'Blog.js',
            Comment:        'Comment.js',
            Page:           'Page.js',
            Pagemodule:     'Pagemodule.js',
            Pagemodule0:    'Pagemodule0.js',
            Pageversion:    'Pageversion.js',
            site:           'site.js',
            Site:           'Site.js',
        },s=>module.module(s))
    }
})()
