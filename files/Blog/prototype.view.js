(async()=>{
    let BlogView=await module.shareImport('prototype.view/BlogView.js')
    return{get(){
        let view=new BlogView(this)
        return view
    }}
})()
