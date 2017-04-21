let
    Pageversion=require('./Pageversion')
module.exports=function(id){
    return Promise.all([
        this.query(`
            select *
            from pageversion
            where ?
        `,{id}).then(a=>a[0][0]),
        this.query(`
            select tagname
            from tag
            where ?
        `,{id_pageversion:id}).then(a=>a[0]).then(rows=>
            rows.map(row=>row.tagname)
        ),
    ]).then(vals=>{
        let
            res=vals[0],
            tags=vals[1]
        if(!res)
            return
        let pageversion=new Pageversion(res)
        pageversion.data.tags=tags
        return pageversion
    })
}
