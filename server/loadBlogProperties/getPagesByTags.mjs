import mysql from 'mysql2'
function getPagesByTags(cu,tags){
    return this.query0(`
        select id
        from blog_page
        where
            ${!cu.isadmin?'ispublic':'1'} &&
            id in (${taggedPage(tags)})
    `).then(rows=>rows.map(row=>row.id))
}
function taggedPage(tags){
    return`
        select t0.pageId
        from
            blog_tag as t0 ${tags.length==1?'':`
                join (${
                    tags.slice(1).map((s,i)=>
                        `blog_tag as t${i+1}`
                    ).join(',')
                }) on ${
                    tags.slice(1).map((s,i)=>
                        `t0.pageId=t${
                            i+1
                        }.pageId`
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
