(async()=>{
    let dom=await module.repository.althea.dom
    function SetForm(span_tags,input){
        this.tags=[]
        this.tagIdInTagsByName={}
        this.span_tags=span_tags
        this.input=input
    }
    SetForm.prototype.toArray=function(){
        let res=[]
        this.tags.map(t=>res.push(t.name))
        return res
    }
    SetForm.prototype.addTag=function(name){
        let
            setForm=this,
            tag=new Tag(name)
        setForm.tags.push(tag)
        setForm.tagIdInTagsByName[name]=setForm.tags.length-1
        setForm.span_tags.appendChild(tag.body)
        function Tag(name){
            let
                span_name=dom('span'),
                span=dom('span',
                    span_name,
                    ' ',
                    a()
                )
            span_name.innerHTML=name
            span.className='tag'
            this.body=span
            this.name=name
            function a(){
                let a=dom('a')
                a.onclick=()=>{
                    let id=setForm.tagIdInTagsByName[name]
                    setForm.tags[id]=setForm.tags[setForm.tags.length-1]
                    setForm.tagIdInTagsByName[setForm.tags[id].name]=id
                    delete setForm.tagIdInTagsByName[name]
                    setForm.tags.pop()
                    span.parentNode.removeChild(span)
                }
                a.href='javascript:'
                a.style.verticalAlign='middle'
                a.style.display='inline-block'
                a.innerHTML=
                    '<i class=material-icons style=font-size:16pt>remove</i>'
                return a
            }
        }
    }
    SetForm.prototype.onkeypress=function(e){
        let name=this.input.value
        if(
            e.key!='Enter'||
            this.input.value==''||
            this.tagIdInTagsByName[name]!==undefined
        )
            return
        e.stopPropagation()
        this.input.value=''
        this.addTag(name)
    }
    return SetForm
})()
