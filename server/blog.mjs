import calcContent from'./blog/calcContent.mjs'
export default(althea,db,env)=>{
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
    let p
    if(env.page)
        p=await db.getPage(env.page)
    let ua=env.library.userAgent
    if(!ua.leOr(
        ua.version.esModuleBase,
        ua.parse(env.request.headers['user-agent'])
    ))
        return ua.notSupport(ua.version.esModuleBase)
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:await calcContent(althea,env,p),
    }
}
