import{dom}from'/lib/core.static.js'
export default{
    newPageContentUi(
        getPagemodule,plugins,source,pagemoduleId
    ){
        if(pagemoduleId){
            let pagemodule=getPagemodule(pagemoduleId)
            source=pagemodule.compile(source)
        }
        let n=dom.div({innerHTML:source})
        plugins.map(f=>f(n))
        return n
    },
}
