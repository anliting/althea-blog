let
    calcContent=    require('./blog/calcContent')
module.exports=env=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
async function get(env){
    let pv
    // Get page and pageversion if it is specified.
    if(env.id_page){
        pv=await env.database.getLastversionOfPage(
            await env.database.getPage(env.id_page)
        )
    }
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:calcContent(env,pv),
    }
}
