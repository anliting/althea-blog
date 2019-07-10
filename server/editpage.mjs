import calcContent from './editpage/calcContent.mjs'
async function get(env){
    let u=await env.database.getCurrentUserByRequest(env.request)
    if(!u.isadmin)
        return 403
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:calcContent(env)
    }
}
export default env=>{
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
