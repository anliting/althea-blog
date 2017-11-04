import{dom}from'/lib/core.static.js'
function mdcTextdfield(name){
    let node,input
    node=dom.label(
        dom.span(n=>{n.style.color='#888'},`${name}: `),
        {className:`
            mdc-textfield
            mdc-textfield--fullwidth
        `},
        n=>{n.dataset.mdcAutoInit='MDCTextfield'},
        input=dom.input({className:'mdc-textfield__input',}),
        dom.div({className:'mdc-textfield__bottom-line'}),
    )
    return{node,input}
}
function mdcTextdfieldTextarea(name){
    let node,input
    node=dom.label(
        {className:`
            mdc-textfield
            mdc-textfield--fullwidth
            mdc-textfield--textarea
        `},
        n=>{n.dataset.mdcAutoInit='MDCTextfield'},
        input=dom.textarea({className:'mdc-textfield__input',rows:8}),
        dom.span({className:'mdc-textfield__label'},name),
    )
    return{node,input}
}
function createSiteNode(){
    return dom.div(
        (async()=>{
            let
                data=await this.send('blog_getData'),
                title=mdcTextdfield('Title'),
                description=mdcTextdfield('Description'),
                bannerTitle=mdcTextdfieldTextarea('Banner Title'),
                tagline=mdcTextdfieldTextarea('Tagline'),
                footer=mdcTextdfieldTextarea('Footer'),
                og
            title.input.value=data.title
            description.input.value=data.description
            bannerTitle.input.value=data.bannerTitle
            tagline.input.value=data.tagline
            footer.input.value=data.footer
            return dom.div(
                {className:'shadow content'},
                dom.p(title.node),
                dom.p(description.node),
                dom.p(bannerTitle.node),
                dom.p(tagline.node),
                dom.p(footer.node),
                dom.p(
                    dom.label(
                        og=dom.input({type:'checkbox',checked:data.og}),
                        'Use open graph.',
                    ),
                ),
                dom.p(dom.button('Apply',{onclick:async()=>{
                    data.title=title.input.value
                    data.description=description.input.value
                    data.bannerTitle=bannerTitle.input.value
                    data.tagline=tagline.input.value
                    data.footer=footer.input.value
                    data.og=og.checked
                    await this.send({
                        function:'blog_setData',
                        data,
                    })
                    alert('Applied.')
                }})),
                n=>{mdc.autoInit(n)},
            )
        })(),
    )
}
export default createSiteNode
