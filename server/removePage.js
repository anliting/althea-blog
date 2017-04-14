module.exports=(args,env)=>{
    let cu=env.currentUser
    if(!(
        Number.isFinite(args.page)&&
        cu.isadmin
    ))
        return
    return env.althea.database.removePage(args.page)
}
