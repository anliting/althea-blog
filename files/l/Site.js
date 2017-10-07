import RawSite from '/lib/Site.static.js'
import Pagemodule0 from './Pagemodule0.js'
import Pageversion from './Pageversion.js'
import Page from './Page.js'
import Comment from './Comment.js'
function Site(){
    RawSite.call(this)
    this._pagemodules={}
    this._pageversions={}
}
Object.setPrototypeOf(Site.prototype,RawSite.prototype)
Site.prototype.getComment=async function(id){
    return new Comment(this,id)
}
Site.prototype.getPage=async function(id){
    // cache is disabled because of the comment feature
    return new Page(this,id)
}
Site.prototype.getPagemodule=async function(id){
    return this._pagemodules[id]||(this._pagemodules[id]=
        new Pagemodule0(this,id)
    )
}
Site.prototype.getPageversion=async function(id){
    return this._pageversions[id]||(this._pageversions[id]=
        new Pageversion(this,id)
    )
}
export default Site
