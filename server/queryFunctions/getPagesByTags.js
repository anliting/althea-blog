module.exports=(db,args,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    if(!(
        type.isArray(type.isStringValue)(args.tags)
    ))
        return
    return db.getPagesByTags(cu,args.tags)
}
