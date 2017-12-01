import{AltheaObject}from'/lib/core.static.js'
function Pagemodule0(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Pagemodule0.prototype,AltheaObject.prototype)
Pagemodule0.prototype._loader='blog_getPagemoduleInfo'
Object.defineProperty(Pagemodule0.prototype,'definitions',{get(){
    return this._io.getDefinitionByPagemodule(id)
}})
export default Pagemodule0
