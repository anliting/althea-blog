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
        dom.div(
            {className:'material content'},
            dom.p('Title: ',dom.input()),
            dom.p('Description: ',dom.input()),
            dom.p('Banner Title: ',dom.input()),
            dom.p('Tagline: ',dom.input()),
            dom.p('Footer: ',dom.input()),
            dom.p(dom.button('Apply')),
        ),
    )
}
export default createSiteNode
