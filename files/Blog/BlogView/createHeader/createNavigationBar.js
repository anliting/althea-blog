import event from './createNavigationBar/event.js'
import userA from './createNavigationBar/userA.js'
import {doe}from '/lib/core.static.js'
function createNavigationBar(view){
    let
        blog=view.blog,
        div=doe.div({className:'navigationBar'},menuA()),
        site=blog._site
    perUser(site,async u=>{
        await u.load(['isAnonymous','username','isadmin'])
        let a=u.isAnonymous?loginA():userA(blog,div,u)
        div.appendChild(a)
        {
            let f=()=>{
                div.removeChild(a)
                site.off('userChange',f)
            }
            site.on('userChange',f)
        }
    })
    return div
    function aboutA(){
        return doe.a('About',{href:'about'})
    }
    function perUser(site,func){
        ;(async()=>func(await site.currentUser))()
        site.on('userChange',
            async()=>func(await site.currentUser)
        )
    }
    function loginA(){
        let a=doe.a('Login',{href:'javascript:'})
        a.onclick=async e=>{
            e.preventDefault()
            e.stopPropagation()
            ;(await blog._site).showLoginForm
        }
        return a
    }
    function menuA(){
        let a=doe.a('Menu')
        a.href='javascript:'
        a.onclick=e=>{
            e.preventDefault()
            e.stopPropagation()
            let n=menuDiv()
            event.onceClickOrBlurButNotMouseDown(n,()=>
                div.removeChild(n)
            )
            div.appendChild(n)
            n.focus()
        }
        return a
    }
    function menuDiv(){
        let div=doe.div(innerDiv())
        div.style.position='relative'
        div.style.height='0'
        div.style.width='100%'
        div.style.outline='none'
        div.style.top='8px'
        div.tabIndex=0
        return div
        function innerDiv(){
            let div=doe.div(aboutA())
            div.style.margin='0 auto'
            div.style.backgroundColor='white'
            div.style.border='1px solid lightgray'
            return div
        }
    }
}
export default createNavigationBar
