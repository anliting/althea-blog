(async()=>{
    let[
        dom,
        Pagemodule,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.repository.blog.Pagemodule,
    ])
    function update(editpage,data){
        data.pagemodules.map(async e=>{
            let definitions=await e.definitions
            editpage.pagemodules.push(new Pagemodule(
                e.id,
                e.priority,
                e.name,
                definitions
            ))
        })
        /*document.getElementById(
            'input_ispublic_'+(
                editpage.id&&data.lastversion_page.ispublic?
                    'true'
                :
                    'false'
            )
        ).checked='checked'*/
        document.getElementById('select_privacy').value=
            editpage.id&&data.lastversion_page.ispublic?2:1
        data.pagemodules.sort((a,b)=>
            a.priority-b.priority
        )
        data.pagemodules.map(e=>{
            let option=dom.option(e.name)
            option.value=e.id
            if(editpage.id&&e.id==data.lastversion_page.id_pagemodule)
                option.selected='selected'
            document.getElementById('select_id_pagemodule').appendChild(
                option
            )
        })
        editpage.id&&data.lastversion_page.tags.map(e=>{
            editpage.setOfTags.addTag(e)
        })
        editpage.id&&data.page.pagenames.map(e=>{
            editpage.setOfNames.addTag(e)
        })
        data.tags.map(e=>{
            let option=dom.option({value:e})
            document.getElementById('tags').appendChild(
                option
            )
        })
        if(editpage.id){
            document.getElementById('input_title').value=
                data.lastversion_page.title
            textarea_content.value=
                data.lastversion_page.content
        }
        document.getElementById('input_newtag').disabled=false
        document.getElementById('input_newname').disabled=false
        document.getElementById('input_title').disabled=false
        textarea_content.disabled=false
        if(editpage.id){
            textarea_content.selectionStart=
            textarea_content.selectionEnd=0
            textarea_content.focus()
        }
    }
    return update
})()
