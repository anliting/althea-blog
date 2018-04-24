export default async db=>{
    await Promise.all([
        db.query(`
            rename table comment to blog_comment
        `),
        db.query(`
            rename table definition to blog_definition
        `),
        db.query(`
            rename table page to blog_page
        `),
        db.query(`
            rename table pagemodule to blog_pagemodule
        `),
        db.query(`
            rename table pagename to blog_pagename
        `),
        db.query(`
            rename table pageversion to blog_pageversion
        `),
        db.query(`
            rename table tag to blog_tag
        `),
    ])
    return 2
}
