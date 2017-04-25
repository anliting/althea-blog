module.exports=function(
    ispublic,
    id_page,
    id_user_author,
    id_pagemodule,
    title,
    content,
    tags
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
        return Promise.all(
            tags.map(e=>insertTag(this,id,e))
        ).then(()=>({id}))
    })
}
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
function insertTag(db,id_pageversion,tagname){
    return db.query(`
        insert into blog_tag set ?
    `,{
        id_pageversion,
        tagname,
    })
}
