export default async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    opt instanceof Object&&
    typeof opt.id=='number'&&
    type.isArray(type.isStringValue)(opt.columns)||0()
    let pageversion=await db.getPageversion(opt.id)
    pageversion&&
    (env.currentUser.isadmin||pageversion.data.ispublic)||0()
    let res={}
    if(0<=opt.columns.indexOf('title'))
        res.title=pageversion.data.title
    if(0<=opt.columns.indexOf('content'))
        res.content=pageversion.data.content
    if(0<=opt.columns.indexOf('id_page'))
        res.id_page=pageversion.data.id_page
    if(0<=opt.columns.indexOf('id_pagemodule'))
        res.id_pagemodule=pageversion.data.id_pagemodule
    if(0<=opt.columns.indexOf('id_user_author'))
        res.id_user_author=pageversion.data.id_user_author
    if(0<=opt.columns.indexOf('timestamp_insert'))
        res.timestamp_insert=pageversion.data.timestamp_insert
    return res
}
