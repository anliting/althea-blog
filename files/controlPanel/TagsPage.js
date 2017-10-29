import{dom,Site}from '/lib/core.static.js'
let site=new Site
function TagsPage(){
}
TagsPage.prototype.initialize=async function(){
    this.isInitialized=true
    this.mainDiv=dom.div()
    let data=await site.send('getTagsWithCount')
    this.mainDiv.innerHTML=''
    let table=dom.table()
    table.classList.add('bordered')
    table.classList.add('padding4px')
    this.mainDiv.appendChild(table)
    table.innerHTML=
        '<thead>'+
            '<tr>'+
                '<th>Tagname'+
                '<th>Count'+
            '</tr>'+
        '</thead>'
    data.map(
        tag=>table.appendChild(tr_tag(tag))
    )
    function tr_tag(tag){
        return dom.tr(td_name(),td_count())
        function td_name(){
            let td=dom.td(a_name())
            td.style.fontFamily='Monospace'
            return td
        }
        function a_name(){
            let a=dom.a(tag.tagname)
            a.href='/tags/'+encodeURIComponent(tag.tagname)
            return a
        }
        function td_count(){
            let td=dom.td(tag.count)
            td.style.textAlign='right'
            return td
        }
    }
}
export default TagsPage
