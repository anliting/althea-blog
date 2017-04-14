module.exports=(args,env)=>{
    if(!(
        Number.isFinite(args.id)&&
        env.currentUser.isadmin
    ))
        return
    return env.althea.database.deleteComment(args.id)
}
