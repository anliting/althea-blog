module.exports=(args,env)=>{
    if(!env.currentUser.isadmin)
        return
    return env.althea.database.getTags()
}
