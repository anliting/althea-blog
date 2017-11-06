import{
    EventEmmiter,ImageUploader,dom,moduleLoader
}from'/lib/core.static.js'
import SetForm from './Editpage/SetForm.js'
import initialize from './Editpage/initialize.js'
import editors from './Editpage/prototype.editors.js'
import setup_form from './Editpage/prototype.setup_form.js'
import submit from './Editpage/prototype.submit.js'
import style from './Editpage/style.js'
let
    div_main,
    isMobile
function Editpage(site){
    EventEmmiter.call(this)
    this._site=site
    this._nodes={}
    dom.body(
        this.ui=dom.div({id:'div_main'},
            this._nodes.table_content=dom.table(
                dom.tr(dom.td(
                    this._nodes.select_id_pagemodule=dom.select(),' ',
                    this._nodes.select_privacy=dom.select(
                        dom.option({value:0},'Hidden'),
                        dom.option({value:1},'Private'),
                        dom.option({value:2},'Unlisted'),
                        dom.option({value:3},'Public'),
                    ),' ',
                    this._nodes.button_save=dom.button('Save'),' ',
                    this._nodes.button_submit=dom.button('Submit'),' ',
                )),
                dom.tr({id:'tr_tags'},dom.td(
                    this._nodes.span_tags=dom.span(),
                    this._nodes.input_newtag=dom.input({
                        className:'setFormInput',
                        type:'text',
                        placeholder:'Tag ...',
                        disabled:true,
                    },n=>{
                        n.setAttribute('list','tags')
                    }),
                )),
                dom.tr({id:'tr_names'},dom.td(
                    this._nodes.span_names=dom.span(),
                    this._nodes.input_newname=dom.input({
                        className:'setFormInput',
                        type:'text',
                        placeholder:'Name ...',
                        disabled:true,
                    }),
                )),
                dom.tr(dom.td(
                    this._nodes.input_title=dom.input({
                        className:'title',
                        type:'text',
                        placeholder:'Title',
                        disabled:true,
                    }),
                )),
                dom.tr(dom.td(
                    dom.a({id:'showHtmlA',href:'javascript:'},'HTML'),' | ',
                    dom.a({id:'htmlEditorA',href:'javascript:'},'WYSIWYG (experimental)'),' | ',
                    dom.a({id:'previewA',href:'javascript:'},'Preview (experimental)'),
                )),
                dom.tr(dom.td({id:'td_content'},
                    dom.div({id:'div_textarea_content'},
                        dom.textarea({id:'textarea_content',disabled:true}),
                    ),
                    dom.div({id:'div_htmleditor'},n=>{n.style.display='none'}),
                    dom.div({id:'div_preview'},n=>{n.style.display='none'}),
                )),
            ),
            dom.datalist({id:'tags'}),
        ),
    )
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
Editpage.style=dom.style(style)
export default Editpage
