import AltheaObject from '/lib/AltheaObject.js'
function Pageversion(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Pageversion.prototype,AltheaObject.prototype)
Pageversion.prototype._loader='getPageversion'
export default Pageversion
