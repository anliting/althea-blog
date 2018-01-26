module.exports=async(db,args,env)=>{
    env.currentUser.isadmin||0()
    return db.getComments()
}
