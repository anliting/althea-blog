module.exports=Page
function Page(db,data){
    this.db=db
    this.id=data.id
    this.data=data
}
Page.prototype.getComments=function(){
    return this.db.query0(`
        select id
        from blog_comment
        where ?
    `,{
        id_page:this.id
    }).then(rows=>rows.map(row=>row.id))
}
