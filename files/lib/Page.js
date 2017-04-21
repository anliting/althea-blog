(async()=>{
    let[
        AltheaObject,
        dom,
        BlogPage,
    ]=await Promise.all([
        module.repository.althea.AltheaObject,
        module.repository.althea.dom,
        module.shareImport('Page/BlogPage.js'),
    ])
    function Page(){
        AltheaObject.apply(this,arguments)
    }
    Object.setPrototypeOf(Page.prototype,AltheaObject.prototype)
    Page.prototype._loader='getPage'
    Object.defineProperty(Page.prototype,'a',{get(){
        let a=dom('a')
        a.href=this.id
        this.lastversion.then(async pv=>{
            await pv.load('title')
            a.textContent=pv.title||'Untitled'
        })
        return a
    }})
    Object.defineProperty(Page.prototype,'lastversion',{async get(){
        await this.load('lastversionId')
        return this._site.getPageversion(this.lastversionId)
    }})
    Page.BlogPage=BlogPage
    return Page
})()
