import Page from './Page.mjs'
export default async function(id){
    let[
        page,
        pagenames,
        tags,
    ]=await Promise.all([
        this.query0(`
            select *
            from blog_page
            where ?
        `,{id}).then(rows=>{
            if(rows.length===0)
                return
            return new Page(this,rows[0])
        }),
        this.query0(`
            select
                pagename
            from blog_pagename
            where ?
        `,{id_page:id}).then(rows=>
            rows.map(row=>
                row.pagename
            )
        ),
        this.query0(`
            select tagname
            from blog_tag
            where ?
        `,{pageId:id}).then(rows=>
            rows.map(row=>row.tagname)
        ),
    ])
    if(!page)
        return
    page.data.pagenames=pagenames
    page.comments=await page.getComments()
    page.data.tags=tags
    return page
}
