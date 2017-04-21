function randomId(length){
    let res=''
    while(res.length<length)
        res+=Math.random().toString(36).slice(2)
    return 'a'+res
}
randomId
