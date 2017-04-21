module.exports=db=>{
    db.deleteComment=
        require('./loadBlogProperties/deleteComment')
    db.getComment=
        require('./loadBlogProperties/getComment')
    db.getDefinitionByPagemodule=
        require('./loadBlogProperties/getDefinitionByPagemodule')
    db.getTags=
        require('./loadBlogProperties/getTags')
    db.getTagsWithCount=
        require('./loadBlogProperties/getTagsWithCount')
    db.getPage=
        require('./loadBlogProperties/getPage')
    db.getPagemodules0=
        require('./loadBlogProperties/getPagemodules0')
    db.getPageversion=
        require('./loadBlogProperties/getPageversion')
    db.getPagesByTags=
        require('./loadBlogProperties/getPagesByTags')
    db.getLastversionOfPage=
        require('./loadBlogProperties/getLastversionOfPage')
    db.newComment=
        require('./loadBlogProperties/newComment')
    db.newPage=
        require('./loadBlogProperties/newPage')
    db.newPageversion=
        require('./loadBlogProperties/newPageversion')
    db.newPageversionToPage=
        require('./loadBlogProperties/newPageversionToPage')
    db.selectPagemoduleDefinitions=
        require('./loadBlogProperties/selectPagemoduleDefinitions')
    db.selectPagemoduleInfo=
        require('./loadBlogProperties/selectPagemoduleInfo')
    db.selectPagemodules=
        require('./loadBlogProperties/selectPagemodules')
    db.selectPages=
        require('./loadBlogProperties/selectPages')
    db.selectTags=
        require('./loadBlogProperties/selectTags')
    db.setPagenamesForPageById=
        require('./loadBlogProperties/setPagenamesForPageById')
    db.removePage=
        require('./loadBlogProperties/removePage')
}