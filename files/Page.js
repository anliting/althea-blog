import BlogPage from            './Page/BlogPage.js'
import{doe,AltheaObject}from    '/lib/core.static.js'
function Page(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Page.prototype,AltheaObject.prototype)
Page.prototype._loader='blog_getPage'
Object.defineProperty(Page.prototype,'a',{get(){
    return doe.a({href:this.id},async a=>{
        let pv=await this.lastversion
        await pv.load('title')
        a.textContent=pv.title||'Untitled'
    })
}})
Page.BlogPage=BlogPage
export default Page
