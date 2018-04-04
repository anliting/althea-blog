function setLastVersionOfPage(db,id_lastversion,id){
    return db.query(`
        update blog_page
        set ?
        where ?
    `,[
        {id_lastversion},
        {id},
    ])
}
export default setLastVersionOfPage
