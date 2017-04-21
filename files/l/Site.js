(async()=>{
    let RawSite=await module.repository.althea.Site
    function Site(){
        RawSite.call(this)
    }
    Object.setPrototypeOf(Site.prototype,RawSite.prototype)
    Site.prototype.getComment=async function(id){
        return new(await module.repository.blog.Comment)(this,id)
    }
    Site.prototype.getPage=async function(id){
        return new(await module.repository.blog.Page)(this,id)
        // cache is disabled because of the comment feature
        return this._pages[id]||(this._pages[id]=
            new(await module.repository.blog.Page)(this,id)
        )
    }
    Site.prototype.getPagemodule=async function(id){
        return this._pagemodules[id]||(this._pagemodules[id]=
            new(await module.repository.blog.Pagemodule0)(this,id)
        )
    }
    Site.prototype.getPageversion=async function(id){
        return this._pageversions[id]||(this._pageversions[id]=
            new(await module.repository.blog.Pageversion)(this,id)
        )
    }
    return Site
})()
