let
    rollup=require('rollup'),
    skip=[
        '/lib/core.static.js',
        '/plugins/althea-blog/l/core.static.js',
        'https://cdn.rawgit.com/anliting/module/3d316feea7b5a428cf73252750ba79b4a1f4179f/src/esm/moduleLoader.js',
        'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js',
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
;(async()=>{
    await link(`files/l/core.js`,`files/l/core.static.js`)
    await link(`files/s/blog.js`,`files/s/blog.static.js`)
})()
