Promise.all([
    module.shareImport('prototype._getNext/update_to_content.js')
]).then(modules=>{
    let update_to_content=modules[0]
    async function _getNext(){
        this.getting=this.getting||0
        this.getting++
        let
            process={
                status:this._status,
                continue:1
            }
        this.once('statusChange',()=>
            process.continue=0
        )
        let data=await this._site.then(site=>
            site.send({
                function:       'getSuggestedPages',
                page:           process.status.pageId||0,
                pageversion:    process.status.pageversionId||0,
                tags_selected:  process.status.tagNames||[],
                pages_loaded:   this.pages_loaded,
            })
        )
        await this._loadPagemodules
        await update_to_content.call(this,process,data.slice(0,4))
        this.getting--
    }
    return _getNext
})
