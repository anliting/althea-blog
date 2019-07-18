import {doe}from '/lib/core.static.js'
function createInput(blog,view){
    let input=doe.input()
    input.setAttribute('list',view.datalist_input_searchForTag.id)
    input.addEventListener('keydown',e=>{
        if(e.keyCode!=13)
            return
        e.preventDefault()
        e.stopPropagation()
        let tagToAdd=input.value
        input.value=''
        let tagsToSelect=blog.status.tagNames?
            blog.status.tagNames.slice()
        :
            []
        tagsToSelect.push(tagToAdd)
        if(e.shiftKey)
            open(blog._site.path.getHrefByTags(
                tagsToSelect
            ),'_blank').focus()
        else
            blog._setStatusEmit({tagNames:tagsToSelect})
    })
    input.addEventListener('focus',()=>{
        view.setupSuggestedTags()
    })
    /*input.addEventListener('blur',()=>{
        view.hideSuggestedTags()
    })*/
    return input
}
export default createInput
