---
title: win系统连接WSL2Mysql
date: 2025-07-14 18:12:34
updated: 2025-07-14 18:12:34
tags: [Mysql,WSL2]
categories: 技术
comments: false
toc: true
sticky: 4
description: 这是一篇关于WSL2的文章。
keywords: Hexo, Front Matter, 博客
author: zao_an
img: /images/hello-world.jpg
mathjax: true
---

# 在win系统下连接WSL2中的Mysql

### WSL2安装mysql
~~~
# 更新apt-get工具
sudo apt-get upgrade
 
# 安装mysql
sudo apt-get install mysql-server
 
# 开启mysql服务
sudo service mysql start
 
# 查看mysql是否运行
sudo service mysql status
 
~~~

#### 设置Mysql密码

~~~
# 登录 Mysql 
sudo mysql
 
# 更改密码，替换新密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
 
# 刷新权限
FLUSH PRIVILEGES;
 
# 退出
exit;
 
# 登录 Mysql “-u root” 是用root用户登录 “-p”是需要输入密码
sudo mysql -u root -p
~~~

#### vim修改mysql配置

~~~
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
~~~

#### 找到bind-address修改成下面这种允许所有IP连接
~~~
bind-address = 0.0.0.0
~~~

#### 然后修改端口号port

~~~
port = 3390 #只要不冲突你win系统下面的端口号就行

#如果冲突使用下面linux和win命令检测端口是否被占用，如果占用换端口。
#注：一定要win系统和linux的3390端口都没有被占用

sudo netstat -tulnp | grep 3390  # Linux
netstat -ano | findstr 3390
~~~

#### 重启mysql服务

~~~
sudo systemctl restart mysql  
~~~

#### 去win系统的cmd窗口下面重启WSL2服务

~~~
wsl --shutdown #重启WSL2服务
wsl ~ #进入linux系统
~~~

#### 连接数据库

~~~
#使用本地ip
127.0.0.1
#端口使用3390
3390

~~~

#### 下面是win系统中运行的3390端口指向WSL2中的Linux

*   TCP    127.0.0.1:3390         0.0.0.0:0              LISTENING       28312
