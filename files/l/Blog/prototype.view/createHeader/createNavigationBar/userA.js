import dom from '/lib/tools/dom.js'
import event from './event.js'
function userA(blog,div,u){
    let a=dom.a(u.username,{href:'javascript:'})
    a.onclick=e=>{
        e.preventDefault()
        e.stopPropagation()
        let n=userDiv(blog,u)
        event.onceClickOrBlurButNotMouseDown(n,()=>div.removeChild(n))
        dom(div,n)
        n.focus()
    }
    return a
}
function userDiv(blog,u){
    let div=dom.div(innerDiv(blog,u),{tabIndex:0})
    div.style.position='relative'
    div.style.outline='none'
    div.style.height='0'
    div.style.width='100%'
    div.style.top='8px'
    return div
}
function innerDiv(blog,u){
    return dom.div(
        logoutA(blog),
        dom.br(),
        dom.a('Profile',{href:`user/${u.username}`}),
        u.isadmin&&[
            dom.br(),
            dom.a('Drive',{href:`home/${u.username}`}),
            dom.br(),
            dom.a('Settings',{href:'settings'}),
            dom.br(),
            dom.a('New Page',{href:'newpage'}),
        ],n=>{
            n.style.margin='0 auto'
            n.style.backgroundColor='white'
            n.style.border='1px solid lightgray'
        }
    )
}
function logoutA(blog){
    let a=dom.a('Logout')
    a.href='javascript:'
    a.onclick=async e=>{
        e.preventDefault()
        ;(await blog._site).logout
    }
    return a
}
export default userA
