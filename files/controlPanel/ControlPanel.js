import{dom}from'/lib/core.static.js'
import TagsPage from './TagsPage.js'
import style from './style.js'
function createTagsPage(){
    let tagsPage=new TagsPage
    tagsPage.initialize()
    return dom.div(
        dom.div({className:'material menu'},
            dom.div(
                {
                    className:'out',
                    onclick:()=>{
                        this.out()
                    }
                },
                'Tags',
            )
        ),
        dom.div(
            {className:'material'},
            n=>{n.style.marginTop='16px'},
            tagsPage.mainDiv,
        ),
    )
}
function ControlPanel(){
    this.array=[]
    this.ui=dom.div({className:'controlPanel'},
        dom.h2('Blog Control Panel'),
    )
    this.in(dom.div({className:'material menu'},
        dom.div({
            className:'in',
            onclick:()=>{
            },
        },'Site'),
        dom.div({
            className:'in',
            onclick:()=>{
                this.in(createTagsPage.call(this))
            },
        },'Tags'),
    ))
}
ControlPanel.prototype.in=function(e){
    if(this.array.length)
        this.ui.removeChild(this.array[this.array.length-1])
    this.array.push(e)
    this.ui.appendChild(e)
}
ControlPanel.prototype.out=function(){
    if(!this.array.length)
        return
    this.ui.removeChild(this.array.pop())
    if(this.array.length)
        this.ui.appendChild(this.array[this.array.length-1])
}
ControlPanel.style=style
export default ControlPanel
