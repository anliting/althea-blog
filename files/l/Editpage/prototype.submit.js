function submit(){
    this.changeEditor(0)
    return module.repository.althea.site.then(site=>
        site.send({
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
    ).then(id=>({
        id,
    }))
}
submit
