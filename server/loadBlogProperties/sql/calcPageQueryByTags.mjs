import mysql from 'mysql2'
function calcPageQueryByTags(tags){
/*
Generates a query that select pages by selected tags.
*/
    if(tags.length===0)
        throw ''
    let output=''
    tags.map((t,i)=>{
        if(0<=i-1)
            output+='join '
        output+='('+
            'select distinct `pageId` as `id'+i+'`'+
            'from `blog_tag`'+
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
export default calcPageQueryByTags
