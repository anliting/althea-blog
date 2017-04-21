module.exports=setLastVersionOfPage
function setLastVersionOfPage(db,id_lastversion,id){
    return db.query(`
        update page
        set ?
        where ?
    `,[
        {id_lastversion},
        {id},
    ])
}
