let editpageReady=Promise.all([
    module.scriptByPath('https://gitcdn.link/cdn/anliting/syntaxhighlighter/e84919de45c19a185a4caa411037e28d5695d16b/highlighter.js'),
    module.scriptByPath('https://gitcdn.link/cdn/anliting/graphvisualizer/9f7c4b53cf2d24e1362dc609b63816238ac2fa88/visualizer.js'),
    module.scriptByPath('https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js'),
    module.scriptByPath('https://gitcdn.link/cdn/mathjax/MathJax/d4ab1b35c96dd964eaa9e1ed2c86e39fffbdacf6/MathJax.js?config=TeX-AMS-MML_HTMLorMML'),
    module.scriptByPath('https://gitcdn.link/cdn/sytelus/CryptoJS/7fbfbbee0d005b31746bc5858c70c359e98308e5/rollups/aes.js'),
])
;(async()=>{
    ;(await module.importByPath('lib/general.static.js',{mode:1}))(module)
    ;(await module.shareImport('../l/repository.js'))(module)
    let site=module.repository.blog.site
    environment=module.arguments.editpageEnv
    site.then(site=>
        site.on('userChange',()=>
            location='/'
        )
    )
    module.shareImport('../l/Editpage.js').then(async Editpage=>{
        document.head.appendChild(Editpage.style)
        await editpageReady
        new Editpage(site)
    })
    /*module.repository.althea.Navigationbar.then(Navigationbar=>{
        let navigationbar=new Navigationbar(site)
        document.body.appendChild(navigationbar.view)
    })*/
})()
