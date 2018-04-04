import deleteComment from
    './loadBlogProperties/deleteComment'
import getComment from
    './loadBlogProperties/getComment'
import getComments from
    './loadBlogProperties/getComments'
import getDefinitionByPagemodule from
    './loadBlogProperties/getDefinitionByPagemodule'
import getTags from
    './loadBlogProperties/getTags'
import getTagsWithCount from
    './loadBlogProperties/getTagsWithCount'
import getPage from
    './loadBlogProperties/getPage'
import getPagemodules from
    './loadBlogProperties/getPagemodules'
import getPageversion from
    './loadBlogProperties/getPageversion'
import getPagesByTags from
    './loadBlogProperties/getPagesByTags'
import getLastversionOfPage from
    './loadBlogProperties/getLastversionOfPage'
import newComment from
    './loadBlogProperties/newComment'
import newPage from
    './loadBlogProperties/newPage'
import newPageversion from
    './loadBlogProperties/newPageversion'
import newPageversionToPage from
    './loadBlogProperties/newPageversionToPage'
import selectPagemoduleDefinitions from
    './loadBlogProperties/selectPagemoduleDefinitions'
import selectPagemoduleInfo from
    './loadBlogProperties/selectPagemoduleInfo'
import selectPagemodules from
    './loadBlogProperties/selectPagemodules'
import selectPages from
    './loadBlogProperties/selectPages'
import selectTags from
    './loadBlogProperties/selectTags'
import setPagenamesForPageById from
    './loadBlogProperties/setPagenamesForPageById'
import removePage from
    './loadBlogProperties/removePage'
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
