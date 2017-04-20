module.exports=async(args,env)=>{
    let type=env.althea.lib.anliting.type
    if(!(
        typeof args.id=='number'&&
        type.isArray(type.isStringValue)(args.columns)
    ))
        return
    let pageversion=await env.althea.database.getPageversion(args.id)
    if(
        !pageversion||
        pageversion.data.isremoved||
        !env.currentUser.isadmin&&!pageversion.data.ispublic
    )
        return
    let res={}
    if(0<=args.columns.indexOf('public'))
        res.public=pageversion.data.ispublic
    if(0<=args.columns.indexOf('title'))
        res.title=pageversion.data.title
    if(0<=args.columns.indexOf('content'))
        res.content=pageversion.data.content
    if(0<=args.columns.indexOf('id_page'))
        res.id_page=pageversion.data.id_page
    if(0<=args.columns.indexOf('id_pagemodule'))
        res.id_pagemodule=pageversion.data.id_pagemodule
    if(0<=args.columns.indexOf('id_user_author'))
        res.id_user_author=pageversion.data.id_user_author
    if(0<=args.columns.indexOf('isremoved'))
        res.isremoved=pageversion.data.isremoved
    if(0<=args.columns.indexOf('tags'))
        res.tags=pageversion.data.tags
    if(0<=args.columns.indexOf('timestamp_insert'))
        res.timestamp_insert=pageversion.data.timestamp_insert
    return res
}