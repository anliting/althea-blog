import site from '/lib/site.js'
import createHideShowA from './Page.prototype.createPrivacyTable/createHideShowA.js'
import privacyTd from './Page.prototype.createPrivacyTable/privacyTd.js'
import altheaCore from '/lib/core.static.js'
let{dom}=altheaCore
function createPrivacyTable(pageView){
    let
        page=this,
        table_privacy
    table_privacy=dom.table(
        tr_privacy(page),
        tr_tags()
    )
    table_privacy.style.width='100%'
    table_privacy.style.marginBottom='20px'
    return table_privacy
    function tr_privacy(page){
        return dom.tr(
            privacyTd(page),
            td_functions()
        )
    }
    function td_functions(){
        let td=dom.td(
            createHideShowA(page,pageView),
            page.a_comment
        )
        td.className='td_pageButtons'
        td.style.width='100px'
        ;(async()=>{
            let u=await page.blog._currentUser
            await u.load('isadmin')
            if(u.isadmin){
                td.appendChild(a_editpage())
                td.appendChild(a_removepage())
            }
        })()
        return td
        function a_editpage(){
            let a=dom.a()
            a.className='a_editpage functionbutton'
            a.href=page.id+'/edit'
            a.innerHTML='<i class=material-icons>mode_edit</i>'
            return a
        }
        function a_removepage(){
            let a=dom.a()
            a.className='functionbutton a_removepage'
            a.href='javascript:'
            a.onclick=()=>{
                if(confirm('Remove?')){
                    remove()
                }
            }
            a.innerHTML='<i class=material-icons>remove</i>'
            return a
            function remove(){
                site.send({
                    function:'removePage',
                    page:page.id
                })
            }
        }
    }
    function tr_tags(){
        return dom.tr(td())
    }
    function td(){
        let
            td=dom.td(),
            isFirst
        if(page.tags.length){
            page.tags.sort()
            td.appendChild(
                document.createTextNode('Tagged: ')
            )
            isFirst=true
            page.tags.map(e=>{
                if(isFirst)
                    isFirst=false
                else
                    td.appendChild(
                        document.createTextNode(', ')
                    )
                td.appendChild(
                    page.blog._anchor_addTag({name:e})
                )
            })
        }
        return td
/*+(p.page_derived_from.length!=0?str_pages_derived_from:'')
+(p.page_derived_to.length!=0?str_pages_derived_to:'')*/
    }
}
export default createPrivacyTable
