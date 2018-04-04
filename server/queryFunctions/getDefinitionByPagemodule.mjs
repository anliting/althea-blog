export default(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.id=='number'||0()
    return db.getDefinitionByPagemodule(opt.id)
}
