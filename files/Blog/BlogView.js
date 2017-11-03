import createHeader from './BlogView/createHeader.js'
import keydown from './BlogView/prototype.keydown.js'
import install_datalist_tags_suggested from './BlogView/install_datalist_tags_suggested.js'
import use_list_tags__count_suggested from './BlogView/use_list_tags__count_suggested.js'
import initialize_tags_suggested from './BlogView/initialize_tags_suggested.js'
import style from './BlogView/style.js'
import {dom}from '/lib/core.static.js'
function createContents(blog){
    let div=dom.div({className:'contents'})
    blog.on('pageLoad',page=>{
        div.appendChild(page.view.domElement)
    })
    blog.on('statusChange',()=>{
        div.innerHTML=''
    })
    return div
}
function createFooter(view){
    return dom.div({className:'footer'},async div=>{
        div.innerHTML=(await view.blog._site.send('blog_getData')).footer
    })
}
function BlogView(blog){
    this.blog=blog
    this.div=dom.div()
    this.div.className='blog'
    install_datalist_tags_suggested(this)
    {
        let s=dom.style()
        let u=()=>
            this.blog._styles.map(n=>
                s.appendChild(n)
            )
        u()
        this.blog.on('_style',u)
        this.style=Promise.resolve(s)
        blog._style(document.createTextNode(style))
    }
    this.div.appendChild(createHeader(blog,this))
    this.div.appendChild(createContents(blog))
    this.div.appendChild(createFooter(this))
}
BlogView.prototype.hideSuggestedTags=function(){
    this.tagsDiv.style.display='none'
}
BlogView.prototype.keydown=keydown
BlogView.prototype.setupSuggestedTags=async function(){
    let
        view=this,
        blog=this.blog
    let vals=await Promise.all([
        blog._site.send({
            function:'getSuggestedTags',
            tags:blog.status.tagNames||[]
        }),
    ])
    let
        res=vals[0]
    initialize_tags_suggested(view.tagsDiv)
    use_list_tags__count_suggested(
        view,
        res,
        view.tagsDiv
    )
    view.tagsDiv.style.display=''
}
export default BlogView
