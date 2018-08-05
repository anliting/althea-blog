import checkSetupIndex from './createHeader/checkSetupIndex.js'
import createInput from './createHeader/createInput.js'
import setupSelectedTagsDiv from './createHeader/setupSelectedTagsDiv.js'
import createNavigationBar from './createHeader/createNavigationBar.js'
import {doe}from '/lib/core.static.js'
function createHeader(blog,view){
    let blog_getData=blog._site.send('blog_getData')
    return doe.div(
        {className:'header'},
        createTitle(),
        createTagline(),
        createNavigationBar(view),
        createSearchForTags(view),
        createTags(view),
        createIndex()
    )
    function createTitle(){
        return doe.div({className:'title'},async n=>
            createA((await blog_getData).bannerTitle)
        )
        function createA(bannerTitle){
            return doe.a({href:'',innerHTML:bannerTitle,onclick(e){
                if(
                    e.which!=1||
                    e.ctrlKey||
                    e.shiftKey
                )
                    return
                e.preventDefault()
                e.stopPropagation()
                blog.status={}
            }})
        }
    }
    function createTagline(){
        return doe.div({className:'tagline'},
            async n=>({innerHTML:(await blog_getData).tagline})
        )
    }
    function createSearchForTags(view){
        return doe.div(
            {className:'searchForTags'},
            createSelectedTagsDiv(),
            view.input=createInput(blog,view),
            view.datalist_input_searchForTag
        )
        function createSelectedTagsDiv(){
            return doe.div({className:'selectedTags'},n=>{
                setupSelectedTagsDiv(blog,n)
                blog.on('statusChange',()=>{
                    n.innerHTML=''
                    setupSelectedTagsDiv(blog,n)
                })
            })
        }
    }
    function createTags(view){
        return doe.div({className:'tags'},n=>{
            blog.on('statusChange',()=>{
                n.innerHTML=''
                if(document.activeElement==view.input)
                    view.setupSuggestedTags()
            })
            view.tagsDiv=n
        })
    }
    function createIndex(){
        return doe.div({className:'index'},n=>{
            checkSetupIndex(blog,n)
            blog.on('statusChange',()=>{
                n.innerHTML=''
                checkSetupIndex(blog,n)
            })
        })
    }
}
export default createHeader
