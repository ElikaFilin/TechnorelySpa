USE database_spa;
create table user_types
(
    id        tinyint unsigned unique,
    type_name varchar(20)
);
create TABLE `users`
(
    id           int unsigned     not null auto_increment primary key,
    email        varchar(60)      not null unique,
    password     varchar(40)      not null,
    phone        varchar(15)      not null,
    last_name    varchar(40)      not null,
    first_name   varchar(40)      not null,
    nickname     varchar(20)      not null unique,
    `desc`       text             not null,
    position     tinytext         not null,
    user_type_id tinyint unsigned not null,
    constraint u_type FOREIGN KEY (user_type_id) REFERENCES user_types (id)

);

create table `companies`
(
    id               int unsigned not null auto_increment primary key,
    name             varchar(100) not null,
    service_activity varchar(50)  not null,
    employee_no      int unsigned not null,
    `desc`           text         not null,
    type             varchar(40)  not null,
    user_id          int unsigned not null,
    constraint c_user FOREIGN KEY (user_id) REFERENCES users (id)

);
