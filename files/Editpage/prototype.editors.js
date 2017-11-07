import{dom}from'/lib/core.static.js'
import blog from './blog0.js'
import corePlugins from '../corePlugins.js'
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
            dom(
                this._nodes.div_preview,
                blog.newPageContentUi(
                    id=>this.pagemodules[id-1],
                    corePlugins,
                    this.textarea_content.value,
                    parseInt(this._nodes.select_id_pagemodule.value,10),
                )
            )
        },leave(){
            this._nodes.div_preview.style.display='none'
        },
    },
}
