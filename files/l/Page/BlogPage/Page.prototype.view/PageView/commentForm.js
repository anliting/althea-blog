(async()=>{
    let dom=await module.repository.althea.dom
    return page=>{
        let form=dom('form',
            page.textarea_comment__form_comment,
            dom('br'),
            page.input_submit__form_comment
        )
        form.className='form_newcomment'
        form.onsubmit=async e=>{
            e.preventDefault()
            e.stopPropagation()
            await page.blog._site.then(site=>
                site.send({
                    function:'newComment',
                    page:page.id,
                    content:page.textarea_comment__form_comment.value,
                })
            )
            page.blog.status=page.blog.status
        }
        return form
    }
})()
