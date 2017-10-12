import altheaCore from '/lib/core.static.js'
import SetForm from './Editpage/SetForm.js'
import initialize from './Editpage/initialize.js'
import editors from './Editpage/prototype.editors.js'
import setup_form from './Editpage/prototype.setup_form.js'
import submit from './Editpage/prototype.submit.js'
import style from './Editpage/style.js'
let{EventEmmiter,ImageUploader,dom}=altheaCore
let
    div_main,
    isMobile
function Editpage(site){
    EventEmmiter.call(this)
    this._site=site
    this.pagemodules=[]
    this.setOfTags=new SetForm(
        document.getElementById('span_tags'),
        document.getElementById('input_newtag')
    )
    this.setOfNames=new SetForm(
        document.getElementById('span_names'),
        document.getElementById('input_newname')
    )
    this.currentEditor=0
    this.load=this._site.then(site=>
        site.loadPlugins('editpage',s=>
            eval(`let module=anlitingModule;${s}`)
        )
    )
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
    document.getElementById('table_content').appendChild(
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
}
Object.setPrototypeOf(Editpage.prototype,EventEmmiter.prototype)
Object.defineProperty(Editpage.prototype,'currentUser',{get(){
    return this._site.then(site=>site.currentUser)
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
Editpage.style=dom.style(style)
export default Editpage
