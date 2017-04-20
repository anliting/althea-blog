module.exports=(db,opt,env)=>{
    if(!(
        env.currentUser.isadmin
    ))
        return
    return db.getPagemodules0()
}
