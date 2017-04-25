let
    Pageversion=require('./Pageversion')
module.exports=async function(id){
    let[
        res,
        tags
    ]=await Promise.all([
        this.query0(`
            select *
            from blog_pageversion
            where ?
        `,{id}).then(a=>a[0]),
        this.query0(`
            select tagname
            from blog_tag
            where ?
        `,{id_pageversion:id}).then(rows=>
            rows.map(row=>row.tagname)
        ),
    ])
    if(!res)
        return
    let pageversion=new Pageversion(res)
    pageversion.data.tags=tags
    return pageversion
}
