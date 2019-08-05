import{doe}from'/lib/core.static.js'
function update(editpage,data){
    let textarea_content=editpage._nodes.textarea_content
    data.pagemodules.map(async e=>{
        await e.definitions
        editpage.pagemodules.push(e)
    })
    editpage._nodes.select_privacy.value=
        editpage.id&&data.page.ispublic?3:1
    data.pagemodules.sort((a,b)=>
        a.priority-b.priority
    )
    data.pagemodules.map(e=>{
        let option=doe.option(e.name,{value:e.id})
        if(editpage.id&&e.id==data.lastversion_page.id_pagemodule)
            option.selected='selected'
        doe(editpage._nodes.select_id_pagemodule,option)
    })
    editpage.id&&data.page.tags.map(e=>{
        editpage.setOfTags.addTag(e)
    })
    editpage.id&&data.page.pagenames.map(e=>{
        editpage.setOfNames.addTag(e)
    })
    data.tags.map(e=>{
        doe(editpage._nodes.tags,doe.option({value:e}))
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
