export default function(id){
    return this.query(`
        delete from blog_comment
        where ?
    `,{id})
}
