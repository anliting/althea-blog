import update_to_content from './prototype._getNext/update_to_content.js'
async function _getNext(){
    this._getting=this._getting||0
    this._getting++
    let
        process={
            status:this._status,
            continue:1
        }
    this.once('_statusChange',()=>
        process.continue=0
    )
    let data=await this._site.send({
        function:       'blog_getSuggestedPages',
        page:           process.status.pageId||0,
        pageversion:    process.status.pageversionId||0,
        tags_selected:  process.status.tagNames||[],
        pages_loaded:   this.pages_loaded,
    })
    await update_to_content.call(this,process,data.slice(0,4))
    this._getting--
}
export default _getNext
