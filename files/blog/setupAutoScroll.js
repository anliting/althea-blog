function setupAutoScroll(blog){
    let
        period=16,
        speed=0.025,
        dy=0,
        isAutoScrollStarted=false,
        timeoutIdAutoScroll
    document.body.addEventListener('keydown',e=>{
        if(!isAutoScrollStarted){
            isAutoScrollStarted=true
            timeoutIdAutoScroll=setTimeout(autoScroll,0)
        }
        if(
            0<=
            [
                'INPUT',
                'TEXTAREA',
            ].indexOf(
                document.activeElement.tagName
            )
        )
            return
        if(!e.ctrlKey&&!e.shiftKey){
            if(handle())
                pdAndSp()
        }else if(!e.ctrlKey&&e.shiftKey){
            if(handleShift())
                pdAndSp()
        }
        function pdAndSp(){
            e.preventDefault()
            e.stopPropagation()
        }
        function handle(){
            if(e.keyCode==67){ // c
                ;(async()=>{
                    let u=await blog._currentUser
                    u.isadmin&&(location='blog-control-panel')
                })()
            }else if(e.keyCode==71) // g
                dy=-document.body.scrollHeight
            else if(e.keyCode==74) // j
                dy=speed*innerHeight
            else if(e.keyCode==75) // k
                dy=-speed*innerHeight
            else if(e.keyCode==77) // m
                blog.navigationbar.toggle()
            else if(e.keyCode==78){ // n
                ;(async()=>{
                    let u=await blog._currentUser
                    u.isadmin&&(location='newpage')
                })()
            }else if(e.keyCode==80){ // p
                print()
            }else if(e.keyCode==82){ // r
                location='user'
            }else
                return false
            return true
        }
        function handleShift(){
            if(e.keyCode==71) // G
                dy=document.body.scrollHeight
            else if(e.keyCode==74){ // J
                let x=Infinity
                Object.keys(blog.pages).map(i=>{
                    let e=blog.pages[i]
                    if(!e.div)
                        return
                    if(
                        1<e.div.getBoundingClientRect().top
                    )
                        x=Math.min(
                            x,
                            e.div.getBoundingClientRect().top
                        )
                })
                if(x!==Infinity)
                    document.body.scrollTop+=x
            }else if(e.keyCode==75){ // K
                let x=-Infinity
                Object.keys(blog.pages).map(i=>{
                    let e=blog.pages[i]
                    if(!e.div)
                        return
                    if(
                        e.div.getBoundingClientRect().top<0
                    )
                        x=Math.max(
                            x,
                            e.div.getBoundingClientRect().top
                        )
                })
                if(x!==-Infinity)
                    document.body.scrollTop+=x
            }else if(e.keyCode==78){ // N
                open('newpage','_blank').focus()
            }else if(e.keyCode==80){ // P
                let originalTitle=document.title
                document.title+='.html'
                print()
                document.title=originalTitle
            }else
                return false
            return true
        }
    })
    document.body.addEventListener('keyup',e=>{
        resetAutoScroll()
    })
    function autoScroll(){
        scrollBy(0,dy)
        timeoutIdAutoScroll=setTimeout(autoScroll,period)
    }
    function resetAutoScroll(){
        dy=0
        clearTimeout(timeoutIdAutoScroll)
        isAutoScrollStarted=false
    }
}
export default setupAutoScroll
