import{dom}from'/lib/core.static.js'
function createCommentsNode(){
    return dom.div(
        {className:'shadow content'},
        (async()=>{
            let data=await this.send('blog_getComments')
            data.sort((a,b)=>b-a)
            return data.map(async id=>{
                let data=await this.send({
                    function:'blog_getComment',
                    id,
                    columns:[
                        'id_page',
                        'id_user_owner',
                        'timestamp_insert'
                    ]
                })
                let[
                    user,
                    page,
                ]=await Promise.all([
                    this.site.getUser(data.id_user_owner),
                    this.site.getPage(data.id_page),
                ])
                return dom.p(
                    user.a,
                    ' commented on ',
                    page.a,
                    ' at ',
                    (new Date(data.timestamp_insert)).toLocaleString(),
                    '.',
                )
            })
        })()
    )
}
export default createCommentsNode
