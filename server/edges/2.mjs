export default async db=>{
    await Promise.all([
        db.query(`
            create table blog_user_map (
                user int not null,
                \`key\` varchar(64) not null,
                value text not null,
                primary key (user,\`key\`)
            )
        `),
    ])
    return 3
}
