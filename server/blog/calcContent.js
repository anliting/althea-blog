let
    entities=   require('entities'),
    url=        require('url')
module.exports=calcContent
async function calcContent(althea,env,lastversion_page){
    let data=JSON.parse(await althea.getData())
    if(!('title' in data))
        data.title='undefined'
    if(!('description' in data))
        data.description='undefined'
    let type=env.althea.lib.anliting.type
    let
        keys,
        title,
        content,
        metaDescription,
        list
    let
        url_request=url.parse(env.request.url,true)
    keys=Object.keys(url_request.query)
    title=
        (lastversion_page&&lastversion_page.data.title+' - '||'')+
        data.title
    metaDescription=data.description
    list=url_request.pathname.split('/')
    content=`
<!doctype html>
<title>${entities.encodeHTML(data.title)}</title>
<base href=${env.config.root}>
<meta name=robots content=${
    (
        (list[1]===''||type.stringIsInteger(list[1]))&&
        keys.length===0
    )?
        'index,follow'
    :
        'noindex,nofollow'
}>
<meta name=description content='${entities.encodeHTML(metaDescription)}'>
<meta name=viewport content='width=device-width,initial-scale=1'>
<meta name=google content=notranslate>
${env.environmentvariables.og?og(env,data,title,url_request):''}
<link rel=icon href=images/icon.png>
<body>
${env.althea.loadModule(
    //'plugins/althea-blog/s/blog.js',
    'plugins/althea-blog/blog.static.js',
    {
        status:{
            pageId:         env.id_page,
            tagNames:       env.tags_selected,
        }
    },
    {
        sharedWorker:true,
    }
)}
`
    return content
}
function og(env,data,title,url_request){
    let
        ogUrl='https://'+
            env.environmentvariables.domainname+
            url_request.pathname,
        ogImage='https://'+
            env.environmentvariables.domainname+
            '/opengraph/banner0.png',
        ogDescription=data.description
    return`
<meta property=og:url content=${ogUrl}>
<meta property=og:title content='${entities.encodeHTML(title)}'>
<meta property=og:site_name content='${
    entities.encodeHTML(data.title)
}'>
<meta property=og:image content=${ogImage}>
<meta property=og:description content='${entities.encodeHTML(ogDescription)}'>
`
}
