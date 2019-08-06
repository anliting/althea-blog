async function insertPage(
    db,ispublic,id_user_author,pagemodule,title,content
){
    return(await db.query0(`
        insert into blog_page
        set ?
    `,{
        ispublic,
        id_user_author,
        preferredPagename:'',
        pagemodule,
        title,
        content,
    })).insertId
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
    let id=await insertPage(
        this,
        ispublic,
        id_user_author,
        id_pagemodule,
        title,
        content
    )
    await Promise.all([
        this.setPagenamesForPageById(pagenames,id),
        ...tags.map(e=>this.putTag(this,id,e)),
    ])
    return{id}
}
