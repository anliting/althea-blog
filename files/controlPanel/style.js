export default`
body{
    font-family:sans-serif;
    background-color:#eee;
}
body>.main{
    max-width:600px;
    margin:0 auto;
}
.controlPanel .material{
    background-color:#fff;
    box-shadow:0 1px 4px rgba(0,0,0,.4);
}
.controlPanel .material.menu>div{
    padding:16px;
}
.controlPanel .material.menu>div.out:before{
    content:'< ';
}
.controlPanel .material.menu>div.in:after{
    float:right;
    content:'>';
}
`
