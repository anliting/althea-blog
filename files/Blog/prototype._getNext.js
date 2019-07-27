import Page from'../Page.js'
let BlogPage=Page.BlogPage
async function getData(status){
    let data=await this._site.send({
        function:       'blog_getSuggestedPages',
        page:           status.pageId||0,
        pageversion:    status.pageversionId||0,
        tags_selected:  status.tagNames||[],
        pages_loaded:   this.pages_loaded,
    })
    let pages=data.slice(0,4)
    pages=await Promise.all(pages.map(async p=>{
        let page=await this._site.getPage(p)
        let res=await(async()=>{
            let vals=await Promise.all([
                page.load([
                    'preferredPagename',
                    'page_derived_from',
                    'page_derived_to',
                    'author',
                    'timestamp_insert',
                    'timestamp_lastmodified',
                ]),
                (async()=>
                    (await page.lastversion).load([
                        'public',
                        'title',
                        'content',
                        'id_pagemodule',
                    ])
                )(),
            ])
            return{
                page:vals[0],
                pageVersion:vals[1],
            }
        })()
        await this._loadPagemodules
        page=new BlogPage(
            this,
            res.page.id,
            res.pageVersion.public,
            res.pageVersion.title,
            res.pageVersion.id_pagemodule
        )
        this.pages[page.id]=page
        page.preferredPagename=     res.page.preferredPagename
        page.page_derived_from=     res.page.page_derived_from
        page.page_derived_to=       res.page.page_derived_to
        page.content=               res.pageVersion.content
        page.authorId=              res.page.author
        page.timestamp_insert=      res.page.timestamp_insert
        page.datetime_lastmodified= res.page.timestamp_lastmodified
        let pv=await res.pageVersion.load('tags')
        page.tags=pv.tags.sort((a,b)=>a.localeCompare(b))
        return page
    }))
    let title=await this._title
    return[title,pages]
}
function getNext(onEnd){
    let end,ended
    return{
        end(){
            end()
            ended=1
        },
        ended:Promise.race([
            new Promise(rs=>end=rs),
            (async()=>{
                let[title,pages]=await getData.call(this,this._status)
                if(ended)
                    return
                pages.map(page=>{
                    this.emit('pageLoad',page)
                })
                if(this._status.pageId){
                    document.title=
                        this.pages[this._status.pageId].title+
                        ' - '+
                        title
                }else{
                    document.title=title
                }
            })(),
        ])
    }
}
function _getNext(){
    if(this._getting)
        return
    this._getting=1
    let
        task=getNext.call(this),
        beforeStatusChange=()=>{
            task.end()
        }
    this.on('_beforeStatusChange',beforeStatusChange)
    ;(async()=>{
        await task.ended
        this.off('_beforeStatusChange',beforeStatusChange)
        this._getting=0
    })()
}
export default _getNext
