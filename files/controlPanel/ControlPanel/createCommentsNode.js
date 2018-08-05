import{doe}from'/lib/core.static.js'
function createCommentsNode(){
    return doe.div(
        {className:'shadow content'},
        (async n=>{
            let data=await this._io.getComments()
            data.sort((a,b)=>b-a)
            doe(n,data.map(async id=>{
                let data=await this._io.getComment({
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
                    this._io.getUser(data.id_user_owner),
                    this._io.getPage(data.id_page),
                ])
                return doe.p(
                    user.a,
                    ' commented on ',
                    page.a,
                    ' at ',
                    (new Date(data.timestamp_insert)).toLocaleString(),
                    '.',
                )
            }))
        })()
    )
}
export default createCommentsNode
