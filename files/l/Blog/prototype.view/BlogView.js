;(async()=>{
    let[
        dom,
        install_datalist_tags_suggested,
        createHeader,
        keydown,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.shareImport('install_datalist_tags_suggested.js'),
        module.shareImport('createHeader.js'),
        module.shareImport('prototype.keydown.js'),
    ])
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
        let div=dom.div()
        div.className='footer'
        view.blog._site.then(async site=>{
            let res=await site.send('getBlogFooter')
            div.innerHTML=res
        })
        return div
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
            module.get('blog.css').then(s=>
                blog._style(document.createTextNode(s))
            )
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
            module.shareImport('initialize_tags_suggested.js'),
            module.shareImport('use_list_tags__count_suggested.js'),
            blog._site.then(site=>
                site.send({
                    function:'getSuggestedTags',
                    tags:blog.status.tagNames||[]
                })
            ),
        ])
        let
            initialize_tags_suggested=vals[0],
            use_list_tags__count_suggested=vals[1],
            res=vals[2]
        initialize_tags_suggested(view.tagsDiv)
        use_list_tags__count_suggested(
            view,
            res,
            view.tagsDiv
        )
        view.tagsDiv.style.display=''
    }
    return BlogView
})()
