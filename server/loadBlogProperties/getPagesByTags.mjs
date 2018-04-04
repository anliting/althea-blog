import mysql from 'mysql2'
function getPagesByTags(cu,tags){
    return this.query(`
        select id
        from blog_page
        where
            !isremoved &&
            ${!cu.isadmin?'ispublic':'1'} &&
            id_lastversion in (
                select id
                from blog_pageversion
                where
                    !isremoved &&
                    ${!cu.isadmin?'ispublic':'1'} &&
                    id in (${taggedPageversions(tags)})
                /* for materialization */
                order by rand()
            )
    `).then(a=>a[0]).then(rows=>rows.map(row=>row.id))
}
function taggedPageversions(tags){
    return`
        select t0.id_pageversion
        from
            blog_tag as t0 ${tags.length==1?'':`
                join (${
                    tags.slice(1).map((s,i)=>
                        `blog_tag as t${i+1}`
                    ).join(',')
                }) on ${
                    tags.slice(1).map((s,i)=>
                        `t0.id_pageversion=t${
                            i+1
                        }.id_pageversion`
                    ).join('&&')
                }
            `}
        where ${
            tags.map((s,i)=>
                `t${i}.tagname=${mysql.escape(s)}`
            ).join('&&')
        }
    `
}
export default getPagesByTags
