module.repository.althea.AltheaObject.then(AltheaObject=>{
    function Comment(){
        AltheaObject.apply(this,arguments)
    }
    Object.setPrototypeOf(Comment.prototype,AltheaObject.prototype)
    Comment.prototype._loader='getComment'
    return Comment
})
