delete from definitions_pagemodules;
alter table definitions_pagemodules auto_increment=1;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='\\(',
    content='\\([htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='\\)',
    content='[/htmlentities]\\)'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#{',
    content='[nl2br][sp2nbsp][htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#}',
    content='[/htmlentities][/sp2nbsp][/nl2br]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#(',
    content='[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#)',
    content='[/htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='@[',
    content='[nothing]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='@]',
    content='[/nothing]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#cpp<',
    content='<span class=highlighted_cpp>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#tex<',
    content='<span lang=latex>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#hltex<',
    content='<span class=highlighted_tex>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#htm<',
    content='<span class=highlighted_html>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#txt<',
    content='<span style=font-family:monospace>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#com<',
    content='<span style=display:none>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#php<',
    content='<span class=highlighted_php>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#str<',
    content='<span class=star>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#graph<',
    content='<span class=graphvisualizer>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#js<',
    content='<span class=highlighted_js>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#>',
    content='[/htmlentities]</span>'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#tex[',
    content='<div class="bordered highlighted_tex" style="visibility:hidden;">[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#cpp[',
    content='<div class="bordered highlighted_cpp" style="visibility:hidden;">[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#htm[',
    content='<div class="bordered highlighted_html" style="visibility:hidden;">[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#txt[',
    content='<div class="bordered"><span>[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#js[',
    content='<div class="bordered highlighted_js" style="visibility:hidden">[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#php[',
    content='<div class="bordered highlighted_php" style="visibility:hidden">[htmlentities]'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#]',
    content='[/htmlentities]</div>'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='@{',
    content='<div style="position:relative;float:left;left:50%;"><div style="position:relative;float:left;left:-50%;">'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='@}',
    content='</div></div><div style="clear:both"></div>'
;
insert into definitions_pagemodules set
    id_pagemodule=2,
    name='#toc#',
    content='<div class="tableofcontents"></div>'
;
