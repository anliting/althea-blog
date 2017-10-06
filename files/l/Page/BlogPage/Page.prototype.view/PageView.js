import html from '/lib/tools/html.js'
import dom from '/lib/tools/dom.js'
import commentForm from './PageView/commentForm.js'
import commentDiv from './PageView/commentDiv.js'
import EventEmmiter from 'https://gitcdn.link/cdn/anliting/simple.js/99b7ab1b872bc2da746dd648dd0c078b3bc6961e/src/simple/EventEmmiter.js'
function PageView(page){
    EventEmmiter.call(this)
    this.domElement=createDiv(this,page)
}
Object.setPrototypeOf(PageView.prototype,EventEmmiter.prototype)
function createDiv(pageView,page){
    let
        div=dom.div(),
        isfirst
    pageView.hide=!page.ispublic&&!page.blog.status.pageId
    div.className='post'
    page.div=div
    page.blog.pages_loaded.push(page.id)
    // tags
    let contentDiv=div_blog_content(pageView,page)
    pageView.on('clickHideshow',()=>{
        pageView.hide=!pageView.hide
        $&&$(contentDiv).toggle(320)
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
        div=dom.div({
            id:'blog_content_'+page.id,
            innerHTML:page.blog.pagemodules[
                page.id_pagemodule-1
            ].compile(page.content),
        })
    div.style.display=pageView.hide?'none':'block'
    for(let s of div.getElementsByTagName('script'))
        eval(s.innerHTML)
    page.blog.emit('pageContentLoad',div)
    page.blog.on('pageContentLoadListenerAdd',listener=>
        listener(div)
    )
    return div
}
function div_facebooklike(page){
    let div=dom.div({className:'fb-like'})
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
