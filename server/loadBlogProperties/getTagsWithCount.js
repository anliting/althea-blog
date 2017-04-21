module.exports=function(){
    return this.query(`
        select
            tagname,
            count(*) as count
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
        group by tagname
    `).then(a=>a[0]).then(rows=>
        rows.map(row=>({
            tagname:row.tagname,
            count:row.count
        }))
    )
}
