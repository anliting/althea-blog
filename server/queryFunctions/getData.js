module.exports=async function(db,opt,env,althea){
    let data=JSON.parse(await althea.getData())
    if(!(
        opt instanceof Object
    ))
        return
    if(!('title' in data))
        data.title=''
    if(!('description' in data))
        data.description=''
    if(!('bannerTitle' in data))
        data.bannerTitle=''
    if(!('tagline' in data))
        data.tagline=''
    if(!('footer' in data))
        data.footer=''
    if(!('og' in data))
        data.og=0
    return data
}
