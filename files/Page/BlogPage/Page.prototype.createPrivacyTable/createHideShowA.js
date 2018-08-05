import{doe}from '/lib/core.static.js'
let
    str_show='<i class=material-icons>expand_more</i>',
    str_hide='<i class=material-icons>expand_less</i>'
function createHideShowA(page,pageView){
    let a_hideshow=doe.a({
        className:'a_hideshow functionbutton',
        href:'javascript:',
        innerHTML:pageView.hide?str_show:str_hide,
    })
    a_hideshow.onclick=()=>{
        pageView.emit('clickHideshow')
        a_hideshow.innerHTML=
            pageView.hide?str_show:str_hide
    }
    return a_hideshow
}
export default createHideShowA
