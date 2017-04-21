let
    whereQuery_pageversions_permitted=
        require('./sql/whereQuery_pageversions_permitted'),
    whereQuery_pages_permitted=
        require('./sql/whereQuery_pages_permitted'),
    calcPageversionQueryByTags=
        require('./sql/calcPageversionQueryByTags')
module.exports=selectTags
function selectTags(cu,tags){
    return this.query(`
        select
            tagname as name,
            count(*) as count
        from tag
        where
            id_pageversion in (
                select max(id)
                from pageversion
                where
                    ${whereQuery_pageversions_permitted(cu)}&&(
                        id_page in (
                            select id from page where
                                ${whereQuery_pages_permitted(cu)}
                        )
                    ) ${
                        tags.length?
                            `&& id in (
                                ${calcPageversionQueryByTags(tags)}
                            )`
                        :
                            ''
                    }
                group by id_page
            )
        group by tagname
    `).then(a=>a[0])
}
