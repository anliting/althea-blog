module.exports=async(db,opt,env)=>{
    if(!(
        typeof opt=='object'&&
        opt&&
        typeof opt.id=='number'&&
        env.currentUser.isadmin
    ))
        return
    await db.deleteComment(opt.id)
    return null
}
