import mysql from 'mysql2'
function whereQuery_pages_permitted(cu){
    return mysql.format(`
        (ispublic||?)
    `,{
        id_user_author:cu.id
    })
}
export default whereQuery_pages_permitted
