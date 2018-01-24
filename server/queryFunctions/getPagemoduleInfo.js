module.exports=async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    if(!(
        opt instanceof Object&&
        typeof opt.id=='number'&&
        type.isArray(type.isStringValue)(opt.columns)
    ))
        return
    let rows=await db.selectPagemoduleInfo(opt.id)
    let res={}
    if(0<=opt.columns.indexOf('priority'))
        res.priority=rows[0].priority
    if(0<=opt.columns.indexOf('name'))
        res.name=rows[0].name
    return res
}
