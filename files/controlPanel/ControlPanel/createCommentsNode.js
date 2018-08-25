import{doe}from'/lib/core.static.js'
async function appendComments(n){
    doe(n,await Promise.all((
        await this._io.getComments()
    ).sort((a,b)=>b-a).map(async id=>{
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
    })))
}
function createCommentsNode(){
    return doe.div(
        {className:'shadow content'},
        n=>{
            appendComments.call(this,n)
        }
    )
}
export default createCommentsNode
