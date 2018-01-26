module.exports=async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    opt instanceof Object&&
    typeof opt.id=='number'&&
    type.isArray(type.isStringValue)(opt.columns)||0()
    let c=await db.getComment(opt.id)
    let res={}
    if(0<=opt.columns.indexOf('id_page'))
        res.id_page=c.id_page
    if(0<=opt.columns.indexOf('id_user_owner'))
        res.id_user_owner=c.id_user_owner
    if(0<=opt.columns.indexOf('content'))
        res.content=c.content
    if(0<=opt.columns.indexOf('timestamp_insert'))
        res.timestamp_insert=c.timestamp_insert
    return res
}
