export default async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    opt instanceof Object&&
    typeof opt.id_page=='number'&&
    typeof opt.ispublic=='boolean'&&
    typeof opt.id_pagemodule=='number'&&
    typeof opt.title=='string'&&
    typeof opt.content=='string'&&
    type.isArray(type.isStringValue)(opt.tags)&&
    cu.isadmin||0()
    if(opt.id_page==0){
        let page=await db.newPage(
            opt.ispublic,
            cu.id,
            opt.id_pagemodule,
            opt.title,
            opt.content,
            opt.tags,
            opt.pagenames
        )
        return page.id
    }else{
        await db.newPageversionToPage(
            opt.ispublic,
            cu.id,
            opt.id_pagemodule,
            opt.title,
            opt.content,
            opt.pagenames,
            opt.id_page
        )
        await db.transactionDo(async cn=>{
            await cn.query(`
                delete from blog_tag where ?
            `,{pageId:opt.id_page})
            await Promise.all(opt.tags.map(e=>
                db.putTag(cn,opt.id_page,e)
            ))
        })
        return opt.id_page
    }
}
