function calcContent(env){
    let content=`
<!doctype html>
<title>Blog Control Panel</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    'plugins/althea-blog/controlPanel.js',
    null,
    {
        sharedWorker:1,
    },
)}
`
    return content
}
module.exports=calcContent
