import{EventEmmiter}from 'https://gitcdn.link/cdn/anliting/simple.js/d76165db0cfc5b4c71786bf5a5f2e51503943294/src/simple.static.js'
import setup from './BlogPage/setup.js'
import view from './BlogPage/Page.prototype.view.js'
import createPrivacyTable from './BlogPage/Page.prototype.createPrivacyTable.js'
import {doe}from '/lib/core.static.js'
function BlogPage(blog,id,ispublic,title,id_pagemodule){
    EventEmmiter.call(this)
    this.blog=blog
    this.id=id
    this.ispublic=ispublic
    this.title=title
    this.id_pagemodule=id_pagemodule
    setup.call(this)
}
Object.setPrototypeOf(BlogPage.prototype,EventEmmiter.prototype)
Object.defineProperty(BlogPage.prototype,'view',view)
BlogPage.prototype.createPrivacyTable=createPrivacyTable
BlogPage.prototype.getHref=function(){
    return this.preferredPagename?
        this.preferredPagename
    :
        this.id
}
BlogPage.prototype.h1_title=function(){
    let page=this
    let h1_title=doe.h1(a_h1_title())
    h1_title.style.textAlign='center'
    return h1_title
    function a_h1_title(){
        let a=doe.a(page.title)
        a.className='title'
        a.href=page.getHref()
        a.onclick=e=>{
            if(
                e.which!==1||
                e.ctrlKey||
                e.shiftKey
            )
                return
            e.preventDefault()
            page.blog.status={pageId:page.id}
        }
        return a
    }
}
BlogPage.prototype.createAuthorDiv=function(){
    return doe.div(async n=>{
        n.style.textAlign='center'
        n.style.display='none'
        n.style.fontSize='1.5em'
        let u=await this.blog._site.getUser(this.authorId)
        await u.load('nickname')
        doe(n,u.nickname)
    })
}
BlogPage.prototype.createDateDiv=function(){
    let date=new Date(this.datetime_lastmodified)
    return doe.div(
        n=>{
            doe(n.style,{
                textAlign:'center',
                display:'none',
                fontSize:'1.5em',
                marginTop:'0.67em',
                marginBottom:'2em',
            })
        },
        `${1900+date.getYear()}-${1+date.getMonth()}-${
            date.getDate()
        }`
    )
}
export default BlogPage
