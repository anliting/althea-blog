import checkSetupIndex from './createHeader/checkSetupIndex.js'
import createInput from './createHeader/createInput.js'
import setupSelectedTagsDiv from './createHeader/setupSelectedTagsDiv.js'
import createNavigationBar from './createHeader/createNavigationBar.js'
import {dom}from '/lib/core.static.js'
function createHeader(blog,view){
    let blog_getData=blog._site.send('blog_getData')
    return dom.div(
        {className:'header'},
        createTitle(),
        createTagline(),
        createNavigationBar(view),
        createSearchForTags(view),
        createTags(view),
        createIndex()
    )
    function createTitle(){
        return dom.div({className:'title'},async n=>
            createA((await blog_getData).bannerTitle)
        )
        function createA(bannerTitle){
            let a=dom.a({href:''})
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
        return dom.div({className:'tagline'},
            async n=>({innerHTML:(await blog_getData).tagline})
        )
    }
    function createSearchForTags(view){
        return dom.div(
            {className:'searchForTags'},
            createSelectedTagsDiv(),
            view.input=createInput(blog,view),
            view.datalist_input_searchForTag
        )
        function createSelectedTagsDiv(){
            return dom.div({className:'selectedTags'},n=>{
                setupSelectedTagsDiv(blog,n)
                blog.on('statusChange',()=>{
                    n.innerHTML=''
                    setupSelectedTagsDiv(blog,n)
                })
            })
        }
    }
    function createTags(view){
        return dom.div({className:'tags'},n=>{
            blog.on('statusChange',()=>{
                n.innerHTML=''
                if(document.activeElement==view.input)
                    view.setupSuggestedTags()
            })
            view.tagsDiv=n
        })
    }
    function createIndex(){
        return dom.div({className:'index'},n=>{
            checkSetupIndex(blog,n)
            blog.on('statusChange',()=>{
                n.innerHTML=''
                checkSetupIndex(blog,n)
            })
        })
    }
}
export default createHeader
