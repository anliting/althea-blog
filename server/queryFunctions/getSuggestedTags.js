module.exports=(db,opt,env)=>{
    if(!(
        opt instanceof Object&&
        opt.tags instanceof Array
    ))
        return
    return getTags(db,env.currentUser,opt.tags)
}
async function getTags(db,cu,tags){
    let rows=await db.selectTags(cu,tags)
    return rows.map(row=>({
        name:   row.name,
        count:  row.count,
    }))
}
