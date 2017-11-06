async function submit(){
    this.changeEditor(0)
    let id=await this._site.send({
        function:'editpage',
        id_page:this.id,
        id_pagemodule:
            +this._nodes.select_id_pagemodule.value,
        ispublic:this._nodes.select_privacy.value==3,
        tags:this.setOfTags.toArray(),
        pagenames:this.setOfNames.toArray(),
        title:this._nodes.input_title.value,
        content:this.textarea_content.value,
    })
    return{id}
}
export default submit
