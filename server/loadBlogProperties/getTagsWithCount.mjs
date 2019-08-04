export default async function(){
    return(await this.query0(`
        select
            tagname,
            count(*) as count
        from blog_tag
        group by tagname
    `)).map(row=>({
        tagname:row.tagname,
        count:row.count
    }))
}
