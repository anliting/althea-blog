let
    updateDatabase=     require('./server/updateDatabase'),
    queryFunctions=     require('./server/queryFunctions'),
    loadBlogProperties= require('./server/loadBlogProperties')
module.exports=async althea=>{
    loadBlogProperties(althea.database)
    Object.entries(queryFunctions).map(([k,v])=>{
        althea.addQueryFunction(k,(opt,env)=>
            v(althea.database,opt,env)
        )
    })
    await updateDatabase(althea)
}
