import Pageversion from './Pageversion.mjs'
export default async function(id){
    let res=await this.query0(`
        select *
        from blog_pageversion
        where ?
    `,{id}).then(a=>a[0])
    if(!res)
        return
    return new Pageversion(res)
}
