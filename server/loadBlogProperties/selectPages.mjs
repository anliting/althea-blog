import calcPageQueryByTags from
    './sql/calcPageQueryByTags.mjs'
import whereQuery_pages_permitted from
    './sql/whereQuery_pages_permitted.mjs'
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
                    id in (
                        select id_lastversion
                        from blog_page
                    )
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
            }${
                tags_selected.length?
                    `&& id in (
                        ${calcPageQueryByTags(
                            tags_selected
                        )}
                    )`
                :
                    ''
            }
        order by timestamp_lastmodified desc
        limit 32
    `).then(rows=>rows.map(row=>row.id))
}
export default selectPages
