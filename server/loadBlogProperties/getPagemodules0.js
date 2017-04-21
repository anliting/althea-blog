module.exports=function(){
    return this.query(`
        select id
        from pagemodule
    `).then(a=>a[0]).then(rows=>
        rows.map(row=>
            row.id
        )
    )
}
