import{
    EventEmmiter,
}from'/lib/core.static.js'
import editors from         './Editpage/prototype.editors.js'
import setup_form from      './Editpage/prototype.setup_form.js'
import submit from          './Editpage/prototype.submit.js'
import style from           './Editpage/style.js'
import createNodes from     './Editpage/createNodes.js'
import load from            './Editpage/load.js'
function Editpage(site,environment){
    EventEmmiter.call(this)
    this.id=environment.id_page||0
    this._site=site
    this._datalistId=Math.random().toString(36).substring(2)
    createNodes.call(this)
    this.node=this._nodes.main
    load.call(this)
}
Object.setPrototypeOf(Editpage.prototype,EventEmmiter.prototype)
Object.defineProperty(Editpage.prototype,'currentUser',{get(){
    return this._site.currentUser
}})
Editpage.prototype.setup_form=setup_form
Editpage.prototype.submit=submit
Editpage.prototype.show_html=function(){
    this.changeEditor(0)
}
Editpage.prototype.show_htmleditor=function(){
    this.changeEditor(1)
}
Editpage.prototype.show_preview=function(){
    this.changeEditor(2)
}
Editpage.prototype.editors=editors
Editpage.prototype.changeEditor=function(id){
    this.editors[this.currentEditor].leave.call(this)
    this.currentEditor=id
    this.editors[this.currentEditor].come.call(this)
}
Editpage.style=style
export default Editpage
