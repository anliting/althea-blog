function TreeUi(){
    this.array=[]
}
TreeUi.prototype.in=function(e){
    if(this.array.length)
        this.node.removeChild(this.array[this.array.length-1])
    this.array.push(e)
    this.node.appendChild(e)
}
TreeUi.prototype.out=function(){
    this.node.removeChild(this.array.pop())
    if(this.array.length)
        this.node.appendChild(this.array[this.array.length-1])
}
export default TreeUi
