export default site=>{
    function calcPathByStatus(status){
        if('pageId' in status)
            return site.path.blog.page(status.pageId)
        if('tagNames' in status)
            return site.path.blog.tag(status.tagNames)
        return site.path.blog.root
    }
    function getHrefByPage(page){
        return site.path.blog.page(page.id)
    }
    function getHrefByTags(tags){
        return site.path.blog.tag(tags)
    }
    return{
        calcPathByStatus,
        getHrefByPage,
        getHrefByTags,
    }
}
