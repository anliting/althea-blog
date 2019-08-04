export default function(
    ispublic,
    id_user_author,
    id_pagemodule,
    title,
    content,
    pagenames,
    id_page
){
    let
        res
    return this.newPageversion(
        ispublic,
        id_page,
        id_user_author,
        id_pagemodule,
        title,
        content,
    ).then(pageversion=>{
        res=pageversion
        return updatePage(this,pageversion.id,ispublic,id_page)
    }).then(()=>{
        this.setPagenamesForPageById(pagenames,id_page)
    }).then(()=>res)
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
