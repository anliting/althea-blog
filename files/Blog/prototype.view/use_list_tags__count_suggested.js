(async()=>{
    let dom=await module.repository.althea.dom
    function use_list_tags__count_suggested(blogView,list,div){
        list.sort((a,b)=>
            a.name.localeCompare(b.name)
        )
        blogView.datalist_input_searchForTag.innerHTML=''
        list.map(e=>{
            let o=dom('option')
            o.value=e.name
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
            let ul=dom('ul')
            ul.style.float='left'
            return ul
        }
        function li(t){
            return dom('li',a(t))
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
            let div=dom('div')
            div.style.clear='both'
            return div
        }
    }
    return use_list_tags__count_suggested
})()
