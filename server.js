let
    updateDatabase=     require('./server/updateDatabase'),
    queryFunctions=     require('./server/queryFunctions'),
    loadBlogProperties= require('./server/loadBlogProperties'),
    blog=               require('./server/blog'),
    editpage=               require('./server/editpage'),
    pageversions=           require('./server/pageversions'),
    checkIfIsPageRequest=   require('./server/checkIfIsPageRequest')
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
    althea.addPagemodule(async r=>{
        let path=r.analyze.request.parsedUrl.pathname.split('/')
        let res=await checkIfIsPageRequest(r,path)
        switch(res.status){
            case 0:
                throw res.err
            case 1:
                return
            case 2:
                r.analyze.blog={status:403}
                return 1
            case 3:
                r.analyze.blog={type:'blogHome'}
                return 1
            case 4:
                r.analyze.blog={type:'editpage'}
                return 1
        }
    },async r=>{
        if(r.analyze.blog.status)
            return r.analyze.blog.status
        else if(r.analyze.blog.type=='blogHome')
            return await blog(r)
        else if(r.analyze.blog.type=='editpage')
            return await editpage(r)
    })
    await updateDatabase(althea)
}
