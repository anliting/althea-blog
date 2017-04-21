module.exports=function(id){
    return this.query(`
        select
            priority,
            name
        from pagemodule
        where ?
    `,{id}).then(a=>a[0])
}
