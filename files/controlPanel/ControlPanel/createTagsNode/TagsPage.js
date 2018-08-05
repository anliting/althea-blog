import{doe}from '/lib/core.static.js'
function TagsPage(io){
    this._io=io
    this.mainDiv=doe.div(async()=>{
        let data=await this._io.getTagsWithCount()
        return doe.table(
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
        return doe.tr(td_name(),td_count())
        function td_name(){
            let td=doe.td(a_name())
            td.style.fontFamily='Monospace'
            return td
        }
        function a_name(){
            let a=doe.a(tag.tagname)
            a.href='/tags/'+encodeURIComponent(tag.tagname)
            return a
        }
        function td_count(){
            let td=doe.td(tag.count)
            td.style.textAlign='right'
            return td
        }
    }
}
export default TagsPage
