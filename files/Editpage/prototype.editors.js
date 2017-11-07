import page from '../page.js'
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
            let p=Object.create(page)
            p.getPagemodules=()=>this.pagemodules
            this._nodes.div_preview.innerHTML=p.compile(
                parseInt(this._nodes.select_id_pagemodule.value,10),
                this.textarea_content.value,
            )
            this._nodes.div_preview.style.display=''
        },leave(){
            this._nodes.div_preview.style.display='none'
        },
    },
}
