export default(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    opt instanceof Object&&
    type.isArray(type.isStringValue)(opt.tags)||0()
    return db.getPagesByTags(cu,opt.tags)
}
