import moduleLoader from 'https://cdn.rawgit.com/anliting/module/533c10b65a8b71c14de16f5ed99e466ddf8a2bae/src/esm/moduleLoader.js'
import{dom}from'/lib/core.static.js'
import{Editpage,Site}from'/plugins/althea-blog/l/core.static.js'
let site=new Site
;(async()=>{
    let module=await moduleLoader()
    let editpageReady=Promise.all([
        module.scriptByPath('https://gitcdn.link/cdn/anliting/syntaxhighlighter/e84919de45c19a185a4caa411037e28d5695d16b/highlighter.js'),
        module.scriptByPath('https://gitcdn.link/cdn/anliting/graphvisualizer/9f7c4b53cf2d24e1362dc609b63816238ac2fa88/visualizer.js'),
        module.scriptByPath('https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js'),
        module.scriptByPath('https://gitcdn.link/cdn/mathjax/MathJax/d4ab1b35c96dd964eaa9e1ed2c86e39fffbdacf6/MathJax.js?config=TeX-AMS-MML_HTMLorMML'),
        module.scriptByPath('https://gitcdn.link/cdn/sytelus/CryptoJS/7fbfbbee0d005b31746bc5858c70c359e98308e5/rollups/aes.js'),
    ])
    window.environment=arg.editpageEnv
    site.on('userChange',()=>
        location='/'
    )
    dom.head(Editpage.style)
    await editpageReady
    new Editpage(site)
})()
