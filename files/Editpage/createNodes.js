import{arg,doe}from'/lib/core.static.js'
export default function(){
    this._nodes={}
    this._nodes.main=doe.div({className:'main'},
        this._nodes.table_content=doe.table(
            doe.tr(doe.td(
                this._nodes.select_id_pagemodule=doe.select(
                    doe.option(
                        {value:0},
                        'No Pagemodule',
                    ),
                ),' ',
                this._nodes.select_privacy=doe.select(
                    doe.option({value:0},'Hidden'),
                    doe.option({value:1},'Private'),
                    doe.option({value:2},'Unlisted'),
                    doe.option({value:3},'Public'),
                ),' ',
                this._nodes.button_save=doe.button('Save'),' ',
                this._nodes.button_submit=doe.button('Submit'),' ',
            )),
            doe.tr(doe.td(
                this._nodes.span_tags=doe.span(),
                this._nodes.input_newtag=doe.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Tag ...',
                    disabled:true,
                },n=>{
                    n.setAttribute('list',this._datalistId)
                }),
            )),
            doe.tr(doe.td(
                this._nodes.span_names=doe.span(),
                this._nodes.input_newname=doe.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Name ...',
                    disabled:true,
                }),
            )),
            doe.tr(doe.td(
                this._nodes.input_title=doe.input({
                    className:'title',
                    type:'text',
                    placeholder:'Title',
                    disabled:true,
                }),
            )),
            doe.tr(doe.td(
                doe.button(
                    {onclick:e=>{
                        e.preventDefault()
                        this.changeEditor('html')
                    }},
                    'HTML'
                ),' ',
                ...(arg.h?[
                    doe.button(
                        {onclick:e=>{
                            e.preventDefault()
                            this.changeEditor('htmleditor')
                        }},
                        'WYSIWYG'
                    ),' ',
                ]:[]),
                doe.button(
                    {onclick:e=>{
                        e.preventDefault()
                        this.changeEditor('preview')
                    }},
                    'Preview'
                ),
            )),
            doe.tr(doe.td({className:'contentTc'},
                this._nodes.div_textarea_content=doe.div(
                    {className:'content'},
                    this._nodes.textarea_content=doe.textarea({
                        disabled:true
                    }),
                ),
                this._nodes.div_htmleditor=doe.div(
                    {className:'htmleditor'},
                    n=>{n.style.display='none'}
                ),
                this._nodes.div_preview=doe.div(
                    {className:'preview'},
                    n=>{n.style.display='none'}
                ),
            )),
        ),
        this._nodes.tags=doe.datalist({id:this._datalistId}),
    )
}
