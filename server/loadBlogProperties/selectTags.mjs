import whereQuery_pages_permitted from
    './sql/whereQuery_pages_permitted.mjs'
import calcPageQueryByTags from
    './sql/calcPageQueryByTags.mjs'
function selectTags(cu,tags){
    return this.query0(`
        select
            tagname as name,
            count(*) as count
        from blog_tag
        where
            pageId in (
                select id from blog_page where
                    ${whereQuery_pages_permitted(cu)}
            )
            ${
                tags.length?
                    `&& pageId in (
                        ${calcPageQueryByTags(tags)}
                    )`
                :
                    ''
            }
        group by tagname
    `)
}
export default selectTags
