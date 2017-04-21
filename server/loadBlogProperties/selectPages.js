let
    calcPageversionQueryByTags=
        require('./sql/calcPageversionQueryByTags'),
    whereQuery_pageversions_permitted=
        require('./sql/whereQuery_pageversions_permitted'),
    whereQuery_pages_permitted=
        require('./sql/whereQuery_pages_permitted')
module.exports=selectPages
function selectPages(currentUser,tags_selected,pages_loaded,pageId){
    return this.query0(`
        select
            id,
            timestamp_insert,
            timestamp_lastmodified,
            preferredPagename,
            id_lastversion,
            id_user_author
        from page
        where
            ${whereQuery_pages_permitted(currentUser)}&&
            id in (
                select id_page
                from pageversion
                where
                    ${whereQuery_pageversions_permitted(currentUser)}&&
                    id in (
                        select id_lastversion
                        from page
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
