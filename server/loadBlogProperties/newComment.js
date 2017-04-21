module.exports=newComment
function newComment(cu,page,content){
    return this.transactionDo(async cn=>{
        await assertPageExists(cn,page)
        await insertComment(cn,cu.id,page,content)
    })
}
async function assertPageExists(cn,id){
    let res=await new Promise((rs,rj)=>{
        cn.query(`
            select count(*)
            from page
            where ?
            lock in share mode
        `,{id},(err,rows)=>err?rj(err):rs(rows[0]['count(*)']))
    })
    if(res==0){
        let e=Error()
        e.name='assertionFailed'
        throw e
    }
}
function insertComment(cn,id_user_owner,id_page,content){
    return new Promise((rs,rj)=>{
        cn.query(`
            insert into comment
            set ?
        `,{
            id_page,
            id_user_owner,
            content,
        },err=>err?rj(err):rs())
    })
}
