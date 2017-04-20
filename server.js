let
    updateDatabase= require('./server/updateDatabase'),
    deleteComment=  require('./server/deleteComment'),
    getBlogFooter=  require('./server/getBlogFooter'),
    getDefinitionByPagemodule=require('./server/getDefinitionByPagemodule'),
    getPagemodules=require('./server/getPagemodules'),
    getPagemodules0=require('./server/getPagemodules0'),
    getSuggestedPages=require('./server/getSuggestedPages'),
    getSuggestedTags=require('./server/getSuggestedTags'),
    getTags=require('./server/getTags'),
    getTagsWithCount=require('./server/getTagsWithCount'),
    newComment=require('./server/newComment'),
    removePage=require('./server/removePage'),
    editpage=require('./server/editpage'),
    getComment=require('./server/getComment'),
    getPage=require('./server/getPage'),
    getPagemoduleInfo=require('./server/getPagemoduleInfo'),
    getPagesByTags=require('./server/getPagesByTags'),
    getPageversion=require('./server/getPageversion')
module.exports=async althea=>{
    althea.addQueryFunction('deleteComment',deleteComment)
    althea.addQueryFunction('getBlogFooter',getBlogFooter)
    althea.addQueryFunction(
        'getDefinitionByPagemodule',getDefinitionByPagemodule
    )
    althea.addQueryFunction('getPagemodules',getPagemodules)
    althea.addQueryFunction('getPagemodules0',getPagemodules0)
    althea.addQueryFunction('getSuggestedPages',getSuggestedPages)
    althea.addQueryFunction('getSuggestedTags',getSuggestedTags)
    althea.addQueryFunction('getTags',getTags)
    althea.addQueryFunction('getTagsWithCount',getTagsWithCount)
    althea.addQueryFunction('newComment',newComment)
    althea.addQueryFunction('removePage',removePage)
    althea.addQueryFunction('editpage',editpage)
    althea.addQueryFunction('getComment',getComment)
    althea.addQueryFunction('getPage',getPage)
    althea.addQueryFunction('getPagemoduleInfo',getPagemoduleInfo)
    althea.addQueryFunction('getPagesByTags',getPagesByTags)
    althea.addQueryFunction('getPageversion',getPageversion)
    await updateDatabase(althea)
}
