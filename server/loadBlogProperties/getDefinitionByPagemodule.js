module.exports=async function(id){
    let rows=await this.query0(`
        select
            level,
            name,
            content
        from blog_definition
        where ?
    `,{id_pagemodule:id})
    return rows.map(row=>({
        level:      row.level,
        name:       row.name,
        content:    row.content,
    }))
}
