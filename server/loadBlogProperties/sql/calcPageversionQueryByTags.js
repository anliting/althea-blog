let mysql=require('mysql')
module.exports=calcPageversionQueryByTags
function calcPageversionQueryByTags(tags){
/*
Generates a query that select pageversions by selected tags.
*/
    if(tags.length===0)
        throw ''
    let output=''
    tags.map((t,i)=>{
        if(0<=i-1)
            output+='join '
        output+='('+
            'select distinct `id_pageversion` as `id'+i+'`'+
            'from `tag`'+
            'where `tagname`='+mysql.escape(t)+
        ') as t'+i+' '
        if(0<=i-1)
            output+='on `id'+(i-1)+'`=`id'+i+'`'
    })
    return`
        select \`id${tags.length-1}\`
        from (${output})
    `
}
