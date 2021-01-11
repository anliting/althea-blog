import{rollup}from 'rollup'
let
    skip=[
        '/lib/core.static.js',
        '/plugins/blog/core.static.js',
        'https://gitcdn.link/cdn/anliting/simple.js/09b9cd311f438c07fd1ac0ead044aed97158faf3/src/simple.static.js',
    ]
async function link(input,file){
    let bundle=await rollup({
        input,
        external:s=>skip.includes(s),
    })
    await bundle.write({
        file,
        format:'es',
        paths:s=>skip.includes(s)&&s,
    })
}
link(`files/blog.js`,`files/blog.static.js`)
link(`files/controlPanel.js`,`files/controlPanel.static.js`)
link(`files/core.js`,`files/core.static.js`)
