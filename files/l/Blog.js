import EventEmmiter from 'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js'
import loadPagemodules from './Blog/loadPagemodules.js'
import Page from './Blog/Page.js'
import _getNext from './Blog/prototype._getNext.js'
import _anchor_addTag from './Blog/prototype._anchor_addTag.js'
import BlogView from './Blog/BlogView.js'
import path from './Blog/path.js'
function Blog(site,status){
    EventEmmiter.call(this)
    this._site=Promise.resolve(site)
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
    this._pagePlugins=[
        Page.star_all,
        Page.tableofcontents_all,
    ]
    // end page plugin
    this.load=site.loadPlugins('blog',s=>
        eval(`let module=anlitingModule;${s}`)
    )
    this._getNext()
    this._styles=[]
    this.view=new BlogView(this)
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
Blog.prototype.addPageDiv=function(div){
    this._pageDivs.push(div)
    this._pagePlugins.forEach(p=>p(div))
}
Blog.prototype.addPagePlugin=function(p){
    this._pageDivs.forEach(p)
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
export default Blog
