async function setupProgress(a){
    let p=new Progress(a),v=p.view
    let style=Object.assign(document.createElement('style'),{
        textContent:Progress.style
    })
    doe.head(style)
    doe.body(v.node)
    await p.complete
    await new Promise(rs=>setTimeout(rs,2*p._animationDelay))
    doe.head(1,style)
    doe.body(1,v.node)
    v.free
}
export default setupProgress
