let
    dateformat= require('date-format')
module.exports=async(db,args,env)=>{
    let type=env.althea.lib.anliting.type
    if(!(
        typeof args.id=='number'&&
        type.isArray(type.isStringValue)(args.columns)
    ))
        return
    let c=await db.getComment(args.id)
    let res={}
    if(0<=args.columns.indexOf('id_page'))
        res.id_page=c.id_page
    if(0<=args.columns.indexOf('id_user_owner'))
        res.id_user_owner=c.id_user_owner
    if(0<=args.columns.indexOf('content'))
        res.content=c.content
    if(0<=args.columns.indexOf('timestamp_insert'))
        res.timestamp_insert=dateformat.asString(
            'yyyy-MM-dd hh:mm:ss',
            c.timestamp_insert
        )
    return res
}
