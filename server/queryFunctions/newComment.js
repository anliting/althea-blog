module.exports=async(args,env)=>{
    if(!(
        Number.isFinite(args.page)&&
        typeof args.content=='string'
    ))
        return
    await env.althea.database.newComment(
        env.currentUser,
        args.page,
        args.content
    )
    return{}
}
