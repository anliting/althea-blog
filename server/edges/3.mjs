export default async db=>{
    await db.transactionDo(async cn=>{
        await cn.query(`
            delete from blog_tag where id_pageversion not in (
                select id_lastversion from blog_page
            )
        `)
        await cn.query(`
            alter table blog_tag add column pageId int not null after id
        `)
        await cn.query(`
            update blog_tag set pageId=(
                select id from blog_page
                where id_lastversion=id_pageversion
            )
        `)
        await cn.query(`
            alter table blog_tag drop column id_pageversion
        `)
    })
    return 4
}
