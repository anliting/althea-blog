import{dom}from'/lib/core.static.js'
//import{Editpage,Site}from'/plugins/althea-blog/core.js'
import{Editpage,Site}from'/plugins/althea-blog/core.static.js'
let
    site=new Site,
    editpage=new Editpage(site)
window.environment=arg.editpageEnv
site.on('userChange',()=>
    location='/'
)
dom.head(dom.style(Editpage.style))
;(async()=>{
    await editpage.load
    dom.body(editpage.node)
})()
