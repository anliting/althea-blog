import{doe}from'/lib/core.static.js'
function mdcRaisedButton(name){
    return doe.button(
        {className:'mdc-button mdc-button--raised'},
        name,
        n=>mdc.ripple.MDCRipple.attachTo(n),
    )
}
function mdcSwitch(name){
    let node,input
    node=doe.label(
        doe.span(
            {className:`mdc-switch`,},
            input=doe.input({
                type:'checkbox',
                className:'mdc-switch__native-control',
            }),
            doe.div({className:`mdc-switch__background`},
                doe.div({className:`mdc-switch__knob`}),
            ),
        ),
        ` ${name}`,
    )
    return{node,input}
}
function mdcTextdfield(name){
    let node,input
    node=doe.div(
        doe.span(n=>{n.style.color='#888'},`${name}: `),
        doe.div(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
            `},
            input=doe.input({className:'mdc-textfield__input',}),
            doe.div({className:'mdc-textfield__bottom-line'}),
            n=>mdc.textfield.MDCTextfield.attachTo(n),
        )
    )
    return{node,input}
}
function mdcTextdfieldTextarea(name){
    let node,input
    node=doe.label(
        doe.span(n=>{n.style.color='#888'},`${name}: `),
        doe.span(
            {className:`
                mdc-textfield
                mdc-textfield--fullwidth
                mdc-textfield--textarea
            `,},
            input=doe.textarea({className:'mdc-textfield__input',rows:8}),
        ),
    )
    return{node,input}
}
function createSiteNode(){
    return doe.div(
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
            return doe.div(
                {className:'shadow content'},
                doe.p(title.node),
                doe.p(description.node),
                doe.p(bannerTitle.node),
                doe.p(tagline.node),
                doe.p(footer.node),
                doe.p(og.node),
                doe.p(
                    doe(apply,{onclick:async()=>{
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
