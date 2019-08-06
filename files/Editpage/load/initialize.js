import setup from       './initialize/setup.js'
import update from      './initialize/update.js'
import{browser}from     '/lib/core.static.js'
async function getData(editpage){
    let res={}
    if(editpage.id){
        let
            site=await editpage._site,
            page=await site.getPage(editpage.id)
        await page.load([
            'public',
            'preferredPagename',
            'timestamp_insert',
            'timestamp_lastmodified',
            'author',
            'pagenames',
            'tags',
            'content',
            'id_pagemodule',
            'title',
        ])
        res.page={
            id:                     page.id,
            id_user_author:         page.author,
            ispublic:               page.public,
            preferredPagename:      page.preferredPagename,
            timestamp_insert:       page.timestamp_insert,
            timestamp_lastmodified: page.timestamp_lastmodified,
            pagenames:              page.pagenames,
            tags:                   page.tags,
            content:                page.content,
            id_pagemodule:          page.id_pagemodule,
            title:                  page.title,
        }
    }
    return res
}
async function initialize(editpage){
    editpage.isMobile=browser.isMobile
    document.title=!editpage.id?'New Page':'Edit Page'
    setup(editpage,editpage.isMobile)
    let res=await Promise.all([
        getData(editpage),
        editpage._site.send('blog_getTags'),
        (async()=>{
            let res=await editpage._site.send('blog_getPagemodules')
            return Promise.all(res.map(async id=>{
                let pagemodule=await editpage._site.getPagemodule(id)
                return pagemodule.load([
                    'priority',
                    'name',
                ])
            }))
        })(),
    ])
    let data=res[0]
    data.tags=res[1]
    data.pagemodules=res[2]
    update(editpage,data)
}
export default initialize
