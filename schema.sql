create table t_user (
    id bigserial,
    status int,
    created bigint,
    name varchar(20),
    email text,
    passhash text,
    color char(6)
);

create unique index on t_user (id);
create unique index on t_user (name);
create unique index on t_user (email);

create table t_post (
    id bigserial,
    status int,
    created bigint,
    user_id bigint,
    body text,
    title text,
    urlstring text
);

create unique index on t_post (id);
create unique index on t_post (urlstring);

create table t_comment (
    id bigserial,
    status int,
    created bigint,
    user_id bigint,
    post_id bigint,
    parent_id bigint,
    body text
);

create unique index on t_comment (id);
create unique index on t_comment (post_id);
