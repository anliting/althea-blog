import{dom}from'/lib/core.static.js'
function TreeUi(){
    this.array=[]
}
TreeUi.prototype._apply=function(e){
    dom(this._nodes.title,
        {innerHTML:'',},
        1<this.array.length&&[
            dom.a({
                className:`material-icons`,
                onclick:()=>this.out(),
            },'chevron_left'),
            ' ',
        ],
        e.title,
    )
    this.node.appendChild(e.node)
}
TreeUi.prototype.in=function(e){
    if(this.array.length)
        this.node.removeChild(this.array[this.array.length-1].node)
    this.array.push(e)
    this._apply(e)
}
TreeUi.prototype.out=function(){
    this.node.removeChild(this.array.pop().node)
    if(this.array.length)
        this._apply(this.array[this.array.length-1])
}
export default TreeUi