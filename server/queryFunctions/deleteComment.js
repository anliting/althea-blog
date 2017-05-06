module.exports=async(db,args,env)=>{
    if(!(
        Number.isFinite(args.id)&&
        env.currentUser.isadmin
    ))
        return
    await db.deleteComment(args.id)
    return null
}
