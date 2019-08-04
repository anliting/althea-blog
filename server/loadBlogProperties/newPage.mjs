import setLastVersionOfPage from './newPage/setLastVersionOfPage.mjs'
function insertPage(db,ispublic,id_user_author){
    return db.query0(`
        insert into blog_page
        set ?
    `,{
        ispublic,
        id_user_author,
        id_lastversion:0,
        preferredPagename:'',
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
        )).id,id),
        this.setPagenamesForPageById(pagenames,id),
        ...tags.map(e=>this.putTag(this,id,e)),
    ])
    return{id}
}
