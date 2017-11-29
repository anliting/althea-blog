import{dom}from'/lib/core.static.js'
import TagsPage from './createTagsNode/TagsPage.js'
function createTagsNode(){
    let tagsPage=new TagsPage
    tagsPage.send=doc=>this.send(doc)
    tagsPage.start()
    return dom.div(
        {className:'shadow content'},
        tagsPage.mainDiv,
    )
}
export default createTagsNode
