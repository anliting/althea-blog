export default async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.page=='number'&&
    typeof opt.content=='string'||0()
    await db.putComment(
        env.currentUser,
        opt.page,
        opt.content
    )
    return{}
}
