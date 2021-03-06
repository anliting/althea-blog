import{doe}from'/lib/core.static.js'
function newPageContentUi(
    getPagemodule,plugins,source,pagemoduleId
){
    if(pagemoduleId){
        let pagemodule=getPagemodule(pagemoduleId)
        source=pagemodule.compile(source)
    }
    let n=doe.div({innerHTML:source})
    plugins.map(f=>f(n))
    return n
}
export default{
    html:{
        come(){
            this._nodes.div_textarea_content.style.display=''
        },
        leave(){
            this._nodes.div_textarea_content.style.display='none'
        },
    },
    htmleditor:{
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
    },
    preview:{
        come(){
            this._nodes.div_preview.style.display=''
            this._nodes.div_preview.innerHTML=''
            doe(
                this._nodes.div_preview,
                newPageContentUi(
                    id=>this.pagemodules[id-1],
                    this._pagePlugins,
                    this.textarea_content.value,
                    parseInt(this._nodes.select_id_pagemodule.value,10),
                )
            )
        },leave(){
            this._nodes.div_preview.style.display='none'
        },
    },
}
