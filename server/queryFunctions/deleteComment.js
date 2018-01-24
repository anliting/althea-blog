module.exports=async(db,opt,env)=>{
    if(!(
        opt instanceof Object&&
        typeof opt.id=='number'&&
        env.currentUser.isadmin
    ))
        return
    await db.deleteComment(opt.id)
    return null
}
