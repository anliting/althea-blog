module.exports=selectPagemodules
function selectPagemodules(){
    return this.query(`
        select id,priority,name
        from pagemodule
    `).then(a=>a[0])
}
