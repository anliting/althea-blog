let
    updateDatabase=     require('./server/updateDatabase'),
    queryFunctions=     require('./server/queryFunctions'),
    loadBlogProperties= require('./server/loadBlogProperties'),
    blog=               require('./server/blog'),
    editpage=           require('./server/editpage'),
    pageversions=       require('./server/pageversions')
module.exports=async althea=>{
    loadBlogProperties(althea.database)
    Object.entries(queryFunctions).map(([k,v])=>{
        althea.addQueryFunction(k,(opt,env)=>
            v(althea.database,opt,env)
        )
    })
    althea.addPagemodule('/',blog)
    althea.addPagemodule('/newpage',editpage)
    althea.addPagemodule('/pageversions',pageversions)
    althea.addPagemodule(e=>{
        let path=e.analyze.request.parsedUrl.pathname.split('/')
        let res=path[1]=='tags'&&2<path.length
        if(res)
            e.tags_selected=path.slice(2)
        return res
    },blog)
    althea.addPagemodule('blog',blog)
    althea.addPagemodule('editpage',editpage)
    await updateDatabase(althea)
}
