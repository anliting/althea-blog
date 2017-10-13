import path from '../../path.js'
import altheaCore from '/lib/core.static.js'
let{dom}=altheaCore
function createInput(blog,view){
    let input=dom.input()
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
            open(path.getHrefByTags(
                tagsToSelect
            ),'_blank').focus()
        else
            blog.status={tagNames:tagsToSelect}
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
