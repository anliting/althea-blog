function newComment(cu,page,content){
    return this.transactionDo(async cn=>{
        await assertPageExists(cn,page)
        await insertComment(cn,cu.id,page,content)
    })
}
async function assertPageExists(cn,id){
    let res=(await cn.query(`
        select count(*)
        from blog_page
        where ?
        lock in share mode
    `,{id}))[0][0]['count(*)']
    if(res==0){
        let e=Error()
        e.name='assertionFailed'
        throw e
    }
}
function insertComment(cn,id_user_owner,id_page,content){
    return cn.query(`
        insert into blog_comment
        set ?
    `,{
        id_page,
        id_user_owner,
        content,
    })
}
export default newComment
