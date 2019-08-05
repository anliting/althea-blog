function Page(db,data){
    this.db=db
    this.id=data.id
    this.data=data
}
Page.prototype.getComments=async function(){
    return(await this.db.query0(`
        select id
        from blog_comment
        where ?
    `,{
        id_page:this.id
    })).map(row=>row.id)
}
export default Page
