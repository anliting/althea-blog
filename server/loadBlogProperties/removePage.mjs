export default function(id){
    return this.query(`
        update blog_page set ? where ?
    `,[
        {isremoved:1},
        {id},
    ])
}
