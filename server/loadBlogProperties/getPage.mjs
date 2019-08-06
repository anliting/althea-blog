async function getPage(id){
    let[
        page,
        pagenames,
        tags,
        comments,
    ]=await Promise.all([
        (async()=>{
            let rows=await this.query0(`
                select *
                from blog_page
                where ?
            `,{id})
            if(rows.length===0)
                return
            return rows[0]
        })(),
        (async()=>
            (await this.query0(`
                select
                    pagename
                from blog_pagename
                where ?
            `,{id_page:id})).map(row=>
                row.pagename
            )
        )(),
        (async()=>
            (await this.query0(`
                select tagname
                from blog_tag
                where ?
            `,{pageId:id})).map(row=>row.tagname)
        )(),
        (async()=>
            (await this.query0(`
                select id
                from blog_comment
                where ?
            `,{
                id_page:id,
            })).map(row=>row.id)
        )(),
    ])
    if(!page)
        throw getPage.badId
    page.pagenames=pagenames
    page.tags=tags
    page.comments=comments
    return page
}
getPage.badId=Symbol()
export default getPage
