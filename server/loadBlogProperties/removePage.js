module.exports=function(id){
    return this.query(`
        update page set ? where ?
    `,[
        {isremoved:1},
        {id},
    ])
}
