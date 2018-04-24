async function pagemodule(db){
    await db.query(`
        create table pagemodule (
            id int not null auto_increment,
            priority int not null,
            name char(128) not null,
            header text not null,
            footer text not null,
            primary key (id)
        )
    `)
    db.query(`
        insert into pagemodule set
            priority=0,
            name='Default'
    `)
}
export default async db=>{
    await Promise.all([
        db.query(`
            create table comment (
                id int not null auto_increment,
                \`timestamp_insert\` timestamp not null
                    default current_timestamp,
                id_page int not null,
                id_user_owner int not null,
                ispermited bool not null,
                content text not null,
                primary key (id)
            )
        `),
        db.query(`
            create table definition (
                id int not null auto_increment,
                id_pagemodule int not null,
                level int not null,
                name varchar(128) not null,
                content text not null,
                primary key (id)
            )
        `),
        db.query(`
            create table page (
                id int not null auto_increment,
                timestamp_insert timestamp not null
                    default current_timestamp,
                timestamp_lastmodified timestamp not null
                    default current_timestamp
                    on update current_timestamp,
                isremoved bool not null,
                ispublic bool not null,
                id_user_author int not null,
                id_lastversion int not null,
                preferredPagename varchar(128) not null,
                primary key (id)
            )
        `),
        pagemodule(db),
        db.query(`
            create table pagename (
                id int not null auto_increment,
                id_page int not null,
                pagename varchar(128) not null,
                primary key (id)
            )
        `),
        db.query(`
            create table pageversion (
                id int not null auto_increment,
                timestamp_insert timestamp not null
                    default current_timestamp,
                ispublic bool not null,
                isremoved bool not null,
                id_page int not null,
                id_user_author int not null,
                id_pagemodule int not null,
                title tinytext not null,
                content mediumtext not null,
                primary key (id)
            )
        `),
        db.query(`
            create table tag (
                id int not null auto_increment,
                id_pageversion int not null,
                tagname varchar(128) not null,
                primary key (id)
            )
        `),
    ])
    return 1
}
