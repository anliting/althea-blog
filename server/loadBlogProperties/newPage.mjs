import setLastVersionOfPage from './newPage/setLastVersionOfPage'
function insertPage(db,ispublic,id_user_author){
    return db.query0(`
        insert into blog_page
        set ?
    `,{
        isremoved:0,
        ispublic,
        id_user_author,
    }).then(a=>a.insertId)
}
export default async function(
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
