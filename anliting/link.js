let
    rollup=require('rollup'),
    skip=[
        'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js',
        '/lib/tools/dom.js',
        '/lib/tools/html.js',
        '/lib/site.js',
        '/lib/AltheaObject.js',
        '/lib/tools/order.js',
        '/plugins/althea-blog/l/Page.js',
        '/plugins/althea-blog/l/Page.static.js',
        '/plugins/althea-blog/l/Pagemodule.js',
    ]
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
link(`files/l/Blog.js`,`files/l/Blog.static.js`)
link(`files/l/Page.js`,`files/l/Page.static.js`)
