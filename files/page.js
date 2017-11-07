export default{
    compile(pagemoduleId,source){
        if(pagemoduleId){
            let pagemodules=this.getPagemodules()
            source=pagemodules[pagemoduleId-1].compile(source)
        }
        return source
    },
}
