module.exports=async(db,opt,env)=>{
    let cu=env.currentUser
    if(!(
        opt instanceof Object&&
        typeof opt.page=='number'&&
        cu.isadmin
    ))
        return
    await db.removePage(opt.page)
    return null
}
