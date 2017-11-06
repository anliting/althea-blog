import{dom}from'/lib/core.static.js'
export default function(){
    this._nodes={}
    this._nodes.main=dom.div({className:'main'},
        this._nodes.table_content=dom.table(
            dom.tr(dom.td(
                this._nodes.select_id_pagemodule=dom.select(
                    dom.option(
                        {value:0},
                        'No Pagemodule',
                    ),
                ),' ',
                this._nodes.select_privacy=dom.select(
                    dom.option({value:0},'Hidden'),
                    dom.option({value:1},'Private'),
                    dom.option({value:2},'Unlisted'),
                    dom.option({value:3},'Public'),
                ),' ',
                this._nodes.button_save=dom.button('Save'),' ',
                this._nodes.button_submit=dom.button('Submit'),' ',
            )),
            dom.tr(dom.td(
                this._nodes.span_tags=dom.span(),
                this._nodes.input_newtag=dom.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Tag ...',
                    disabled:true,
                },n=>{
                    n.setAttribute('list',this._datalistId)
                }),
            )),
            dom.tr(dom.td(
                this._nodes.span_names=dom.span(),
                this._nodes.input_newname=dom.input({
                    className:'setFormInput',
                    type:'text',
                    placeholder:'Name ...',
                    disabled:true,
                }),
            )),
            dom.tr(dom.td(
                this._nodes.input_title=dom.input({
                    className:'title',
                    type:'text',
                    placeholder:'Title',
                    disabled:true,
                }),
            )),
            dom.tr(dom.td(
                this._nodes.showHtmlA=dom.a({href:'javascript:'},'HTML'),' | ',
                this._nodes.htmlEditorA=dom.a({href:'javascript:'},'WYSIWYG (experimental)'),' | ',
                this._nodes.previewA=dom.a({href:'javascript:'},'Preview (experimental)'),
            )),
            dom.tr(dom.td({className:'contentTc'},
                this._nodes.div_textarea_content=dom.div(
                    {className:'content'},
                    this._nodes.textarea_content=dom.textarea({disabled:true}),
                ),
                this._nodes.div_htmleditor=dom.div(
                    {className:'htmleditor'},
                    n=>{n.style.display='none'}
                ),
                this._nodes.div_preview=dom.div(
                    {className:'preview'},
                    n=>{n.style.display='none'}
                ),
            )),
        ),
        this._nodes.tags=dom.datalist({id:this._datalistId}),
    )
}
