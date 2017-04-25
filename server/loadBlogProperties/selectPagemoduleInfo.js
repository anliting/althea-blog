module.exports=function(id){
    return this.query0(`
        select
            priority,
            name
        from blog_pagemodule
        where ?
    `,{id})
}
