module.exports=(db,args,env)=>{
    let cu=env.currentUser
    if(!(
        typeof args.id=='number'&&
        Number.isFinite(args.id)&&
        cu.isadmin
    ))
        return
    return db.getDefinitionByPagemodule(args.id)
}
