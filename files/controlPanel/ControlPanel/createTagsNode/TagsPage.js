import{dom,Site}from '/lib/core.static.js'
let site=new Site
function TagsPage(){
    this.mainDiv=dom.div(async()=>{
        let data=await site.send('getTagsWithCount')
        return dom.table(
            {
                className:'bordered padding4px',
                innerHTML:`
                    <thead>
                        <tr>
                            <th>Tagname
                            <th>Count
                        </tr>
                    </thead>
                `
            },
            n=>{
                n.style.margin='0 auto'
            },
            data.map(tr_tag),
        )
    })
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
