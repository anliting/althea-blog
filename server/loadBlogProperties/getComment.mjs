import Comment from './Comment.mjs'
export default async function(id){
    let row=(await this.query0(`
        select
            timestamp_insert,
            id_page,
            id_user_owner,
            content
        from blog_comment
        where ?
    `,{id}))[0]
    if(row==undefined)
        throw RangeError()
    return new Comment(
        id,
        row.timestamp_insert,
        row.id_page,
        row.id_user_owner,
        row.content
    )
}
