import{
    ImageUploader,
    dom,
    load as coreLoad,
}from'/lib/core.static.js'
import SetForm from         './load/SetForm.js'
import initialize from      './load/initialize.js'
import corePlugins from     '../corePlugins.js'
function load(){
    this.load=(async()=>{
        await Promise.all([
            (async()=>{
                let module=await coreLoad.module()
                await module.scriptByPath('https://gitcdn.link/cdn/anliting/htmleditor/9f904627c0ab99c4527ceb3c54a61c5704e6ddec/htmleditor.js')
            })(),
            coreLoad.materialIcon(),
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
        this.currentEditor='html'
        this.load=this._site.applyPlugins('editpage',this)
        this._pagePlugins=[
            ...corePlugins,
            ...await this._site.loadPlugins('blog_page'),
        ]
        // start set up image uploader
        let imageUploader=new ImageUploader({
            send:this._site.send.bind(this._site),
            post:this._site.post.bind(this._site),
        })
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
