module.exports=(db,args,env)=>{
    if(!(
        args.tags instanceof Array
    ))
        return
    return getTags(db,env.currentUser,args.tags)
}
async function getTags(db,cu,tags){
    let rows=await db.selectTags(cu,tags)
    return rows.map(row=>({
        name:   row.name,
        count:  row.count,
    }))
}
