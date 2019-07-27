import event from './event.js'
import {doe}from '/lib/core.static.js'
function userA(blog,div,u){
    let a=doe.a(u.username,{href:'javascript:'})
    a.onclick=e=>{
        e.preventDefault()
        e.stopPropagation()
        let n=userDiv(blog,u)
        event.onceClickOrBlurButNotMouseDown(n,()=>div.removeChild(n))
        doe(div,n)
        n.focus()
    }
    return a
}
function userDiv(blog,u){
    let div=doe.div(innerDiv(blog,u),{tabIndex:0})
    div.style.position='relative'
    div.style.outline='none'
    div.style.height='0'
    div.style.width='100%'
    div.style.top='8px'
    return div
}
function innerDiv(blog,u){
    return doe.div(
        logoutA(blog),
        doe.br(),
        doe.a('Profile',{href:`user/${u.username}`}),
        ...(u.isadmin?[
            doe.br(),
            doe.a('Drive',{href:`home/${u.username}`}),
            doe.br(),
            doe.a('Control Panel',{href:'control-panel'}),
            doe.br(),
            doe.a('Blog Control Panel',{href:'blog-control-panel'}),
            doe.br(),
            doe.a('New Page',{href:'newpage'}),
        ]:[]),n=>{
            n.style.margin='0 auto'
            n.style.backgroundColor='white'
            n.style.border='1px solid lightgray'
        }
    )
}
function logoutA(blog){
    let a=doe.a('Logout')
    a.href='javascript:'
    a.onclick=async e=>{
        e.preventDefault()
        blog._site.logout
    }
    return a
}
export default userA
