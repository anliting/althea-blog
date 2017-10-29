import{dom}from'/lib/core.static.js'
import TagsPage from './controlPanel/TagsPage.js'
let tagsPage=new TagsPage
tagsPage.initialize()
dom.body(
    dom.div(
        n=>{dom(n.style,{width:'600px',margin:'0 auto'})},
        dom.h1('Blog Control Panel'),
        dom.h2('Tags'),
        tagsPage.mainDiv,
    )
)
