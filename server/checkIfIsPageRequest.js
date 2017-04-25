module.exports=async(env,path)=>{
    let type=env.althea.lib.anliting.type
    /*
        1: no
        2: permission denied
        3: blog
        4: editpage
    */
    let
        id_pathname,
        currentUser,
        dataOfPageById,
        dataOfPageByPagename,
        promises=[]
    promises.push(
        env.database.getCurrentUserByRequest(env.request).then(user=>{
            currentUser=user
        })
    )
    promises.push(
        selectPageByPagename(env.database,path[1]).then(rows=>{
            if(rows.length)
                dataOfPageByPagename=rows[0]
        })
    )
    if(type.stringIsInteger(path[1])){
        id_pathname=parseInt(path[1],10)
        promises.push(
            selectPage(env.database,id_pathname).then(rows=>{
                if(rows.length)
                    dataOfPageById=rows[0]
            })
        )
    }
    await Promise.all(promises)
    let dataOfPage=dataOfPageById||dataOfPageByPagename
    if(dataOfPage){
        if(
            !dataOfPage.ispublic&&
            dataOfPage.id_user_author!==currentUser.id
        )
            return {status:2}
        env.id_page=dataOfPage.id
        if(path.length<3)
            return {status:3}
        if(path[2]==='edit'&&path.length<4)
            return {status:4}
    }
    return{status:1}
}
function selectPage(db,id){
    return db.query0(`
        select id,ispublic,id_user_author
        from blog_page where ?
    `,{id})
}
function selectPageByPagename(db,pagename){
    return db.query0(`
        select id,ispublic,id_user_author
        from blog_page where id in (
            select id_page from blog_pagename where ?
        )
    `,{pagename})
}
