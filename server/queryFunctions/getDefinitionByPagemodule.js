module.exports=(db,args,env)=>{
    if(!(
        typeof args.id=='number'&&
        Number.isFinite(args.id)
    ))
        return
    return db.getDefinitionByPagemodule(args.id)
}
