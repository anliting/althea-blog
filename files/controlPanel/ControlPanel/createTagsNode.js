import{doe}from'/lib/core.static.js'
import TagsPage from './createTagsNode/TagsPage.js'
function createTagsNode(){
    let tagsPage=new TagsPage({
        getTagsWithCount:this._io.getTagsWithCount,
    })
    return doe.div(
        {className:'shadow content'},
        tagsPage.mainDiv,
    )
}
export default createTagsNode
