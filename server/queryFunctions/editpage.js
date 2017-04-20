module.exports=async(args,env)=>{
    let type=env.althea.lib.anliting.type
    let cu=env.currentUser
    if(!(
        Number.isFinite(args.id_page)&&
        typeof args.ispublic=='boolean'&&
        Number.isFinite(args.id_pagemodule)&&
        typeof args.title=='string'&&
        typeof args.content=='string'&&
        type.isArray(type.isStringValue)(args.tags)&&
        cu.isadmin
    ))
        return
    if(args.id_page==0){
        let page=await env.althea.database.newPage(
            args.ispublic,
            cu.id,
            args.id_pagemodule,
            args.title,
            args.content,
            args.tags,
            args.pagenames
        )
        return page.id
    }else{
        await env.althea.database.newPageversionToPage(
            args.ispublic,
            cu.id,
            args.id_pagemodule,
            args.title,
            args.content,
            args.tags,
            args.pagenames,
            args.id_page
        )
        return args.id_page
    }
}
