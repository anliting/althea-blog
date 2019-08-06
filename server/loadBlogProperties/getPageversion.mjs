export default async function(id){
    let res=(await this.query0(`
        select *
        from blog_pageversion
        where ?
    `,{id}))[0]
    if(!res)
        return
    return{data:res}
}
