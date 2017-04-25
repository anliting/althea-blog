module.exports=function(){
    return this.query0(`
        select id
        from blog_pagemodule
    `).then(rows=>
        rows.map(row=>
            row.id
        )
    )
}
