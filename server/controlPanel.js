let
    calcContent=    require('./controlPanel/calcContent')
module.exports=(db,env)=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(db,env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
async function get(db,env){
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:calcContent(env),
    }
}
