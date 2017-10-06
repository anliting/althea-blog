import AltheaObject from '/lib/AltheaObject.js'
import dom from '/lib/tools/dom.js'
import BlogPage from './Page/BlogPage.js'
function Page(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Page.prototype,AltheaObject.prototype)
Page.prototype._loader='getPage'
Object.defineProperty(Page.prototype,'a',{get(){
    let a=dom.a({href:this.id})
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
export default Page
