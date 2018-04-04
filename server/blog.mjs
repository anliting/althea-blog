import calcContent from './blog/calcContent'
export default (althea,db,env)=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(althea,db,env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
async function get(althea,db,env){
    let pv
    // Get page and pageversion if it is specified.
    if(env.id_page)
        pv=await db.getLastversionOfPage(
            await db.getPage(env.id_page)
        )
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:await calcContent(althea,env,pv),
    }
}
