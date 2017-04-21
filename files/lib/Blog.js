let loadPagemodules=module.shareImport('Blog/loadPagemodules.js')
;(async modules=>{
    let[
        EventEmmiter,
        Page,
        _getNext,
        _anchor_addTag,
        view,
        path,
    ]=await Promise.all([
        module.repository.althea.EventEmmiter,
        module.shareImport('Blog/Page.js'),
        module.shareImport('Blog/prototype._getNext.js'),
        module.shareImport('Blog/prototype._anchor_addTag.js'),
        module.shareImport('Blog/prototype.view.js'),
        module.shareImport('Blog/path.js'),
    ])
    function Blog(site,status){
        EventEmmiter.call(this)
        this._site=site
        this._status=status
        this.pages={}
        this.pagemodules=[]
        this.pages_loaded=[]
        // refresh on userChange
        this._site.then(site=>{
            site.on('userChange',()=>{
                this.status=this.status
            })
        })
        // start add event listeners
        this.on('newListener',(event,listener)=>
            this.emit(event+'ListenerAdd',listener)
        )
        this.on('pageLoadListenerAdd',listener=>{
            for(let i in this.pages)
                listener(this.pages[i])
        })
        this.on('pageContentLoad',Page.star_all)
        this.on('pageContentLoad',Page.tableofcontents_all)
        // end add event listeners
        this.load=this._site.then(site=>
            site.loadPlugins('blog',s=>eval(s))
        )
        this._getNext()
        this._styles=[]
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
    Object.defineProperty(Blog.prototype,'status',{get(){
        return this._status
    },set(val){
        this._status=val
        this.pages={}
        this.pages_loaded=[]
        this.emit('statusChange')
        this._getNext()
    }})
    Object.defineProperty(Blog.prototype,'view',view)
    Blog.prototype.path=path
    return Blog
})()
