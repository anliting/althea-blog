function updatePage(db,ispublic,id,pagemodule,title,content){
    return db.query(`
        update blog_page set ? where ?
    `,[
        {
            ispublic,
            pagemodule,
            title,
            content,
        },{
            id,
        }
    ])
}
export default async function(
    ispublic,
    id_user_author,
    id_pagemodule,
    title,
    content,
    pagenames,
    id_page
){
    await Promise.all([
        this.setPagenamesForPageById(pagenames,id_page),
        updatePage(
            this,
            ispublic,
            id_page,
            id_pagemodule,
            title,
            content
        ),
    ])
}
