import Pagemodule from './Pagemodule.js'
import Pageversion from './Pageversion.js'
import Page from './Page.js'
import Comment from './Comment.js'
import {Site as RawSite}from '/lib/core.static.js'
function Site(){
    RawSite.call(this)
    this._pagemodules={}
    this._pageversions={}
}
Object.setPrototypeOf(Site.prototype,RawSite.prototype)
Site.prototype.getComment=async function(id){
    return new Comment({
        send:this.send.bind(this),
    },id)
}
Site.prototype.getPage=async function(id){
    return new Page({
        send:this.send.bind(this),
        getPageversion:this.getPageversion.bind(this),
    },id)
}
Site.prototype.getPagemodule=async function(id){
    return this._pagemodules[id]||(this._pagemodules[id]=
        new Pagemodule({
            send:this.send.bind(this),
            getDefinitionByPagemodule:()=>
                this.send({
                    function:'blog_getDefinitionByPagemodule',
                    id,
                })
        },id)
    )
}
Site.prototype.getPageversion=async function(id){
    return this._pageversions[id]||(this._pageversions[id]=
        new Pageversion({
            send:this.send.bind(this),
        },id)
    )
}
Site.prototype.path=Object.setPrototypeOf({
    blog:{
        page:p=>p,
        root:'.',
        tag:a=>`tags/${a.map(encodeURIComponent).join('/')}`,
    },
    editpage:p=>`${p}/edit`,
    newpage:'newpage',
},RawSite.prototype.path)
export default Site
