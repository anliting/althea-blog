export default async function(){
    return(await this.query0(`
        select id
        from blog_pagemodule
    `)).map(r=>r.id)
}
