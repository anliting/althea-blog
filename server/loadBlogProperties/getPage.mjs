import Page from './Page.mjs'
export default async function(id){
    let[
        page,
        pagenames,
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
        )
    ])
    if(!page)
        return
    page.data.pagenames=pagenames
    page.comments=await page.getComments()
    return page
}
