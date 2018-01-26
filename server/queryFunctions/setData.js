module.exports=async function(db,opt,env,althea){
    opt instanceof Object&&
    env.currentUser.isadmin||0()
    await althea.setData(JSON.stringify(opt.data))
    return null
}
