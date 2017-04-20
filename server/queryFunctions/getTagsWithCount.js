module.exports=(db,args,env)=>{
    let cu=env.currentUser
    if(!cu.isadmin)
        return
    return db.getTagsWithCount()
}
