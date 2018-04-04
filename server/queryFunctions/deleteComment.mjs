export default async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.id=='number'&&
    env.currentUser.isadmin||0()
    await db.deleteComment(opt.id)
    return null
}
