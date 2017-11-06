import{
    EventEmmiter,
    ImageUploader,
    dom,
    moduleLoader,
}from'/lib/core.static.js'
import SetForm from         './Editpage/SetForm.js'
import initialize from      './Editpage/initialize.js'
import editors from         './Editpage/prototype.editors.js'
import setup_form from      './Editpage/prototype.setup_form.js'
import submit from          './Editpage/prototype.submit.js'
import style from           './Editpage/style.js'
import createNodes from     './Editpage/createNodes.js'
function Editpage(site){
    EventEmmiter.call(this)
    this._site=site
    this._datalistId=Math.random().toString(36).substring(2)
    createNodes.call(this)
    this.node=this._nodes.main
    this.load=(async()=>{
        let module=await moduleLoader()
        await Promise.all([
            module.scriptByPath('https://gitcdn.link/cdn/anliting/syntaxhighlighter/e84919de45c19a185a4caa411037e28d5695d16b/highlighter.js'),
            module.scriptByPath('https://gitcdn.link/cdn/anliting/graphvisualizer/9f7c4b53cf2d24e1362dc609b63816238ac2fa88/visualizer.js'),
            module.scriptByPath('https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js'),
            module.scriptByPath('https://gitcdn.link/cdn/mathjax/MathJax/d4ab1b35c96dd964eaa9e1ed2c86e39fffbdacf6/MathJax.js?config=TeX-AMS-MML_HTMLorMML'),
            module.scriptByPath('https://gitcdn.link/cdn/sytelus/CryptoJS/7fbfbbee0d005b31746bc5858c70c359e98308e5/rollups/aes.js'),
        ])
        this.pagemodules=[]
        this.setOfTags=new SetForm(
            this._nodes.span_tags,
            this._nodes.input_newtag,
        )
        this.setOfNames=new SetForm(
            this._nodes.span_names,
            this._nodes.input_newname,
        )
        this.currentEditor=0
        this.load=this._site.loadPlugins0('editpage',this)
        // start set up image uploader
        let imageUploader=new ImageUploader(this._site)
        let fileButton=dom.createFileButton('Image')
        fileButton.on('file',async a=>{
            fileButton.n.disabled=true
            let imageIds=await imageUploader.uploadImages(a)
            imageIds.map(id=>
                this.textarea_content.value+=
                    `<a href=img/${id}.jpg><img src=img/${
                        id
                    }c800x600.jpg style=width:100%></a>\n`
            )
            fileButton.n.disabled=false
        })
        this._nodes.table_content.appendChild(
            createUploadImageTr()
        )
        function createUploadImageTr(){
            return dom.tr(createUploadImageTd())
        }
        function createUploadImageTd(){
            return dom.td(fileButton.n)
        }
        // end set up image uploader
        initialize(this)
    })()
}
Object.setPrototypeOf(Editpage.prototype,EventEmmiter.prototype)
Object.defineProperty(Editpage.prototype,'currentUser',{get(){
    return this._site.currentUser
}})
Editpage.prototype.setup_form=setup_form
Editpage.prototype.submit=submit
Editpage.prototype.show_html=function(){
    this.changeEditor(0)
}
Editpage.prototype.show_htmleditor=function(){
    this.changeEditor(1)
}
Editpage.prototype.show_preview=function(){
    this.changeEditor(2)
}
Editpage.prototype.editors=editors
Editpage.prototype.changeEditor=function(id){
    this.editors[this.currentEditor].leave.bind(this)()
    this.currentEditor=id
    this.editors[this.currentEditor].come.bind(this)()
}
Editpage.style=style
export default Editpage
