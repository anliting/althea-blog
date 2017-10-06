import BlogView from './prototype.view/BlogView.js'
export default{get(){
    let view=new BlogView(this)
    return view
}}
