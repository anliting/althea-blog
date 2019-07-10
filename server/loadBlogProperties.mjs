import deleteComment from
    './loadBlogProperties/deleteComment.mjs'
import getComment from
    './loadBlogProperties/getComment.mjs'
import getComments from
    './loadBlogProperties/getComments.mjs'
import getDefinitionByPagemodule from
    './loadBlogProperties/getDefinitionByPagemodule.mjs'
import getTags from
    './loadBlogProperties/getTags.mjs'
import getTagsWithCount from
    './loadBlogProperties/getTagsWithCount.mjs'
import getPage from
    './loadBlogProperties/getPage.mjs'
import getPagemodules from
    './loadBlogProperties/getPagemodules.mjs'
import getPageversion from
    './loadBlogProperties/getPageversion.mjs'
import getPagesByTags from
    './loadBlogProperties/getPagesByTags.mjs'
import getLastversionOfPage from
    './loadBlogProperties/getLastversionOfPage.mjs'
import newComment from
    './loadBlogProperties/newComment.mjs'
import newPage from
    './loadBlogProperties/newPage.mjs'
import newPageversion from
    './loadBlogProperties/newPageversion.mjs'
import newPageversionToPage from
    './loadBlogProperties/newPageversionToPage.mjs'
import selectPagemoduleDefinitions from
    './loadBlogProperties/selectPagemoduleDefinitions.mjs'
import selectPagemoduleInfo from
    './loadBlogProperties/selectPagemoduleInfo.mjs'
import selectPagemodules from
    './loadBlogProperties/selectPagemodules.mjs'
import selectPages from
    './loadBlogProperties/selectPages.mjs'
import selectTags from
    './loadBlogProperties/selectTags.mjs'
import setPagenamesForPageById from
    './loadBlogProperties/setPagenamesForPageById.mjs'
import removePage from
    './loadBlogProperties/removePage.mjs'
export default db=>Object.assign(db,{
    deleteComment,
    getComment,
    getComments,
    getDefinitionByPagemodule,
    getTags,
    getTagsWithCount,
    getPage,
    getPagemodules,
    getPageversion,
    getPagesByTags,
    getLastversionOfPage,
    newComment,
    newPage,
    newPageversion,
    newPageversionToPage,
    selectPagemoduleDefinitions,
    selectPagemoduleInfo,
    selectPagemodules,
    selectPages,
    selectTags,
    setPagenamesForPageById,
    removePage,
})
