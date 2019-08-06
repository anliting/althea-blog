export default async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    opt instanceof Object&&
    typeof opt.id=='number'&&
    type.isArray(type.isStringValue)(opt.columns)||0()
    let page=await db.getPage(opt.id)
    ;(page.ispublic||env.currentUser.isadmin)||0()
    let pv=await db.getPageversion(page.id_lastversion)
    return{
        author:                 page.id_user_author,
        public:                 !!page.ispublic,
        lastversionId:          page.id_lastversion,
        preferredPagename:      page.preferredPagename,
        timestamp_insert:       page.timestamp_insert,
        timestamp_lastmodified: page.timestamp_lastmodified,
        pagenames:              page.pagenames,
        comments:               page.comments,
        tags:                   page.tags,
        id_pagemodule:          pv.data.id_pagemodule,
        title:                  pv.data.title,
        content:                pv.data.content,
    }
}
