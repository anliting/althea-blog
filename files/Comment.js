import {AltheaObject}from '/lib/core.static.js'
function Comment(){
    AltheaObject.apply(this,arguments)
}
Object.setPrototypeOf(Comment.prototype,AltheaObject.prototype)
Comment.prototype._loader='getComment'
export default Comment
