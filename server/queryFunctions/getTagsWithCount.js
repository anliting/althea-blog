module.exports=(db,opt,env)=>{
    let cu=env.currentUser
    if(!cu.isadmin)
        return
    return db.getTagsWithCount()
}
