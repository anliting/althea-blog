import{dom,load}from        '/lib/core.static.js'
import{Site}from            '/plugins/blog/core.static.js'
import ControlPanel from    './controlPanel/ControlPanel.js'
let site=new Site
;(async()=>{
    await load.material()
    let controlPanel=new ControlPanel({
        getComment(doc){
            doc.function='blog_getComment'
            return site.send(doc)
        },
        getComments:()=>site.send('blog_getComments'),
        getData:()=>site.send('blog_getData'),
        getPage:site.getPage.bind(site),
        getTagsWithCount:()=>site.send('blog_getTagsWithCount'),
        getUser:site.getUser.bind(site),
        setData:data=>site.send({function:'blog_setData',data}),
    })
    dom.head(dom.style(
        `
            a:active,a:link,a:visited{
                color:blue;
            }
            body{
                margin:0;
                overflow-y:scroll;
                background-color:#eee;
            }
            body>.controlPanel{
                max-width:600px;
                margin:0 auto;
            }
        `,
        ControlPanel.style,
    ))
    dom.body(
        dom(controlPanel.node)
    )
})()
