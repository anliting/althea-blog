export default function(id){
    return this.transactionDo(async cn=>{
        await Promise.all([
            cn.query(`
                delete from blog_comment where ?
            `,{id_page:id}),
            cn.query(`
                delete from blog_page where ?
            `,{id}),
            cn.query(`
                delete from blog_pagename where ?
            `,{id_page:id}),
            (async()=>{
                await cn.query(`
                    delete from blog_tag where id_pageversion in (
                        select id from blog_pageversion where ?
                    )
                `,{id_page:id})
                await cn.query(`
                    delete from blog_pageversion where ?
                `,{id_page:id})
            })(),
        ])
    })
}
