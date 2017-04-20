let
    updateDatabase= require('./server/updateDatabase'),
    queryFunctions= require('./server/queryFunctions')
module.exports=async althea=>{
    Object.entries(queryFunctions).map(([k,v])=>{
        althea.addQueryFunction(k,v)
    })
    await updateDatabase(althea)
}
