let mysql=require('mysql2/promise')
module.exports=whereQuery_pages_permitted
function whereQuery_pages_permitted(cu){
    return mysql.format(`
        (!isremoved&&(ispublic||?))
    `,{
        id_user_author:cu.id
    })
}
