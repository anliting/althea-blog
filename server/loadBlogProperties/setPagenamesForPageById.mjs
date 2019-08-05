export default async function(pagenames,id_page){
    await this.query(`
        delete from blog_pagename where ?
    `,{
        id_page,
    })
    return Promise.all(pagenames.map(pagename=>
        this.query(`
            insert into blog_pagename set ?
        `,{
            id_page,
            pagename,
        })
    ))
}
