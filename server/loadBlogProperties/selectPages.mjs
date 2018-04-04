import calcPageversionQueryByTags from './sql/calcPageversionQueryByTags'
import whereQuery_pageversions_permitted from
    './sql/whereQuery_pageversions_permitted'
import whereQuery_pages_permitted from './sql/whereQuery_pages_permitted'
function selectPages(currentUser,tags_selected,pages_loaded,pageId){
    return this.query0(`
        select
            id,
            timestamp_insert,
            timestamp_lastmodified,
            preferredPagename,
            id_lastversion,
            id_user_author
        from blog_page
        where
            ${whereQuery_pages_permitted(currentUser)}&&
            id in (
                select id_page
                from blog_pageversion
                where
                    ${whereQuery_pageversions_permitted(currentUser)}&&
                    id in (
                        select id_lastversion
                        from blog_page
                    ) ${
                        tags_selected.length?
                            `&& id in (
                                ${calcPageversionQueryByTags(
                                    tags_selected
                                )}
                            )`
                        :
                            ''
                    }
            )${
                pages_loaded.length?
                    '&& `id` not in ('+pages_loaded.join(',')+')'
                :
                    ''
            }${
                pageId?
                    '&& `id`='+this.pool.escape(pageId)+' '
                :
                    ''
            }
        order by timestamp_lastmodified desc
        limit 32
    `).then(rows=>rows.map(row=>row.id))
}
export default selectPages
