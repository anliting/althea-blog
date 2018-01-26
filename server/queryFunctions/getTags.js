module.exports=(db,opt,env)=>{
    env.currentUser.isadmin||0()
    return db.getTags()
}
