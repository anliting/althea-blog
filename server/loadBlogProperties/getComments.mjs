export default async function(){
    return(await this.query0(`
        select id from blog_comment
    `)).map(r=>r.id)
}
