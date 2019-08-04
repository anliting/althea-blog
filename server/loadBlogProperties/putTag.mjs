export default(cn,pageId,tagname)=>cn.query(`
    insert into blog_tag set ?
`,{
    pageId,
    tagname,
})
