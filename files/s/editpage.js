import moduleLoader from 'https://cdn.rawgit.com/anliting/module/533c10b65a8b71c14de16f5ed99e466ddf8a2bae/src/esm/moduleLoader.js'
import{dom}from'/lib/core.static.js'
import{Editpage,Site}from'/plugins/althea-blog/l/core.static.js'
let site=new Site
document.body.innerHTML=``
dom.body(
    dom.div({id:'div_main'},
        dom.table({id:'table_content'},
            dom.tr(dom.td(
                dom.select({id:'select_id_pagemodule'},
                ),' ',
                dom.select({id:'select_privacy'},
                    dom.option({value:0},'Hidden'),
                    dom.option({value:1},'Private'),
                    dom.option({value:2},'Unlisted'),
                    dom.option({value:3},'Public'),
                ),' ',
                dom.button({id:'button_save'},'Save'),' ',
                dom.button({id:'button_submit'},'Submit'),' ',
                dom.span({id:'span_graphvisualizer'},
                    ' | ',
                    dom.a({href:'plugins/graphvisualizer/visualizer.html'},
                        'Graph Visualizer'
                    )
                ),
            )),
            dom.tr({id:'tr_tags'},dom.td(
                dom.span({id:'span_tags'}),
                dom.input({
                    id:'input_newtag',
                    type:'text',
                    placeholder:'Tag ...',
                    disabled:true,
                },n=>{
                    n.setAttribute('list','tags')
                }),
            )),
            dom.tr({id:'tr_names'},dom.td(
                dom.span({id:'span_names'}),
                dom.input({
                    id:'input_newname',
                    type:'text',
                    placeholder:'Name ...',
                    disabled:true,
                }),
            )),
            dom.tr(dom.td(
                dom.input({
                    id:'input_title',
                    type:'text',
                    placeholder:'Title',
                    disabled:true,
                }),
            )),
            dom.tr(dom.td(
                dom.a({id:'showHtmlA',href:'javascript:'},'HTML'),' | ',
                dom.a({id:'htmlEditorA',href:'javascript:'},'WYSIWYG (experimental)'),' | ',
                dom.a({id:'previewA',href:'javascript:'},'review (experimental)'),
            )),
            dom.tr(dom.td({id:'td_content'},
                dom.div({id:'div_textarea_content'},
                    dom.textarea({id:'textarea_content',disabled:true}),
                ),
                dom.div({id:'div_htmleditor'},n=>{n.style.display='none'}),
                dom.div({id:'div_preview'},n=>{n.style.display='none'}),
            )),
        )
    ),
    dom.datalist({id:'tags'}),
)
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
