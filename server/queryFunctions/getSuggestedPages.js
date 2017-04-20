module.exports=(args,env)=>{
    if(!(
        typeof args.page=='number'&&
        typeof args.pageversion=='number'&&
        typeof args.pages_loaded=='object'&&
        typeof args.tags_selected=='object'
    ))
        return
    return env.althea.database.selectPages(
        env.currentUser,
        args.tags_selected,
        args.pages_loaded,
        args.page
    )
}
