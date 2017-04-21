module.exports=Page
function Page(db,data){
    this.db=db
    this.id=data.id
    this.data=data
}
Page.prototype.getComments=function(){
    return this.db.query(`
        select id
        from comment
        where ?
    `,{
        id_page:this.id
    }).then(a=>a[0]).then(rows=>rows.map(row=>row.id))
}
