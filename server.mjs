import edges from                   './server/edges'
import queryFunctions from          './server/queryFunctions'
import loadBlogProperties from      './server/loadBlogProperties'
import blog from                    './server/blog'
import editpage from                './server/editpage'
import controlPanel from            './server/controlPanel'
import checkIfIsPageRequest from    './server/checkIfIsPageRequest'
export default async althea=>{
    await althea.updateDatabase(edges)
    let db=Object.create(althea.database)
    loadBlogProperties(db)
    Object.entries(queryFunctions).map(([k,v])=>{
        althea.addQueryFunction(k,(opt,env)=>
            v(db,opt,env,althea)
        )
    })
    althea.addPagemodule('/',r=>blog(althea,db,r))
    althea.addPagemodule('/blog-control-panel',r=>controlPanel(db,r))
    althea.addPagemodule('/newpage',editpage)
    althea.addPagemodule(e=>{
        let path=e.analyze.request.parsedUrl.pathname.split('/')
        let res=path[1]=='tags'&&2<path.length
        if(res)
            e.tags_selected=path.slice(2)
        return res
    },r=>blog(althea,db,r))
    althea.addPagemodule(async r=>{
        let path=r.analyze.request.parsedUrl.pathname.split('/')
        let res=await checkIfIsPageRequest(db,r,path)
        switch(res.status){
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
            return await blog(althea,db,r)
        else if(r.analyze.blog.type=='editpage')
            return await editpage(r)
    })
}