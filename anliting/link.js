let
    rollup=require('rollup'),
    skip=[
        '/lib/core.static.js',
        '/plugins/blog/core.static.js',
        'https://gitcdn.link/cdn/anliting/simple.js/eae977ecf2a856ecb072259aa63b003d186ba618/src/simple/EventEmmiter.js',
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
    await link(`files/blog.js`,`files/blog.static.js`)
    await link(`files/controlPanel.js`,`files/controlPanel.static.js`)
    await link(`files/core.js`,`files/core.static.js`)
})()
