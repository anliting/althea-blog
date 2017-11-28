import{EventEmmiter}from 'https://gitcdn.link/cdn/anliting/simple.js/3b5e122ded93bb9a5a7d5099ac645f1e1614a89b/src/simple.static.js'
import loadPagemodules from './Blog/loadPagemodules.js'
import corePlugins from     './corePlugins.js'
import _getNext from        './Blog/prototype._getNext.js'
import _anchor_addTag from  './Blog/prototype._anchor_addTag.js'
import BlogView from        './Blog/BlogView.js'
import path from            './Blog/path.js'
import{dom,load}from             '/lib/core.static.js'
function Blog(site,status){
    EventEmmiter.call(this)
    this._site=site
    this._status=status
    this.pages={}
    this.pagemodules=[]
    this.pages_loaded=[]
    // refresh on userChange
    site.on('userChange',()=>{
        this.status=this.status
    })
    // start page plugin
    this._pageDivs=[]
    this._pagePlugins=corePlugins.slice()
    // end page plugin
    this._getNext()
    this._styles=[]
    this.view=new BlogView(this)
    this.load=Promise.all([
        site.applyPlugins('blog',this),
        (async()=>{
            ;(await site.loadPlugins('blog_page')).forEach(p=>
                this.addPagePlugin(p)
            )
        })(),
		load.materialIcon(),
    ])
}
Object.setPrototypeOf(Blog.prototype,EventEmmiter.prototype)
Blog.prototype._anchor_addTag=_anchor_addTag
Object.defineProperty(Blog.prototype,'_currentUser',{async get(){
    return(await this._site).currentUser
}})
Blog.prototype._getNext=_getNext
Object.defineProperty(Blog.prototype,'_loadPagemodules',{async get(){
    return this._loadPagemodules_||(this._loadPagemodules_=
        (await loadPagemodules)(this)
    )
}})
Blog.prototype._style=function(n){
    this._styles.push(n)
    this.emit('_style')
}
Blog.prototype.addPageDiv=async function(div){
    this._pageDivs.push(div)
    await Promise.all(this._pagePlugins.map(p=>p(div)))
}
Blog.prototype.addPagePlugin=async function(p){
    await Promise.all(this._pageDivs.map(p))
    this._pagePlugins.push(p)
}
Object.defineProperty(Blog.prototype,'status',{get(){
    return this._status
},set(val){
    this._status=val
    this.pages={}
    this.pages_loaded=[]
    this.emit('statusChange')
    this._getNext()
}})
Blog.prototype.path=path
Blog.newPageContentUi=function(
    getPagemodule,plugins,source,pagemoduleId
){
    if(pagemoduleId){
        let pagemodule=getPagemodule(pagemoduleId)
        source=pagemodule.compile(source)
    }
    let n=dom.div({innerHTML:source})
    plugins.map(f=>f(n))
    return n
}
export default Blog
