export default(db,opt,env)=>{
    env.currentUser.isadmin||0()
    return db.getTagsWithCount()
}
