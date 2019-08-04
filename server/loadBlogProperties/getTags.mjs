export default async function(){
    return(await this.query0(`
        select distinct tagname from blog_tag
    `)).map(row=>row.tagname)
}
