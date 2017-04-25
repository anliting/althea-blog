module.exports=function(){
    return this.query(`
        select
            tagname,
            count(*) as count
        from blog_tag
        where id_pageversion in (
            select blog_pageversion.id
            from
                    blog_page
                join
                    blog_pageversion
                on
                    blog_page.id_lastversion=blog_pageversion.id
            where
                !blog_pageversion.isremoved
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
