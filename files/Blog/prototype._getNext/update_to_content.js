(async()=>{
    let
        Page=       await module.repository.althea.Page,
        BlogPage=   Page.BlogPage
    return update_to_content
    async function update_to_content(process,pages){
        let site=await this._site
        pages=await Promise.all(pages.map(async p=>{
            let page=await site.getPage(p)
            let res=await Promise.all([
                page.load([
                    'preferredPagename',
                    'page_derived_from',
                    'page_derived_to',
                    'author',
                    'timestamp_insert',
                    'timestamp_lastmodified',
                ]),
                page.lastversion.then(pageVersion=>pageVersion.load([
                    'public',
                    'title',
                    'content',
                ])),
            ]).then(vals=>({
                page:vals[0],
                pageVersion:vals[1],
            }))
            page=new BlogPage(
                this,
                res.page.id,
                res.pageVersion.public,
                res.pageVersion.title
            )
            this.pages[page.id]=page
            page.preferredPagename=    res.page.preferredPagename
            page.page_derived_from=    res.page.page_derived_from
            page.page_derived_to=      res.page.page_derived_to
            page.content=              res.pageVersion.content
            page.authorId=             res.page.author
            page.timestamp_insert=     res.page.timestamp_insert
            page.datetime_lastmodified=res.page.timestamp_lastmodified
            let pv=await res.pageVersion.load('tags')
            page.tags=pv.tags.sort((a,b)=>a.localeCompare(b))
            return page
        }))
        await site.load
        if(!process.continue)
            return
        pages.map(page=>{
            this.emit('pageLoad',page)
        })
        if(process.status.pageId){
            document.title=
                this.pages[process.status.pageId].title+
                ' - '+
                site.name
        }else{
            document.title=site.name
        }
    }
})()
