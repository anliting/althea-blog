async function getTags(db,cu,tags){
    let rows=await db.selectTags(cu,tags)
    return rows.map(row=>({
        name:   row.name,
        count:  row.count,
    }))
}
export default(db,opt,env)=>{
    opt instanceof Object&&
    opt.tags instanceof Array||0()
    return getTags(db,env.currentUser,opt.tags)
}
