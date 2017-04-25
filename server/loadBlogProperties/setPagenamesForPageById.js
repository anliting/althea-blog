module.exports=function(pagenames,id_page){
    return this.query(`
        delete from blog_pagename where ?
    `,{
        id_page,
    }).then(()=>
        Promise.all(pagenames.map(pagename=>
            this.query(`
                insert into blog_pagename set ?
            `,{
                id_page,
                pagename,
            })
        ))
    )
}
