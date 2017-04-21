(async()=>{
    let AltheaObject=await module.repository.althea.AltheaObject
    function Pageversion(){
        AltheaObject.apply(this,arguments)
    }
    Object.setPrototypeOf(Pageversion.prototype,AltheaObject.prototype)
    Pageversion.prototype._loader='getPageversion'
    return Pageversion
})()
