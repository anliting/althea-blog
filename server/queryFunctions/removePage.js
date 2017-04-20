module.exports=(db,args,env)=>{
    let cu=env.currentUser
    if(!(
        Number.isFinite(args.page)&&
        cu.isadmin
    ))
        return
    return db.removePage(args.page)
}
