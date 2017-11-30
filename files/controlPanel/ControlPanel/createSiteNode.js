import{dom}from'/lib/core.static.js'
function mdcRaisedButton(name){
    return dom.button(
        {className:'mdc-button mdc-button--raised'},
        name,
        n=>mdc.ripple.MDCRipple.attachTo(n),
    )
}
function mdcSwitch(name){
    let node,input
    node=dom.label(
        dom.span(
            {className:`mdc-switch`,},
            input=dom.input({
                type:'checkbox',
                className:'mdc-switch__native-control',
            }),
            dom.div({className:`mdc-switch__background`},
                dom.div({className:`mdc-switch__knob`}),
            ),
        ),
        ` ${name}`,
    )
    return{node,input}
}
function mdcTextdfield(name){
    let node,input
    node=dom.div(
        dom.span(n=>{n.style.color='#888'},`${name}: `),
        dom.div(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
            `},
            input=dom.input({className:'mdc-textfield__input',}),
            dom.div({className:'mdc-textfield__bottom-line'}),
            n=>mdc.textfield.MDCTextfield.attachTo(n),
        )
    )
    return{node,input}
}
function mdcTextdfieldTextarea(name){
    let node,input
    node=dom.label(
        dom.span(n=>{n.style.color='#888'},`${name}: `),
        dom.span(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
                mdc-textfield--textarea
            `,},
            input=dom.textarea({className:'mdc-textfield__input',rows:8}),
        ),
    )
    return{node,input}
}
function createSiteNode(){
    return dom.div(
        (async()=>{
            let
                data=await this._io.getData(),
                title=      mdcTextdfield('Title'),
                description=mdcTextdfield('Description'),
                bannerTitle=mdcTextdfieldTextarea('Banner Title (HTML)'),
                tagline=    mdcTextdfieldTextarea('Tagline (HTML)'),
                footer=     mdcTextdfieldTextarea('Footer (HTML)'),
                og=         mdcSwitch('Use open graph.'),
                apply=      mdcRaisedButton('Apply')
            title.input.value=data.title
            description.input.value=data.description
            bannerTitle.input.value=data.bannerTitle
            tagline.input.value=data.tagline
            footer.input.value=data.footer
            og.input.checked=data.og
            return dom.div(
                {className:'shadow content'},
                dom.p(title.node),
                dom.p(description.node),
                dom.p(bannerTitle.node),
                dom.p(tagline.node),
                dom.p(footer.node),
                dom.p(og.node),
                dom.p(
                    dom(apply,{onclick:async()=>{
                        data.title=title.input.value
                        data.description=description.input.value
                        data.bannerTitle=bannerTitle.input.value
                        data.tagline=tagline.input.value
                        data.footer=footer.input.value
                        data.og=og.input.checked
                        await this._io.setData(data)
                        alert('Applied.')
                    }})
                ),
            )
        })(),
    )
}
export default createSiteNode
