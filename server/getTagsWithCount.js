module.exports=(args,env)=>{
    let cu=env.currentUser
    if(!cu.isadmin)
        return
    return env.althea.database.getTagsWithCount()
}
