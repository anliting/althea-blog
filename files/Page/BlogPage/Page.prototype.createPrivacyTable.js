import createHideShowA from './Page.prototype.createPrivacyTable/createHideShowA.js'
import privacyTd from './Page.prototype.createPrivacyTable/privacyTd.js'
import {doe}from '/lib/core.static.js'
function createPrivacyTable(pageView){
    let
        page=this,
        table_privacy
    table_privacy=doe.table(
        tr_privacy(page),
        tr_tags()
    )
    table_privacy.style.width='100%'
    table_privacy.style.marginBottom='20px'
    return table_privacy
    function tr_privacy(page){
        return doe.tr(
            privacyTd(page),
            td_functions()
        )
    }
    function td_functions(){
        let td=doe.td(
            createHideShowA(page,pageView),
            page.a_comment
        )
        td.className='td_pageButtons'
        td.style.width='100px'
        ;(async()=>{
            let u=await page.blog._currentUser
            await u.load('isadmin')
            if(u.isadmin)
                doe(td,a_editpage(),a_removepage())
        })()
        return td
        function a_editpage(){
            let a=doe.a()
            a.className='a_editpage functionbutton'
            a.href=page.id+'/edit'
            a.innerHTML='<i class=material-icons>mode_edit</i>'
            return a
        }
        function a_removepage(){
            return doe.a({
                className:'functionbutton a_removepage',
                href:'javascript:',
                onclick:()=>{
                    if(confirm('Remove?')){
                        remove()
                    }
                },
                innerHTML:'<i class=material-icons>remove</i>',
            })
            function remove(){
                page.blog._site.send({
                    function:'blog_removePage',
                    page:page.id
                })
            }
        }
    }
    function tr_tags(){
        return doe.tr(td())
    }
    function td(){
        let
            td=doe.td(),
            isFirst
        if(page.tags.length){
            page.tags.sort()
            doe(td,'Tagged: ')
            isFirst=true
            page.tags.map(e=>{
                if(isFirst)
                    isFirst=false
                else
                    doe(td,', ')
                doe(td,page.blog._anchor_addTag({name:e}))
            })
        }
        return td
/*+(p.page_derived_from.length!=0?str_pages_derived_from:'')
+(p.page_derived_to.length!=0?str_pages_derived_to:'')*/
    }
}
export default createPrivacyTable
