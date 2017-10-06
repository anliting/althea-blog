import dom from '/lib/tools/dom.js'
function use_list_tags__count_suggested(blogView,list,div){
    list.sort((a,b)=>
        a.name.localeCompare(b.name)
    )
    blogView.datalist_input_searchForTag.innerHTML=''
    list.map(e=>{
        let o=dom.option({value:e.name})
        blogView.datalist_input_searchForTag.appendChild(o)
    })
    let tagsToSelect=(blogView.blog.status.tagNames||[]).slice()
    list.map((t,i)=>{
        if(i%12==0)
            div.appendChild(ul())
        if((blogView.blog.status.tagNames||[]).indexOf(t.name)!==-1)
            return
        div.lastChild.appendChild(li(t))
    })
    div.appendChild(div_clearboth())
    function ul(){
        return dom.ul(ul=>{ul.style.float='left'})
    }
    function li(t){
        return dom.li(a(t))
    }
    function a(t){
        tagsToSelect.push(t.name)
        let a=blogView.blog._anchor_addTag(t)
        tagsToSelect.pop()
        a.innerHTML+=
            '&nbsp;<span style=color:purple>('+
            t.count+')</span>'
        return a
    }
    function div_clearboth(){
        return dom.div(div=>{div.style.clear='both'})
    }
}
export default use_list_tags__count_suggested
