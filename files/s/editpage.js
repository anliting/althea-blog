import{dom}from'/lib/core.static.js'
import{Editpage,Site}from'/plugins/althea-blog/l/core.static.js'
let site=new Site
window.environment=arg.editpageEnv
site.on('userChange',()=>
    location='/'
)
dom.head(Editpage.style)
;(async()=>{
    let editpage=new Editpage(site)
    await editpage.load
    dom.body(editpage.ui)
})()
