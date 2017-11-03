import {dom}from '/lib/core.static.js'
function html_stars(rating){
    let output=''
    for(let i=0;i<5;i++){
        output+="<img src=images/"+(
            2*i+2<=rating?
                'star-full'
            :2*i+1<=rating?
                'star-half'
            :
                'star-empty'
        )+".png style=width:18px>"
    }
    return output
}
function tableofcontents(e){
    let
        id_page=e.parentNode.id.substr(13,e.parentNode.id.length),
        s=[0],
        v,
        a
    v=e
    a=e.parentNode.getElementsByClassName('tablethis')
    for(let i=0;i<a.length;i++){
        let p=a[i]
        p.id='h'+id_page+'_'+i
        let r=+p.tagName[1]
        while(s[s.length-1]>r){
            s.pop()
            v=v.parentNode.parentNode
        }
        if(s[s.length-1]==r)
            v=v.parentNode
        if(s[s.length-1]<r){
            s.push(r)
            v.appendChild(dom.ul())
            v=v.lastChild
        }
        v.appendChild(li(p))
        v=v.lastChild
    }
    function li(p){
        return dom.li(a_href(p))
    }
    function a_href(p){
        return dom.a({
            innerHTML:p.innerHTML,
            href:location.href+'#'+p.id,
        })
    }
}
function star_all(e){
    let a=e.getElementsByClassName('star')
    for(let i=0;i<a.length;i++){
        a[i].innerHTML=html_stars(a[i].innerHTML)
        a[i].style.visibility='visible'
    }
}
function tableofcontents_all(e){
    let a=e.getElementsByClassName('tableofcontents')
    for(let i=0;i<a.length;i++){
        tableofcontents(a[i])
        a[i].style.visibility='visible'
    }
}
export default({
    star_all,
    tableofcontents_all,
})
