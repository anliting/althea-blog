async function insertPageversion(
    db,
    ispublic,
    id_page,
    id_user_author,
    id_pagemodule,
    title,
    content
){
    return(await db.query0(`
        insert into blog_pageversion set ?
    `,{
        ispublic,
        id_page,
        id_user_author,
        id_pagemodule,
        title,
        content,
    })).insertId
}
export default async function(
    ispublic,
    id_page,
    id_user_author,
    id_pagemodule,
    title,
    content
){
    return{id:await insertPageversion(
        this,
        ispublic,
        id_page,
        id_user_author,
        id_pagemodule,
        title,
        content
    )}
}
