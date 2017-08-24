(async()=>{
    let[
        dom,
        randomId,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.shareImport('install_datalist_tags_suggested/randomId.js'),
    ])
    return install_datalist_tags_suggested
    function install_datalist_tags_suggested(blogView){
        blogView.datalist_input_searchForTag=dom.datalist()
        // known best solution
        blogView.datalist_input_searchForTag.id=randomId(16)
    }
})()
