(async()=>{
    let[
        dom,
        checkSetupIndex,
        createInput,
        setupSelectedTagsDiv,
        createNavigationBar,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.shareImport('createHeader/checkSetupIndex.js'),
        module.shareImport('createHeader/createInput.js'),
        module.shareImport('createHeader/setupSelectedTagsDiv.js'),
        module.shareImport('createHeader/createNavigationBar.js'),
    ])
    function createHeader(blog,view){
        let div=dom('div',
            createTitle(),
            createTagline(),
            createNavigationBar(view),
            createSearchForTags(view),
            createTags(view),
            createIndex()
        )
        div.className='header'
        return div
        function createTitle(){
            let div=dom('div')
            div.className='title'
            ;(async()=>{
                let site=await blog._site
                await site.load
                div.appendChild(
                    createA(
                        site.clientUrlRoot,
                        site.bannerTitle
                    )
                )
            })()
            return div
            function createA(clientUrlRoot,bannerTitle){
                let a=dom('a')
                a.href=''
                a.onclick=e=>{
                    if(
                        e.which!=1||
                        e.ctrlKey||
                        e.shiftKey
                    )
                        return
                    e.preventDefault()
                    e.stopPropagation()
                    blog.status={}
                }
                a.textContent=bannerTitle
                return a
            }
        }
        function createTagline(){
            let div=dom('div')
            div.className='tagline'
            blog._site.then(s=>s.load).then(site=>{
                div.innerHTML=site.blogTagline
            })
            return div
        }
        function createSearchForTags(view){
            let div=dom('div',
                createSelectedTagsDiv(),
                view.input=createInput(blog,view),
                view.datalist_input_searchForTag
            )
            div.className='searchForTags'
            return div
            function createSelectedTagsDiv(){
                let div=dom('div')
                div.className='selectedTags'
                setupSelectedTagsDiv(blog,div)
                blog.on('statusChange',()=>{
                    div.innerHTML=''
                    setupSelectedTagsDiv(blog,div)
                })
                return div
            }
        }
        function createTags(view){
            let div=dom('div')
            div.className='tags'
            blog.on('statusChange',()=>{
                div.innerHTML=''
                if(document.activeElement==view.input)
                    view.setupSuggestedTags()
            })
            view.tagsDiv=div
            return div
        }
        function createIndex(){
            let div=dom('div')
            div.className='index'
            checkSetupIndex(blog,div)
            blog.on('statusChange',()=>{
                div.innerHTML=''
                checkSetupIndex(blog,div)
            })
            return div
        }
    }
    return createHeader
})()
