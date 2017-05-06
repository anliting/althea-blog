module.exports=async(db,args,env)=>{
    let cu=env.currentUser
    if(!(
        Number.isFinite(args.page)&&
        cu.isadmin
    ))
        return
    await db.removePage(args.page)
    return null
}
