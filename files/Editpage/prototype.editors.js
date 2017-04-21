(async()=>{
    let BlogPage=await module.shareImport('../Blog/Page.js')
    return[
        {
            come:function(){
                document.getElementById(
                    'div_textarea_content'
                ).style.display=
                    'block'
            },
            leave:function(){
                document.getElementById(
                    'div_textarea_content'
                ).style.display=
                    'none'
            },
        },{
            come:function(){
                document.getElementById('div_htmleditor').innerHTML=
                    this.textarea_content.value
                this.htmleditor=new HTMLEditor(
                    document.getElementById('div_htmleditor')
                )
                document.getElementById('div_htmleditor').style.display=
                    'block'
            },leave:function(){
                this.textarea_content.value=
                    this.htmleditor.html()
                document.getElementById('div_htmleditor').style.display=
                    'none'
            },
        },{
            come:function(){
                let div_preview=document.getElementById('div_preview')
                div_preview.innerHTML=
                    this.pagemodules[1].compile(
                        this.textarea_content.value
                    )
                syntaxHighlighter.highlight_all(div_preview,()=>{
                    syntaxHighlighter.border_all(div_preview)
                })
                BlogPage.star_all(div_preview)
                BlogPage.tableofcontents_all(div_preview)
                graphvisualize_all(div_preview)
                MathJax.Hub.Queue(['Typeset',MathJax.Hub])
                document.getElementById('div_preview').style.display=
                    'block'
            },leave:function(){
                document.getElementById('div_preview').style.display=
                    'none'
            },
        },
    ]
})()
