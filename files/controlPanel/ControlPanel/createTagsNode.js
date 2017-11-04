import{dom}from'/lib/core.static.js'
import TagsPage from './createTagsNode/TagsPage.js'
function createTagsNode(){
    let tagsPage=new TagsPage
    return dom.div(
        dom.div(
            {className:'shadow content'},
            tagsPage.mainDiv,
        ),
    )
}
export default createTagsNode
