import{dom}from'/lib/core.static.js'
function createSiteNode(){
    return dom.div(
        dom.div({className:'material menu'},
            dom.div(
                {
                    className:'out',
                    onclick:()=>{
                        this.out()
                    }
                },
                'Site',
            )
        ),
        (async()=>{
            let
                data=await this.send('blog_getData'),
                title,
                description,
                bannerTitle,
                tagline,
                footer,
                og
            return dom.div(
                {className:'material content'},
                dom.p('Title: ',
                    title=dom.input({value:data.title})
                ),
                dom.p('Description: ',
                    description=dom.input({value:data.description})
                ),
                dom.p('Banner Title: ',
                    bannerTitle=dom.textarea(data.bannerTitle)
                ),
                dom.p('Tagline: ',
                    tagline=dom.textarea(data.tagline)
                ),
                dom.p('Footer: ',
                    footer=dom.textarea(data.footer)
                ),
                dom.p(
                    dom.label(
                        og=dom.input({type:'checkbox',checked:data.og}),
                        'Use open graph.',
                    ),
                ),
                dom.p(dom.button('Apply',{onclick:async()=>{
                    data.title=title.value
                    data.description=description.value
                    data.bannerTitle=bannerTitle.value
                    data.tagline=tagline.value
                    data.footer=footer.value
                    data.og=og.checked
                    await this.send({
                        function:'blog_setData',
                        data,
                    })
                    alert('Applied.')
                }})),
            )
        })(),
    )
}
export default createSiteNode
