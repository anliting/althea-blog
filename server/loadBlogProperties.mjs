import cutComment from
    './loadBlogProperties/cutComment.mjs'
import cutPage from
    './loadBlogProperties/cutPage.mjs'
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
import getPagesByTags from
    './loadBlogProperties/getPagesByTags.mjs'
import newPage from
    './loadBlogProperties/newPage.mjs'
import putComment from
    './loadBlogProperties/putComment.mjs'
import putTag from
    './loadBlogProperties/putTag.mjs'
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
import setPage from
    './loadBlogProperties/setPage.mjs'
import setPagenamesForPageById from
    './loadBlogProperties/setPagenamesForPageById.mjs'
export default db=>Object.assign(db,{
    cutComment,
    cutPage,
    getComment,
    getComments,
    getDefinitionByPagemodule,
    getTags,
    getTagsWithCount,
    getPage,
    getPagemodules,
    getPagesByTags,
    newPage,
    putComment,
    putTag,
    selectPagemoduleDefinitions,
    selectPagemoduleInfo,
    selectPagemodules,
    selectPages,
    selectTags,
    setPage,
    setPagenamesForPageById,
})
