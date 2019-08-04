import Page from './Page.mjs'
export default async function(id){
    let[
        page,
        pagenames,
        tags,
    ]=await Promise.all([
        (async()=>{
            let rows=await this.query0(`
                select *
                from blog_page
                where ?
            `,{id})
            if(rows.length===0)
                return
            let p=new Page(this,rows[0])
            p.comments=await p.getComments()
            return p
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
    ])
    if(!page)
        return
    page.data.pagenames=pagenames
    page.data.tags=tags
    return page
}
