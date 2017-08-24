(async()=>{
    let dom=await module.repository.althea.dom
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
                module.shareImport('../path.js').then(path=>{
                    open(path.getHrefByTags(
                        tagsToSelect
                    ),'_blank').focus()
                })
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
    return createInput
})()
