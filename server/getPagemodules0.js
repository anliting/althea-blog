module.exports=(opt,env)=>{
    if(!(
        env.currentUser.isadmin
    ))
        return
    return env.althea.database.getPagemodules0()
}
