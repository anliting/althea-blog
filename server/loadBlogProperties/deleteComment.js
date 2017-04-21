module.exports=function(id){
    return this.query(`
        delete from comment
        where ?
    `,{id})
}
