module.exports=selectPagemoduleDefinitions
function selectPagemoduleDefinitions(){
    return this.query0(`
        select *
        from blog_definition
    `)
}
