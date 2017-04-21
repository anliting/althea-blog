module.exports=function(pagenames,id_page){
    return this.query(`
        delete from pagename where ?
    `,{
        id_page,
    }).then(()=>
        Promise.all(pagenames.map(pagename=>
            this.query(`
                insert into pagename set ?
            `,{
                id_page,
                pagename,
            })
        ))
    )
}
