let
    rollup=require('rollup'),
    skip=[
        '/lib/core.static.js',
        '/plugins/althea-blog/core.static.js',
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
    await link(`files/core.js`,`files/core.static.js`)
    await link(`files/blog.js`,`files/blog.static.js`)
})()
