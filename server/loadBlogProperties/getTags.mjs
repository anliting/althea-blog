export default async function(){
    let cn=await this.connection
    await cn.query(`
        create temporary table t
        select id_lastversion from blog_page
    `)
    let a=await cn.query(`
        select tagname
        from blog_tag
        where id_pageversion in (
            select * from t
        )
        group by tagname
    `)
    ;(async()=>{
        await cn.query(`
            drop table t
        `)
        cn.release()
    })()
    return a[0].map(row=>row.tagname)
}
