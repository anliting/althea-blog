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
        let res=await page.load([
            'preferredPagename',
            'author',
            'timestamp_insert',
            'timestamp_lastmodified',
            'tags',
            'public',
            'title',
            'content',
            'id_pagemodule',
        ])
        await this._loadPagemodules
        page=new BlogPage(
            this,
            res.id,
            res.public,
            res.title,
            res.id_pagemodule
        )
        this.pages[page.id]=page
        page.preferredPagename=     res.preferredPagename
        page.content=               res.content
        page.authorId=              res.author
        page.timestamp_insert=      res.timestamp_insert
        page.datetime_lastmodified= res.timestamp_lastmodified
        page.tags=                  res.tags.sort((a,b)=>a.localeCompare(b))
        return page
    }))
    let title=await this._title
    return[title,pages]
}
function getNext(){
    let interrupted
    return{
        interrupt(){
            interrupted=1
        },
        promise:(async()=>{
            let[title,pages]=await getData.call(this,this._status)
            if(interrupted)
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
    }
}
function getNextIfNotGetting(){
    if(this._getting)
        return
    this._getting=1
    let
        task=getNext.call(this),
        beforeStatusChange,
        onEnd
    onEnd=()=>{
        this.off('_beforeStatusChange',beforeStatusChange)
        this._getting=0
        onEnd=0
    }
    this.on('_beforeStatusChange',beforeStatusChange=()=>{
        task.interrupt()
        if(onEnd)
            onEnd()
    })
    ;(async()=>{
        await task.promise
        if(onEnd)
            onEnd()
    })()
}
export default getNextIfNotGetting
