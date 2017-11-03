import path from '../path.js'
function keydown(e){
    let
        blog=this.blog,
        view=this
    if(0<=[
        'INPUT',
        'TEXTAREA',
    ].indexOf(
        document.activeElement.tagName
    ))
        return
    if(!e.ctrlKey&&!e.shiftKey){
        if(handle())
            pdAndSp()
    }else if(!e.ctrlKey&&e.shiftKey){
        if(handleShift())
            pdAndSp()
    }
    function pdAndSp(){
        e.preventDefault()
        e.stopPropagation()
    }
    function handle(){
        // e h l o t
        if(e.keyCode==69){ // e
            let x=currentPage()
            if(!x)
                return
            ;(async()=>{
                let u=await blog._currentUser
                if(u.isadmin)
                    blog.emit('location',blog.pages[x.id].getHref()+'/edit')
            })()
        }else if(e.keyCode==72){ // h
            blog.status={}
        }else if(e.keyCode==76){ // l
            ;(async()=>{
                let[
                    user,
                    site,
                ]=await Promise.all([
                    blog._currentUser,
                    blog._site,
                ])
                if(user.isAnonymous)
                    site.showLoginForm
                else
                    site.logout
            })()
        }else if(e.keyCode==79){ // o
            let x=currentPage()
            if(!x)
                return
            blog.status={
                pageId:x.id
            }
        }else if(e.keyCode==84){ // t
            view.input.focus()
        }else{
            return false
        }
        return true
    }
    function handleShift(){
        // E H O
        if(e.keyCode==69){ // E
            let x=currentPage()
            if(!x)
                return
            open(
                blog.pages[x.id].getHref()+'/edit',
                '_blank'
            ).focus()
        }else if(e.keyCode==72){ // H
            ;(async()=>{
                let user=await blog._currentUser
                await user.load('username')
                blog.emit('location','home/'+user.username)
            })()
        }else if(e.keyCode==79){ // O
            let x=currentPage()
            if(!x)
                return
            open(path.getHrefByPage(blog.pages[x.id]),'_blank').focus()
        }else
            return false
        return true
    }
    function currentPage(){
        let x=blog.pages[blog.status.pageId]
        Object.keys(blog.pages).map(i=>{
            let e=blog.pages[i]
            if(!e.div)
                return
            if(
                e.div.getBoundingClientRect().top<1&&(
                    !x||
                    x.div.getBoundingClientRect().top<
                    e.div.getBoundingClientRect().top
                )
            )
                x=e
        })
        return x
    }
}
export default keydown
