function validPageData(env,opt){
    let type=env.althea.lib.anliting.type
    return opt instanceof Object&&
        typeof opt.ispublic=='boolean'&&
        typeof opt.id_pagemodule=='number'&&
        typeof opt.title=='string'&&
        typeof opt.content=='string'&&
        type.isArray(type.isStringValue)(opt.tags)
}
export default validPageData
