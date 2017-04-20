module.exports=async(args,env)=>{
    let type=env.althea.lib.anliting.type
    if(!(
        typeof args.id=='number'&&
        type.isArray(type.isStringValue)(args.columns)
    ))
        return
    let rows=await env.althea.database.selectPagemoduleInfo(args.id)
    let res={}
    if(0<=args.columns.indexOf('priority'))
        res.priority=rows[0].priority
    if(0<=args.columns.indexOf('name'))
        res.name=rows[0].name
    return res
}
