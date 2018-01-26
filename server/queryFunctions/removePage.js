module.exports=async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.page=='number'&&
    env.currentUser.isadmin||0()
    await db.removePage(opt.page)
    return null
}
