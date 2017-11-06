import BlogPage from '../Blog/Page.js'
export default[
    {
        come(){
            this._nodes.div_textarea_content.style.display=''
        },
        leave(){
            this._nodes.div_textarea_content.style.display='none'
        },
    },{
        come(){
            this._nodes.div_htmleditor.innerHTML=
                this.textarea_content.value
            this.htmleditor=new HTMLEditor(
                this._nodes.div_htmleditor
            )
            this._nodes.div_htmleditor.style.display=''
        },leave(){
            this.textarea_content.value=
                this.htmleditor.html()
            this._nodes.div_htmleditor.style.display='none'
        },
    },{
        come(){
            let div_preview=this._nodes.div_preview
            div_preview.innerHTML=
                this.pagemodules[
                    this._nodes.select_id_pagemodule.value
                ].compile(
                    this.textarea_content.value
                )
            syntaxHighlighter.highlight_all(div_preview,()=>{
                syntaxHighlighter.border_all(div_preview)
            })
            BlogPage.star_all(div_preview)
            BlogPage.tableofcontents_all(div_preview)
            graphvisualize_all(div_preview)
            MathJax.Hub.Queue(['Typeset',MathJax.Hub])
            div_preview.style.display=''
        },leave(){
            this._nodes.div_preview.style.display='none'
        },
    },
]
