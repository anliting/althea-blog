(async()=>{
    let dom=await module.repository.althea.dom
    function setup(){
        let
            page=this,
            a_comment,
            textarea_comment__form_comment
        a_comment=dom('a')
        a_comment.className='a_comment functionbutton'
        a_comment.href='javascript:'
        a_comment.innerHTML='<i class=material-icons>comment</i>'
        a_comment.onclick=()=>{
            $&&$('html,body').animate({
                scrollTop:
                    $(textarea_comment__form_comment).offset().top+
                        80-$(window).height()
            },320)
            textarea_comment__form_comment.focus()
        }
        textarea_comment__form_comment=dom('textarea')
        textarea_comment__form_comment.className='textarea_comment'
        textarea_comment__form_comment.name='content'
        textarea_comment__form_comment.placeholder='Comment ...'
        textarea_comment__form_comment.addEventListener('focus',()=>{
            page.input_submit__form_comment.style.display='inline'
        })
        this.a_comment=a_comment
        this.textarea_comment__form_comment=textarea_comment__form_comment
        this.input_submit__form_comment=input_submit__form_comment()
        function input_submit__form_comment(){
            let input_submit__form_comment=dom('input')
            input_submit__form_comment.className='input_comment_submit'
            input_submit__form_comment.type='submit'
            input_submit__form_comment.value='Submit'
            input_submit__form_comment.style.display='none'
            return input_submit__form_comment
        }
    }
    return setup
})()
