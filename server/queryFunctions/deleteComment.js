module.exports=(db,args,env)=>{
    if(!(
        Number.isFinite(args.id)&&
        env.currentUser.isadmin
    ))
        return
    return db.deleteComment(args.id)
}
