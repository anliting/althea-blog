async function getData(editpage){
    let res={}
    if(editpage.id){
        let
            site=await editpage._site,
            page=await site.getPage(editpage.id),
            pageversion=await page.lastversion
        await Promise.all([
            page.load([
                'public',
                'lastversionId',
                'preferredPagename',
                'timestamp_insert',
                'timestamp_lastmodified',
                'author',
                'pagenames',
            ]),
            pageversion.load([
                'content',
                'id_page',
                'id_pagemodule',
                'id_user_author',
                'public',
                'isremoved',
                'tags',
                'timestamp_insert',
                'title',
            ]),
        ])
        res.page={
            id:page.id,
            id_user_author:page.author,
            ispublic:page.public,
            id_lastversion:page.lastversionId,
            isremoved:false,
            preferredPagename:page.preferredPagename,
            timestamp_insert:page.timestamp_insert,
            timestamp_lastmodified:page.timestamp_lastmodified,
            pagenames:page.pagenames,
        }
        res.lastversion_page={
            content:pageversion.content,
            id:pageversion.id,
            id_page:pageversion.id_page,
            id_pagemodule:pageversion.id_pagemodule,
            id_user_author:pageversion.id_user_author,
            ispublic:pageversion.public,
            isremoved:pageversion.isremoved,
            tags:pageversion.tags,
            timestamp_insert:pageversion.timestamp_insert,
            title:pageversion.title,
        }
    }
    return res
}
;(async()=>{
    let[
        setup,
        update,
        browser,
    ]=await Promise.all([
        module.shareImport('setup.js'),
        module.shareImport('update.js'),
        module.repository.althea.browser,
    ])
    async function initialize(editpage){
        editpage.isMobile=browser.isMobile
        editpage.id=environment.id_page||0
        document.title=!editpage.id?'New Page':'Edit Page'
        setup(editpage,editpage.isMobile)
        let res=await Promise.all([
            getData(editpage),
            editpage._site.then(site=>
                site.send('getTags')
            ),
            editpage._site.then(async site=>{
                let res=await site.send('getPagemodules0')
                return Promise.all(res.map(async id=>{
                    let pagemodule=await site.getPagemodule(id)
                    return pagemodule.load([
                        'priority',
                        'name',
                    ])
                }))
            }),
        ])
        let data=res[0]
        data.tags=res[1]
        data.pagemodules=res[2]
        update(editpage,data)
    }
    return initialize
})()