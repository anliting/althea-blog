function selectPagemodules(){
    return this.query0(`
        select id,priority,name
        from blog_pagemodule
    `)
}
export default selectPagemodules
