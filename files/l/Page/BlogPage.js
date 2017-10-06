;(async()=>{
    let[
        EventEmmiter,
        dom,
        setup,
        view,
        createPrivacyTable,
    ]=await Promise.all([
        module.repository.althea.EventEmmiter,
        module.repository.althea.dom,
        module.module('BlogPage/setup.js'),
        module.module('BlogPage/Page.prototype.view.js'),
        module.module('BlogPage/Page.prototype.createPrivacyTable.js'),
    ])
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
        let h1_title=dom.h1(a_h1_title())
        h1_title.style.textAlign='center'
        return h1_title
        function a_h1_title(){
            let a=dom.a(page.title)
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
        let div=dom.div()
        div.style.textAlign='center'
        div.style.display='none'
        div.style.fontSize='1.5em'
        ;(async()=>{
            let site=await this.blog._site
            let u=await site.getUser(this.authorId)
            await u.load('nickname')
            dom(div,u.nickname)
        })()
        return div
    }
    BlogPage.prototype.createDateDiv=function(){
        let
            div=dom.div(),
            date=new Date(this.datetime_lastmodified)
        div.style.textAlign='center'
        div.style.display='none'
        div.style.fontSize='1.5em'
        div.style.marginTop='0.67em'
        div.style.marginBottom='2em'
        div.textContent=
            `${1900+date.getYear()}-${1+date.getMonth()}-${date.getDate()}`
        return div
    }
    return BlogPage
})()
