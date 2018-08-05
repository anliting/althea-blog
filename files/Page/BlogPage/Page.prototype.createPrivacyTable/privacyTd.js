import {doe,order}from '/lib/core.static.js'
function privacyTd(page){
    return doe.td(span_privacy())
    function span_privacy(){
        let span=doe.span(span=>{span.style.fontStyle='italic'})
        let a=[
            (async()=>{
                let site=await page.blog._site
                let u=await site.getUser(page.authorId)
                return span.appendChild(await u.a)
            })(),
            document.createTextNode(' '),
            dateSpan(),
        ]
        if(!page.ispublic){
            a.push(document.createTextNode(' '))
            a.push(privateSpan())
        }
        order(
            a,
            span.insertBefore.bind(span),
            span.appendChild.bind(span)
        )
        return span
        function dateSpan(){
            let span=doe.span(
                dateToString(new Date(page.timestamp_insert))
            )
            span.title=`Last modified: ${
                page.datetime_lastmodified
            }`
            return span
        }
        function privateSpan(){
            return doe.span('private')
        }
        function dateToString(d){
            return`${d.getFullYear()}-${1+d.getMonth()}-${
                d.getDate()
            }`
        }
        /*` ${page.content.length}Bytes.`*/
    }
}
export default privacyTd
