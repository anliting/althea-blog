module.exports=(args,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    if(!(
        type.isArray(type.isStringValue)(args.tags)
    ))
        return
    return env.althea.database.getPagesByTags(cu,args.tags)
}
