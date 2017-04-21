module.exports=calcContent
function calcContent(env){
    return`
<!doctype html>
<title>Althea</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<div id=div_main>
    <table id=table_content>
        <tr><td style=height:32px>
        <tr><td>
            <select id=select_id_pagemodule>
            </select>
            <select id=select_privacy>
                <option value=0>Hidden</option>
                <option value=1>Private</option>
                <option value=3>Unlisted</option>
                <option value=2>Public</option>
            </select>
            <button id=button_save>Save</button> 
            <button id=button_submit>Submit</button>
            <span id=span_graphvisualizer>
             | 
            <a href=plugins/graphvisualizer/visualizer.html>
                Graph Visualizer
            </a>
            </span>
        <tr id=tr_tags><td>
            <span id=span_tags></span>
            <input 
                id=input_newtag
                type=text
                list=tags
                placeholder='Tag ...'
                disabled
            >
        <tr id=tr_names><td>
            <span id=span_names></span>
            <input 
                id=input_newname
                type=text
                placeholder='Name ...'
                disabled
            >
        <tr><td>
            <input 
                id=input_title
                type=text
                placeholder=Title
                disabled
            >
        <tr><td>
            <a id=showHtmlA href=javascript:>HTML</a> |
            <a id=htmlEditorA href=javascript:>WYSIWYG (experimental)</a> |
            <a id=previewA href=javascript:>Preview (experimental)</a>
        <tr><td id=td_content>
            <div id=div_textarea_content>
                <textarea 
                    id=textarea_content
                    disabled
                ></textarea>
            </div>
            <div 
                id=div_htmleditor style=display:none
            ></div>
            <div 
                id=div_preview style=display:none
            ></div>
    </table>
</div>
<datalist id=tags></datalist>
${env.althea.loadModule(
    env.envVars,
    'plugins/althea-blog/editpage.static.js',
    {
        editpageEnv:{
            id_page:env.id_page,
        }
    }
)}
    `
}
