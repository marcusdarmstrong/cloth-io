create table t_user (
    id bigserial not null,
    status int not null default 0,
    created bigint not null default (extract('epoch' from now())),
    name varchar(20) not null,
    email text not null,
    passhash text not null,
    color char(6) not null
);

create unique index on t_user (id);
create unique index on t_user (name);
create unique index on t_user (email);

create table t_post (
    id bigserial not null,
    status int not nulldefault 0,
    created bigint not null default (extract('epoch' from now())),
    user_id bigint not null,
    body text not null,
    title text not null,
    urlstring text not null,
    url text default null
);

create unique index on t_post (id);
create unique index on t_post (urlstring);

create table t_comment (
    id bigserial not null,
    status int not null default 0,
    created bigint not null default (extract('epoch' from now())),
    user_id bigint not null,
    post_id bigint not null,
    parent_id bigint null,
    body text not null
);

create unique index on t_comment (id);
create index on t_comment (post_id);
