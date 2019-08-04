export default async function(
    ispublic,
    id_user_author,
    id_pagemodule,
    title,
    content,
    pagenames,
    id_page
){
    let pageversion
    await Promise.all([
        this.setPagenamesForPageById(pagenames,id_page),
        (async()=>
            pageversion=await this.newPageversion(
                ispublic,
                id_page,
                id_user_author,
                id_pagemodule,
                title,
                content,
            )
        )(),
    ])
    await updatePage(this,pageversion.id,ispublic,id_page)
    return pageversion
}
function updatePage(db,id_lastversion,ispublic,id){
    return db.query(`
        update blog_page set ? where ?
    `,[
        {
            id_lastversion,
            ispublic,
        },{
            id,
        }
    ])
}
