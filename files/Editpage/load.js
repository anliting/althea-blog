import{
    ImageUploader,
    dom,
    moduleLoader,
}from'/lib/core.static.js'
import SetForm from         './load/SetForm.js'
import initialize from      './load/initialize.js'
import corePlugins from     '../corePlugins.js'
function load(){
    this.load=(async()=>{
        let module=await moduleLoader()
        await module.scriptByPath('https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js'),
        this.pagemodules=[]
        this.setOfTags=new SetForm(
            this._nodes.span_tags,
            this._nodes.input_newtag,
        )
        this.setOfNames=new SetForm(
            this._nodes.span_names,
            this._nodes.input_newname,
        )
        this.currentEditor='html'
        this.load=this._site.loadPlugins0('editpage',this)
        this._pagePlugins=corePlugins.slice()
        this._site.loadPlugins0('blog',{
            on(){},
            _style(){},
            addPagePlugin:p=>{
                this._pagePlugins.push(p)
            }
        })
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
export default load
