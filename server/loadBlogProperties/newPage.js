let
    setLastVersionOfPage=
        require('./newPage/setLastVersionOfPage')
module.exports=async function(
    ispublic,
    id_user_author,
    id_pagemodule,
    title,
    content,
    tags,
    pagenames
){
    let id=await insertPage(this,ispublic,id_user_author)
    await Promise.all([
        setLastVersionOfPage(this,(await this.newPageversion(
            ispublic,
            id,
            id_user_author,
            id_pagemodule,
            title,
            content,
            tags
        )).id,id),
        this.setPagenamesForPageById(pagenames,id),
    ])
    return{id}
}
function insertPage(db,ispublic,id_user_author){
    return db.query(`
        insert into page
        set ?
    `,{
        isremoved:0,
        ispublic,
        id_user_author,
    }).then(a=>a[0].insertId)
}