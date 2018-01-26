module.exports=async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.page=='number'&&
    typeof opt.content=='string'||0()
    await db.newComment(
        env.currentUser,
        opt.page,
        opt.content
    )
    return{}
}
