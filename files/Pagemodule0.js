import {AltheaObject}from '/lib/core.static.js'
function Pagemodule0(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Pagemodule0.prototype,AltheaObject.prototype)
Pagemodule0.prototype._loader='getPagemoduleInfo'
Object.defineProperty(Pagemodule0.prototype,'definitions',{get(){
    return this._site.send({
        function:'getDefinitionByPagemodule',
        id:this.id,
    })
}})
export default Pagemodule0
