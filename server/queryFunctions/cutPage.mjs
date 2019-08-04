export default async(db,opt,env)=>{
    opt instanceof Object&&
    typeof opt.page=='number'&&
    env.currentUser.isadmin||0()
    await db.cutPage(opt.page)
    return 0
}
