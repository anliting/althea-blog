function setup(editpage,isMobile){
    let main=editpage._nodes.main
    editpage.textarea_content=editpage._nodes.textarea_content
    onbeforeunload=()=>{
        return''
    }
    main.classList.add(!isMobile?'nonMobile':'mobile')
    editpage.setup_form()
    editpage.emit('setUp')
    editpage.setUp=true
}
export default setup
