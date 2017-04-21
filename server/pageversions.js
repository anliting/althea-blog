module.exports=env=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method==='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
function get(env){
    var content=`
<!doctype html>
<title>Pageversions</title>
<base href=${env.config.root}>
<body>
<script src=js/pageversions.js></script>
`
    env.headers['content-type']=
        'text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content,
    }
}
