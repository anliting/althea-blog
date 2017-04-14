module.exports=async(args,env)=>{
    let data=await Promise.all([
        env.althea.database.selectPagemodules(),
        env.althea.database.selectPagemoduleDefinitions(),
    ])
    return f(data[0],data[1])
}
function f(rows_pagemodules,rows_definitions_pagemodules){
    let
        pagemodulesById={}
    let pagemodules=rows_pagemodules.map(row=>
        pagemodulesById[row.id]={
            id:row.id,
            definitions:[],
            priority:row.priority,
            name:row.name,
        }
    )
    rows_definitions_pagemodules.map(row=>{
        pagemodulesById[row.id_pagemodule].definitions.push({
            content:row.content,
            level:row.level,
            name:row.name,
        })
    })
    return pagemodules
}
