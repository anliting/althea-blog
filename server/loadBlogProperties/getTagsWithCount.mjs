export default function(){
    return this.query(`
        select
            tagname,
            count(*) as count
        from blog_tag
        where id_pageversion in (
            select id_lastversion from blog_page
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
