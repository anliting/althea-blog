module.exports=function(){
    return this.query(`
        select distinct(tagname)
        from tag
        where id_pageversion in (
            select pageversion.id
            from
                    page
                join
                    pageversion
                on
                    page.id_lastversion=pageversion.id
            where
                !pageversion.isremoved
            /* for materialization */
            order by rand()
        )
    `).then(a=>a[0]).then(rows=>
        rows.map(row=>row.tagname)
    )
}
