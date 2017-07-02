;(async()=>{
    let[
        PageView
    ]=await Promise.all([
        module.shareImport('Page.prototype.view/PageView.js')
    ])
    return{get(){
        return new PageView(this)
    }}
})()
