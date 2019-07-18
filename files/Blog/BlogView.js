import createHeader from './BlogView/createHeader.js'
import keydown from './BlogView/prototype.keydown.js'
import install_datalist_tags_suggested from './BlogView/install_datalist_tags_suggested.js'
import use_list_tags__count_suggested from './BlogView/use_list_tags__count_suggested.js'
import initialize_tags_suggested from './BlogView/initialize_tags_suggested.js'
import style from './BlogView/style.js'
import {doe}from '/lib/core.static.js'
function createContents(blog){
    let div=doe.div({className:'contents'})
    blog.on('pageLoad',page=>{
        doe(div,page.view.domElement)
    })
    blog.on('_statusChange',()=>{
        div.innerHTML=''
    })
    return div
}
function createFooter(view){
    return doe.div({className:'footer'},async div=>{
        div.innerHTML=(await view.blog._site.send('blog_getData')).footer
    })
}
function BlogView(blog){
    this.blog=blog
    this.div=doe.div()
    this.div.className='blog'
    install_datalist_tags_suggested(this)
    {
        let s=doe.style()
        let u=()=>
            this.blog._styles.map(n=>
                doe(s,n)
            )
        u()
        this.blog.on('_style',u)
        this.style=s
        blog._style(document.createTextNode(style))
    }
    doe(this.div,
        createHeader(blog,this),
        createContents(blog),
        createFooter(this),
    )
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
            function:'blog_getSuggestedTags',
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
