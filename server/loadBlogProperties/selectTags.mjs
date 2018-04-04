import whereQuery_pageversions_permitted from
    './sql/whereQuery_pageversions_permitted'
import whereQuery_pages_permitted from './sql/whereQuery_pages_permitted'
import calcPageversionQueryByTags from './sql/calcPageversionQueryByTags'
function selectTags(cu,tags){
    return this.query0(`
        select
            tagname as name,
            count(*) as count
        from blog_tag
        where
            id_pageversion in (
                select max(id)
                from blog_pageversion
                where
                    ${whereQuery_pageversions_permitted(cu)}&&(
                        id_page in (
                            select id from blog_page where
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
    `)
}
export default selectTags
