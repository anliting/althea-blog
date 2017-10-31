module.exports=async function(db,opt,env,althea){
    if(!env.currentUser.isadmin)
        return
    await althea.setData(JSON.stringify(opt.data))
    return null
}
