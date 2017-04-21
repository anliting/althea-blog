module.exports=selectPagemoduleDefinitions
function selectPagemoduleDefinitions(){
    return this.query(`
        select *
        from definition
    `).then(a=>a[0])
}
