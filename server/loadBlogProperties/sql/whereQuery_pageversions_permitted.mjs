import mysql from 'mysql2'
function whereQuery_pageversions_permitted(cu){
    return mysql.format(`
        (ispublic||?)
    `,{
        id_user_author:cu.id
    })
}
export default whereQuery_pageversions_permitted
