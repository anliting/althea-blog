module.exports=(db,opt,env)=>{
    if(!(
        opt instanceof Object&&
        typeof opt.id=='number'
    ))
        return
    return db.getDefinitionByPagemodule(opt.id)
}
