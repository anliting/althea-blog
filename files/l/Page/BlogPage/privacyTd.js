;(async()=>{
    let[
        dom,
        order,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.repository.althea.order,
    ])
    return privacyTd
    function privacyTd(page){
        return dom.td(span_privacy())
        function span_privacy(){
            let span=dom.span(span=>{span.style.fontStyle='italic'})
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
                let span=dom.span(
                    dateToString(new Date(page.timestamp_insert))
                )
                span.title=`Last modified: ${
                    page.datetime_lastmodified
                }`
                return span
            }
            function privateSpan(){
                return dom.span('private')
            }
            function dateToString(d){
                return`${d.getFullYear()}-${1+d.getMonth()}-${
                    d.getDate()
                }`
            }
            /*` ${page.content.length}Bytes.`*/
        }
    }
})()
