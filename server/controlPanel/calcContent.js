function calcContent(env){
    return`
<!doctype html>
<title>Blog Control Panel</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    //'plugins/althea-blog/controlPanel.js',
    'plugins/althea-blog/controlPanel.static.js',
    null,
    {
        sharedWorker:1,
    },
)}
`
}
module.exports=calcContent
