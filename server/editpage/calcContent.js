module.exports=calcContent
function calcContent(env){
    return`
<!doctype html>
<title>Althea</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    'plugins/blog/editpage.js',
    {
        editpageEnv:{
            id_page:env.id_page,
        }
    },
)}
    `
}
