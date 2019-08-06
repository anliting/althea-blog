export default async db=>{
    await db.transactionDo(async cn=>{
        await cn.query(`
            alter table blog_page
            add column pagemodule int not null
            after preferredPagename
        `)
        await cn.query(`
            alter table blog_page
            add column title tinytext not null
            after pagemodule
        `)
        await cn.query(`
            alter table blog_page
            add column content mediumtext not null
            after title
        `)
        await cn.query(`
            update blog_page set pagemodule=(
                select id_pagemodule from blog_pageversion
                where id=blog_page.id_lastversion
            )
        `)
        await cn.query(`
            update blog_page set title=(
                select title from blog_pageversion
                where id=blog_page.id_lastversion
            )
        `)
        await cn.query(`
            update blog_page set content=(
                select content from blog_pageversion
                where id=blog_page.id_lastversion
            )
        `)
        await cn.query(`
            drop table blog_pageversion
        `)
        await cn.query(`
            alter table blog_page drop column id_lastversion
        `)
    })
    return 5
}
