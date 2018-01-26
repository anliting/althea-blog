module.exports=async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    opt instanceof Object&&
    typeof opt.id=='number'&&
    type.isArray(type.isStringValue)(opt.columns)||0()
    let page=await db.getPage(opt.id)
    page&&
    !page.data.isremoved&&
    (page.data.ispublic||env.currentUser.isadmin)||0()
    let res={}
    if(0<=opt.columns.indexOf('author'))
        res.author=page.data.id_user_author
    if(0<=opt.columns.indexOf('public'))
        res.public=!!page.data.ispublic
    if(0<=opt.columns.indexOf('lastversionId'))
        res.lastversionId=page.data.id_lastversion
    if(0<=opt.columns.indexOf('preferredPagename'))
        res.preferredPagename=page.data.preferredPagename
    if(0<=opt.columns.indexOf('timestamp_insert'))
        res.timestamp_insert=page.data.timestamp_insert
    if(0<=opt.columns.indexOf('timestamp_lastmodified'))
        res.timestamp_lastmodified=page.data.timestamp_lastmodified
    if(0<=opt.columns.indexOf('pagenames'))
        res.pagenames=page.data.pagenames
    if(0<=opt.columns.indexOf('comments'))
        res.comments=page.comments
    if(0<=opt.columns.indexOf('page_derived_from'))
        res.page_derived_from=[]
    if(0<=opt.columns.indexOf('page_derived_to'))
        res.page_derived_to=[]
    return res
}
