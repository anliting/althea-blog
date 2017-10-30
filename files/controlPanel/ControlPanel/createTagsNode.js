import{dom}from'/lib/core.static.js'
import TagsPage from './createTagsNode/TagsPage.js'
function createTagsNode(){
    let tagsPage=new TagsPage
    return dom.div(
        dom.div({className:'material menu'},
            dom.div(
                {
                    className:'out',
                    onclick:()=>{
                        this.out()
                    }
                },
                'Tags',
            )
        ),
        dom.div(
            {className:'material content'},
            tagsPage.mainDiv,
        ),
    )
}
export default createTagsNode
