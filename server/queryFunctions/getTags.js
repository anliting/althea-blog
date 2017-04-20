module.exports=(db,args,env)=>{
    if(!env.currentUser.isadmin)
        return
    return db.getTags()
}
