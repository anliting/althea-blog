import {AltheaObject}from '/lib/core.static.js'
function Pageversion(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Pageversion.prototype,AltheaObject.prototype)
Pageversion.prototype._loader='getPageversion'
export default Pageversion
