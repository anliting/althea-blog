module.exports=(args,env)=>{
    let cu=env.currentUser
    if(!(
        typeof args.id=='number'&&
        Number.isFinite(args.id)&&
        cu.isadmin
    ))
        return
    return env.althea.database.getDefinitionByPagemodule(args.id)
}
