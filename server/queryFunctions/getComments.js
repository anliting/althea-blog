module.exports=async(db,args,env)=>{
    let cu=env.currentUser
    if(!cu.isadmin)
        return
    return db.getComments()
}
