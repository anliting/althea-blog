(async()=>{
    let[
        PageView
    ]=await Promise.all([
        module.shareImport('PageView.js')
    ])
    return{get(){
        return new PageView(this)
    }}
})()
