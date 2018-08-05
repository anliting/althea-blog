import{doe}from '/lib/core.static.js'
function anchor_addTag(tag){
    let
        tagsToSelect=(this.status.tagNames||[]).slice()
    tagsToSelect.push(tag.name)
    let
        a=doe.a(tag.name,{
            className:'addTag',
            href:this.path.getHrefByTags(tagsToSelect),
        })
    a.onclick=e=>{
        if(
            e.which!=1||
            e.ctrlKey||
            e.shiftKey
        )
            return
        e.preventDefault()
        e.stopPropagation()
        this.status={
            tagNames:tagsToSelect.slice()
        }
    }
    return a
}
export default anchor_addTag
