import {dom}from '/lib/core.static.js'
import Pagemodule from '../../Pagemodule.js'
function update(editpage,data){
    let textarea_content=editpage._nodes.textarea_content
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
    editpage._nodes.select_privacy.value=
        editpage.id&&data.lastversion_page.ispublic?3:1
    data.pagemodules.sort((a,b)=>
        a.priority-b.priority
    )
    data.pagemodules.map(e=>{
        let option=dom.option(e.name)
        option.value=e.id
        if(editpage.id&&e.id==data.lastversion_page.id_pagemodule)
            option.selected='selected'
        editpage._nodes.select_id_pagemodule.appendChild(
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
        editpage._nodes.tags.appendChild(
            option
        )
    })
    if(editpage.id){
        editpage._nodes.input_title.value=
            data.lastversion_page.title
        textarea_content.value=
            data.lastversion_page.content
    }
    editpage._nodes.input_newtag.disabled=false
    editpage._nodes.input_newname.disabled=false
    editpage._nodes.input_title.disabled=false
    editpage._nodes.textarea_content.disabled=false
    if(editpage.id){
        textarea_content.selectionStart=
        textarea_content.selectionEnd=0
        textarea_content.focus()
    }
}
export default update
