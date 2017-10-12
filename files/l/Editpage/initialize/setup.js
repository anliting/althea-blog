function setup(editpage,isMobile){
    let div_main=document.getElementById('div_main')
    editpage.textarea_content=
        document.getElementById('textarea_content')
    onbeforeunload=()=>{
        return''
    }
    div_main.classList.add(!isMobile?'nonMobile':'mobile')
    editpage.setup_form()
    editpage.emit('setUp')
    editpage.setUp=true
    return
}
export default setup
