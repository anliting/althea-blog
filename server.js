let
    updateDatabase=     require('./server/updateDatabase'),
    queryFunctions=     require('./server/queryFunctions')
module.exports=async althea=>{
    Object.entries(queryFunctions).map(([k,v])=>{
        althea.addQueryFunction(k,(opt,env)=>
            v(althea.database,opt,env)
        )
    })
    await updateDatabase(althea)
}
