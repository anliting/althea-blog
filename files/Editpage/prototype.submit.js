async function submit(){
    this.changeEditor('html')
    let id,data={
        id_pagemodule:  +this._nodes.select_id_pagemodule.value,
        ispublic:       this._nodes.select_privacy.value==3,
        tags:           this.setOfTags.toArray(),
        pagenames:      this.setOfNames.toArray(),
        title:          this._nodes.input_title.value,
        content:        this.textarea_content.value,
    }
    if(this.id){
        id=this.id
        await this._site.send({
            function:'blog_setPage',
            id_page:this.id,
            data,
        })
    }else
        id=await this._site.send({
            function:'blog_putPage',
            data,
        })
    return{id}
}
export default submit
