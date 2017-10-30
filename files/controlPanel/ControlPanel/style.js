export default`
.controlPanel .material{
    background-color:#fff;
    box-shadow:0 1px 4px rgba(0,0,0,.4);
}
.controlPanel .material.menu>div{
    padding:16px;
}
.controlPanel .material.menu>div+div{
    border-top:1px solid #ddd;
}
.controlPanel .material.menu>div.out:before{
    margin-right:16px;
    content:'<';
}
.controlPanel .material.menu>div.in:after{
    float:right;
    content:'>';
}
.controlPanel .material.content{
    padding:16px;
}
.controlPanel .material.menu+.material.content{
    margin-top:16px;
}
`
