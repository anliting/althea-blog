({
    onceClickOrBlurButNotMouseDown(n,listener){
        let mousedown=false
        let l=e=>{
            if(mousedown)
                return
            n.removeEventListener('click',l)
            n.removeEventListener('blur',l)
            n.removeEventListener('mousedown',onmousedown)
            listener()
        },onmousedown=e=>{
            mousedown=true
            addEventListener('mouseup',e=>
                mousedown=false
            ,{once:true})
        }
        n.addEventListener('click',l)
        n.addEventListener('blur',l)
        n.addEventListener('mousedown',onmousedown)
    }
})
