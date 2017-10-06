import dom from '/lib/tools/dom.js'
import randomId from './install_datalist_tags_suggested/randomId.js'
function install_datalist_tags_suggested(blogView){
    blogView.datalist_input_searchForTag=dom.datalist()
    // known best solution
    blogView.datalist_input_searchForTag.id=randomId(16)
}
export default install_datalist_tags_suggested
