export default async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.id=='number'&&
    env.currentUser.isadmin||0()
    await db.cutComment(opt.id)
    return 0
}
