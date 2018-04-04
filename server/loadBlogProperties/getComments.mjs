export default async function(){
    let rows=await this.query0(`
        select
            id
        from blog_comment
    `)
    return rows.map(r=>r.id)
}
