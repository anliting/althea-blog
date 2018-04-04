function Comment(
    id,
    timestamp_insert,
    id_page,
    id_user_owner,
    content
){
    this.id=id
    this.timestamp_insert=timestamp_insert
    this.id_page=id_page
    this.id_user_owner=id_user_owner
    this.content=content
}
export default Comment
