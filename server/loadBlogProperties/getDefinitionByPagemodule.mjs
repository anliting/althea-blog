export default async function(id){
    return(await this.query0(`
        select
            level,
            name,
            content
        from blog_definition
        where ?
    `,{id_pagemodule:id})).map(row=>({
        level:      row.level,
        name:       row.name,
        content:    row.content,
    }))
}
