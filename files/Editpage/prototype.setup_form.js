export default function(){
    let
        editpage=this,
        button_save=this._nodes.button_save,
        button_submit=this._nodes.button_submit,
        input_newtag=this._nodes.input_newtag,
        input_newname=this._nodes.input_newname
    addEventListener('keydown',e=>{
        if(!(
            e.ctrlKey&&e.shiftKey&&e.keyCode==83
        ))
            return
        ;(async()=>{
            let page=await editpage.submit()
            onbeforeunload=null
            location=page.id
        })()
    })
    button_save.addEventListener('click',()=>{
        // to-do: let user know
        editpage.submit()
    })
    button_submit.addEventListener('click',async()=>{
        let page=await editpage.submit()
        onbeforeunload=null
        location=page.id
    })
    input_newtag.addEventListener('keypress',e=>{
        editpage.setOfTags.onkeypress(e)
    })
    input_newname.addEventListener('keypress',e=>{
        editpage.setOfNames.onkeypress(e)
    })
}
