module.exports=async function(db,opt,env,althea){
    if(!(
        opt instanceof Object&&
        env.currentUser.isadmin
    ))
        return
    await althea.setData(JSON.stringify(opt.data))
    return null
}
