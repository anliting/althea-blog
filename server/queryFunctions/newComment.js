module.exports=async(db,args,env)=>{
    if(!(
        Number.isFinite(args.page)&&
        typeof args.content=='string'
    ))
        return
    await db.newComment(
        env.currentUser,
        args.page,
        args.content
    )
    return{}
}
