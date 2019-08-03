export default async db=>{
    await Promise.all([
        db.query(`
            delete from blog_page where isremoved
        `),
        db.query(`
            delete from blog_pageversion where isremoved
        `),
        db.query(`
            alter table blog_page drop column isremoved
        `),
        db.query(`
            alter table blog_pageversion drop column isremoved
        `),
    ])
    await db.query(`
        delete from blog_pageversion where id_page not in (
            select id from blog_page
        )
    `)
    await Promise.all([
        db.query(`
            delete from blog_comment where id_page not in (
                select id from blog_page
            )
        `),
        db.query(`
            delete from blog_pagename where id_page not in (
                select id from blog_page
            )
        `),
        db.query(`
            delete from blog_tag where id_pageversion not in (
                select id from blog_pageversion
            )
        `),
    ])
    return 3
}
