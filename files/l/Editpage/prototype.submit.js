async function submit(){
    this.changeEditor(0)
    let id=await this._site.send({
        function:'editpage',
        id_page:this.id,
        id_pagemodule:
            +document.getElementById('select_id_pagemodule').value,
        ispublic:document.getElementById('select_privacy').value==2,
        tags:this.setOfTags.toArray(),
        pagenames:this.setOfNames.toArray(),
        title:document.getElementById('input_title').value,
        content:this.textarea_content.value,
    })
    return{id}
}
export default submit
