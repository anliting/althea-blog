import validPageData from'./validPageData.mjs'
export default async(db,opt,env)=>{
    let cu=env.currentUser
    opt instanceof Object&&
    validPageData(env,opt.data)&&
    cu.isadmin||0()
    let page=await db.newPage(
        opt.data.ispublic,
        cu.id,
        opt.data.id_pagemodule,
        opt.data.title,
        opt.data.content,
        opt.data.tags,
        opt.data.pagenames
    )
    return page.id
}
