(async()=>{
    let dom=await module.repository.althea.dom
    let
        str_show='<i class=material-icons>expand_more</i>',
        str_hide='<i class=material-icons>expand_less</i>'
    function createHideShowA(page,pageView){
        let a_hideshow=dom('a')
        a_hideshow.className='a_hideshow functionbutton'
        a_hideshow.href='javascript:'
        a_hideshow.innerHTML=pageView.hide?str_show:str_hide
        a_hideshow.onclick=()=>{
            pageView.emit('clickHideshow')
            a_hideshow.innerHTML=
                pageView.hide?str_show:str_hide
        }
        return a_hideshow
    }
    return createHideShowA
})()
