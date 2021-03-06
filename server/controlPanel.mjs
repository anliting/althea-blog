function calcContent(env){
    return`
<!doctype html>
<title>Blog Control Panel</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    //'plugins/blog/controlPanel.js',
    'plugins/blog/controlPanel.static.js',
    null,
    {
        sharedWorker:1,
    },
)}
`
}
async function get(db,env){
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
        content:calcContent(env),
    }
}
export default(db,env)=>{
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
