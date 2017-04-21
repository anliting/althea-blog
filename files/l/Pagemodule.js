module.repository.althea.html.then(html=>{
    function Pagemodule(id,priority,name,definitions){
        this.id=id
        this.priority=priority
        this.name=name
        this.definitions=definitions
    }
    Pagemodule.prototype.compile=function(s){
        this.definitions.map(d=>{
            // data bug patch
            s=s||''
            s=s.split(d.name).join(d.content)
        })
        s=s.replace(/\[nothing\][\s\S]*?\[\/nothing\]/g,s=>{
            return ''
        }).replace(
            /\[ignorePluralSpaceCharacters\][\s\S]*?\[\/ignorePluralSpaceCharacters\]/g,
            s=>{
                return s.substring(
                    '[ignorePluralSpaceCharacters]'.length,
                    s.length-'[/ignorePluralSpaceCharacters]'.length
                ).replace(/ {2,}/g,'')
            }
        ).replace(
            /\[ignoreNewlineCharacters\][\s\S]*?\[\/ignoreNewlineCharacters\]/g,
            s=>{
                return s.substring(
                    '[ignoreNewlineCharacters]'.length,
                    s.length-'[/ignoreNewlineCharacters]'.length
                ).replace(/\n/g,'')
            }
        ).replace(/\[htmlentities\][\s\S]*?\[\/htmlentities\]/g,s=>{
            return html.encodeText(s.substring(14,s.length-15))
        }).replace(/\[sp2nbsp\][\s\S]*?\[\/sp2nbsp\]/g,s=>{
            return sp2nbsp(s.substring(9,s.length-10))
        }).replace(/\[nl2br\][\s\S]*?\[\/nl2br\]/g,s=>{
            return nl2br(s.substring(7,s.length-8))
        })
        return s
        function sp2nbsp(s){
            return s.split(' ').join('&nbsp;')
        }
        function nl2br(s){
            return s.split('\r\n').join('<br>')
        }
    }
    return Pagemodule
})
