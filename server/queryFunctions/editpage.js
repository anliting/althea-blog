module.exports=async(db,opt,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    if(!(
        opt instanceof Object&&
        typeof opt.id_page=='number'&&
        typeof opt.ispublic=='boolean'&&
        typeof opt.id_pagemodule=='number'&&
        typeof opt.title=='string'&&
        typeof opt.content=='string'&&
        type.isArray(type.isStringValue)(opt.tags)&&
        cu.isadmin
    ))
        return
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
            opt.tags,
            opt.pagenames,
            opt.id_page
        )
        return opt.id_page
    }
}
