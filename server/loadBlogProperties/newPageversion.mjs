function insertPageversion(
    db,
    ispublic,
    id_page,
    id_user_author,
    id_pagemodule,
    title,
    content
){
    return db.query(`
        insert into blog_pageversion set ?
    `,{
        ispublic,
        id_page,
        id_user_author,
        id_pagemodule,
        title,
        content,
    }).then(a=>a[0].insertId)
}
export default function(
    ispublic,
    id_page,
    id_user_author,
    id_pagemodule,
    title,
    content
){
    return insertPageversion(
        this,
        ispublic,
        id_page,
        id_user_author,
        id_pagemodule,
        title,
        content
    ).then(res=>{
        let id=res
        return{id}
    })
}
