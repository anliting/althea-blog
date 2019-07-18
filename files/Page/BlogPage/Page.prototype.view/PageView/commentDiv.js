import {doe,html}from '/lib/core.static.js'
export default(page,comment)=>{
    let div=doe.div()
    div.className='comments'
    ;(async()=>{
        comment=await comment
        await comment.load([
            'content',
            'id_user_owner',
            'timestamp_insert',
        ])
        let[
            cu,
            u,
        ]=await Promise.all([
            (async()=>{
                let u=await page.blog._currentUser
                await u.load('isadmin')
                return u
            })(),
            (async()=>{
                let site=await page.blog._site
                let u=await site.getUser(comment.id_user_owner)
                await u.load('username')
                return u
            })(),
        ])
        div.innerHTML=
            `<table style=width:100%><tr><td>${
                u.username
            }</td><td style=text-align:right>${
                (new Date(comment.timestamp_insert)).toLocaleString()
            }</td></tr></table><div>${
                html.encodeText(comment.content)
            }</div>`
        if(cu.isadmin)
            doe(div,deleteA(comment.id))
    })()
    return div
    function deleteA(id){
        let a=doe.a('delete',{href:'javascript:'})
        a.onclick=async e=>{
            e.preventDefault()
            e.stopPropagation()
            let site=await page.blog._site
            await site.send({
                function:'blog_deleteComment',
                id
            })
            page.blog.status=page.blog.status
        }
        return a
    }
}
