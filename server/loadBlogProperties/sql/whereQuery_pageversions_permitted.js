let mysql=require('mysql2')
module.exports=whereQuery_pageversions_permitted
function whereQuery_pageversions_permitted(cu){
    return mysql.format(`
        (!isremoved&&(ispublic||?))
    `,{
        id_user_author:cu.id
    })
}
