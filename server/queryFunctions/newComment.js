module.exports=async(db,opt,env)=>{
    if(!(
        opt instanceof Object&&
        typeof opt.page=='number'&&
        typeof opt.content=='string'
    ))
        return
    await db.newComment(
        env.currentUser,
        opt.page,
        opt.content
    )
    return{}
}
