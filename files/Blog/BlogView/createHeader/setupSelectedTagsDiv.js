import {doe}from '/lib/core.static.js'
function setupSelectedTagsDiv(blog,div){
    if(!('tagNames' in blog.status))
        return
    blog.status.tagNames.map((t,i)=>{
        doe(div,span())
        function span(){
            let span=doe.span(
                t+' ',
                a(),{
                    id:'span_tag_'+t,
                    className:'tag_selected',
                }
            )
            span.style.marginRight='4px'
            return span
        }
        function a(){
            let anchor=doe.a('-')
            let tagsToSelect=(blog.status.tagNames||[]).slice()
            tagsToSelect.splice(i,1)
            anchor.href='javascript:'
            anchor.addEventListener('click',e=>{
                e.preventDefault()
                e.stopPropagation()
                blog._setStatusEmit(tagsToSelect.length==0?{}:{
                    tagNames:tagsToSelect
                })
            })
            return anchor
        }
    })
}
export default setupSelectedTagsDiv
