import validPageData from'./validPageData.mjs'
export default async(db,opt,env)=>{
    let cu=env.currentUser
    opt instanceof Object&&
    typeof opt.id_page=='number'&&
    validPageData(env,opt.data)&&
    cu.isadmin||0()
    await db.setPage(
        opt.data.ispublic,
        cu.id,
        opt.data.id_pagemodule,
        opt.data.title,
        opt.data.content,
        opt.data.pagenames,
        opt.id_page
    )
    await db.transactionDo(async cn=>{
        await cn.query(`
            delete from blog_tag where ?
        `,{pageId:opt.id_page})
        await Promise.all(opt.data.tags.map(e=>
            db.putTag(cn,opt.id_page,e)
        ))
    })
    return 0
}
