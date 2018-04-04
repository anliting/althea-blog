export default(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.page=='number'&&
    typeof opt.pageversion=='number'&&
    typeof opt.pages_loaded=='object'&&
    typeof opt.tags_selected=='object'||0()
    return db.selectPages(
        env.currentUser,
        opt.tags_selected,
        opt.pages_loaded,
        opt.page
    )
}
