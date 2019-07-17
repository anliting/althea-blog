import commentForm from './PageView/commentForm.js'
import commentDiv from './PageView/commentDiv.js'
import{doe,EventEmmiter}from'/lib/core.static.js'
function PageView(page){
    EventEmmiter.call(this)
    this.domElement=createDiv(this,page)
}
Object.setPrototypeOf(PageView.prototype,EventEmmiter.prototype)
function createDiv(pageView,page){
    let
        div=doe.div(),
        isfirst
    pageView.hide=!page.ispublic&&!page.blog.status.pageId
    div.className='post'
    page.div=div
    page.blog.pages_loaded.push(page.id)
    // tags
    let contentDiv=div_blog_content(pageView,page)
    pageView.on('clickHideshow',()=>{
        if(pageView.hide){
            contentDiv.style.display=''
            pageView.hide=0
        }else{
            contentDiv.style.display='none'
            pageView.hide=1
        }
    })
    div.appendChild(page.h1_title())
    div.appendChild(page.div_author=    page.createAuthorDiv())
    div.appendChild(page.div_date=      page.createDateDiv())
    div.appendChild(
        page.table_privacy=page.createPrivacyTable(pageView)
    )
    div.appendChild(contentDiv)
    div.appendChild(div_facebooklike(page))
    page.blog.isFacebookLoaded&&FB.XFBML.parse(div)
    ;(async()=>{
        let site=await page.blog._site
        let p=await site.getPage(page.id)
        await p.load('comments')
        let comments=p.comments
        await Promise.all(
            comments.map(comment=>
                div.appendChild(
                    commentDiv(page,site.getComment(comment))
                )
            )
        )
        div.appendChild(commentForm(page))
    })()
    return div
}
function div_blog_content(pageView,page){
    let
        div=doe.div({
            id:'blog_content_'+page.id,
            className:'content',
            innerHTML:
                page.id_pagemodule?
                    page.blog.pagemodules[
                        page.id_pagemodule-1
                    ].compile(page.content)
                :
                    page.content
            ,
        })
    div.style.display=pageView.hide?'none':'block'
    for(let s of div.getElementsByTagName('script'))
        if(s.type=='')
            eval(s.innerHTML)
    page.blog.addPageDiv(div)
    return div
}
function div_facebooklike(page){
    let div=doe.div({className:'fb-like'})
    div.setAttribute(
        'data-href','https://anliting.com/'+page.id
    )
    div.setAttribute('data-layout','standard')
    div.setAttribute('data-action','like')
    div.setAttribute('data-show-faces','true')
    div.setAttribute('data-share','true')
    return div
}
export default PageView
/*
    // derived from
    let str_pages_derived_from='Derived from: '
    isfirst=1
    page.page_derived_from.map(q=>{
        if(!isfirst)
            str_pages_derived_from+=', '
        str_pages_derived_from+='<a href='+q.id+'>'
            +html.encodeText(q.title)
            +'</a>'
        isfirst=0
    })
    str_pages_derived_from+='<br>'
    // end derived from
    // derived to
    let str_pages_derived_to='Derived to: '
    isfirst=1
    page.page_derived_to.map(q=>{
        if(!isfirst)
            str_pages_derived_to+=', '
        str_pages_derived_to+='<a href="'+q.id+'">'
            +html.encodeText(q.title)
            +'</a>'
        isfirst=0
    })
    str_pages_derived_to+='<br>'
    // end derived to
*/
