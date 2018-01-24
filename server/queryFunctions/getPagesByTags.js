module.exports=(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    if(!(
        opt instanceof Object&&
        type.isArray(type.isStringValue)(opt.tags)
    ))
        return
    return db.getPagesByTags(cu,opt.tags)
}
