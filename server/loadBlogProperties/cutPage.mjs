export default function(id){
    return this.transactionDo(cn=>Promise.all([
        cn.query(`
            delete from blog_comment where ?
        `,{id_page:id}),
        cn.query(`
            delete from blog_page where ?
        `,{id}),
        cn.query(`
            delete from blog_pagename where ?
        `,{id_page:id}),
        cn.query(`
            delete from blog_pageversion where ?
        `,{id_page:id}),
        cn.query(`
            delete from blog_tag where ?
        `,{pageId:id}),
    ]))
}
