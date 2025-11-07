---
title: Docker快速入门
date: 2025-07-17 09:42:58
updated: 2025-07-17 09:42:58
tags: [Docker]
categories: 技术
comments: false
toc: true
sticky: 100
description: 这是一篇关于Docker快速入门的文章。
keywords: Hexo, Front Matter, 博客
author: zao_an
img: /images/hello-world.jpg
mathjax: true
---

# Docker快速入门

## Docker的基本组成

* **镜像（image）：**
  * docker镜像就好比是一个模版，可以通过这个模板来创建容器服务，tomcat镜像 ==> run ==> tomcat01 容器（提供服务器），通过这个镜像可以创建多个容器（最终服务运行或者项目运行就是在容器中的）。

* **容器（container）：**
  * Docker 利用容器技术，独立运行或者一个组应用通过镜像来创建的。
  * 启动，停止，删除，基本命令！
  * 目前就可以把这个容器理解为就是一个简易的linux系统。
* **仓库（repository）：**
  * 创库就是存放镜像的地方！
  * 仓库分为公有仓库和私有仓库！
  * Docker Hub（默认是国外的）
  * 阿里云...等等都有容器服务器（配置镜像加速！）

## 安装Docker

> 环境准备

1、需要会一点点的Linux的基础

2、Ubuntu 20.04.6 LTS

3、我们使用Xshell连接远程服务器进行操作！

> 环境查看

~~~shell
# 系统内核是5.15以上
zaoan@ubuntu:/$ uname -r
5.15.0-139-generic
~~~

~~~shell
# 系统版本
zaoan@ubuntu:/$ cat /etc/os-release 
NAME="Ubuntu"
VERSION="20.04.6 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.6 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
~~~

> 安装

帮助文档：

**注：dcoker的镜像源仓库已经被墙，下面的方法已经不适用！！！**

~~~shell
# 1、卸载旧版本
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# 2、使用存储库安装
# 添加Docker的官方GPG密钥：
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings

# 这是官方docker下载源，换成下面的阿里源
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 阿里源
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg


# 3、设置镜像仓库，将存储库添加到Apt源：
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包的索引
sudo apt-get update

# 4、安装Docker包，docker-ce 社区版 ee 企业版
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5、启动docker 
systemctl start docker 
 
# 6、使用docker version 是否安装成功：
~~~

![image-20250724105330202](C:\Users\zaoan\AppData\Roaming\Typora\typora-user-images\image-20250724105330202.png)

~~~shell
# 7、hello-world
docker run hello-world
~~~

> 新的安装参考教程

***2025年帮助文档：解决docker run hello-world访问不了仓库 ***

教程参考地址：

* [tech-shrimp/docker_installer: Docker官方安装包，用来解决因国内网络无法安装使用Docker的问题](https://github.com/tech-shrimp/docker_installer?tab=readme-ov-file)
* [docker-ce镜像_docker-ce下载地址_docker-ce安装教程-阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/docker-ce?spm=a2c6h.13651102.0.0.57e31b11zsHH3R)

~~~shell
# 这边采用阿里云教程
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# step 2: 信任 Docker 的 GPG 公钥
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Step 3: 写入软件源信息
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 
# Step 4: 安装Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 安装指定版本的Docker-CE:
# Step 1: 查找Docker-CE的版本:
# apt-cache madison docker-ce
#   docker-ce | 17.03.1~ce-0~ubuntu-xenial | https://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
#   docker-ce | 17.03.0~ce-0~ubuntu-xenial | https://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
# Step 2: 安装指定版本的Docker-CE: (VERSION例如上面的17.03.1~ce-0~ubuntu-xenial)
# sudo apt-get -y install docker-ce=[VERSION]


# 做完上面的步骤在下面开始准备Linux换源
# 如果报错请检查是否有目录，没有则自行创建
sudo vi /etc/docker/daemon.json

# 配置镜像源
{
    "registry-mirrors": [
       "https://docker.xuanyuan.me",
       "https://docker.m.daocloud.io",
       "https://docker.1panel.live",
       "https://hub.rat.dev"
    ]
}
# 重启加载配置
systemctl daemon-reload
# 重启docker
sudo service docker restart

# 继续执行
docker run hello-world
~~~

~~~shell
# 8、查看下载好的hello-world镜像
root@ubuntu:/etc/docker# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    74cc54e27dc4   6 months ago   10.1kB
~~~

了解：卸载docker

~~~shell
# 1、卸载 Docker Engine、CLI、containerd 和 Docker Compose 包
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras

# 2、主机上的映像、容器、卷或自定义配置文件 不会自动删除。要删除所有映像、容器和卷，请执行以下作：
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

# 3、删除源列表和密钥环
sudo rm /etc/apt/sources.list.d/docker.list
sudo rm /etc/apt/keyrings/docker.asc
~~~

> 上面教程已经提前配置好了，下面可以忽略不看

## 配置阿里云镜像加速器

1、登录阿里云 ==> 找到产品下面的容器 ==>  容器镜像服务 ==> 镜像工具  ==> 镜像加速器 ==> 复制加速器地址

2、配置镜像加速器

~~~shell
# 修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://qb2p9uff.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
~~~

## 底层原理

**Docker是什么工作的？**

Docker 是一个 Client - Server 结构的系统，Docker的守护进程运行在主机上。通过Socket从客户端访问！

DockerServer 接收到 Docker-Client 的指令，就会执行这个命令

![image-20250724150154212](C:\Users\zaoan\AppData\Roaming\Typora\typora-user-images\image-20250724150154212.png)

**Docker 为什么比 VM 快？**

1、Docker 有着比虚拟机更少的抽象层。

2、Docker 利用的是宿主机的内核，vm需要是 Guest OS。

![image-20250724150710170](C:\Users\zaoan\AppData\Roaming\Typora\typora-user-images\image-20250724150710170.png)

新建一个容器的时候，docker不需要像虚拟机一样重新加载一个操作系统的内核，避免引导。虚拟机是加载 Guest OS，分钟级别的，而 docker 是利用宿主机的操作系统，省略了这个复杂的过程。

# Docker的常用命令

## 帮助命令

~~~ shell
docker version	 	# 显示docker的版本信息
docker info    		# 显示docker的系统消息，包括镜像和容器的数量
docker 命令 --help   # 帮助命令
~~~



## 镜像命令

**docker images查看所有本地主机上的镜像**

~~~ shell
root@ubuntu:/etc/docker# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
hello-world   latest    74cc54e27dc4   6 months ago   10.1kB

# 解释
REPOSITORY  镜像的仓库源
TAG         镜像的标签
IMAGE ID    镜像的id
CREATED     镜像的创建时间
SIZE        镜像的大小

# 可选项
  -a, --all             # 列出所有的镜像
  -q, --quiet           # 只显示镜像的id
~~~

**docker search 搜索镜像**

~~~ shell
docker search mysql

# 可选项，通过搜索来过滤
--filter=STARS=3000  # 搜索出来的镜像就是STARS大于3000的

docker search mysql --filter=STARS=3000

docker search mysql --filter=STARS=5000

~~~

**docker pull 下载镜像**

~~~shell
# 下载镜像 docker pull 镜像[:tag]
root@ubuntu:~# docker pull mysql
Using default tag: latest # 如果不写 tag，默认就是 latest
latest: Pulling from library/mysql
62efe2b176c9: Pull complete  # 分层下载，docker iamge的核心 联合文件系统
736f5014e23e: Pull complete 
d8cbbf99b1d8: Pull complete 
42dcfa514f37: Pull complete 
0f4e1544ec0b: Pull complete 
2702f0bc0b03: Pull complete 
3933202e133d: Pull complete 
408de5f91115: Pull complete 
8cf481282f11: Pull complete 
77a166a67589: Pull complete 
Digest: sha256:2426e028f770e7e87aaaddb1f3cef472679279c1a2d94547e7a6acc4f111f8f0 # 签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest # 真实地址

# 等价于它
docker pull mysql
docker pull docker.io/library/mysql:latest

# 指定版本下载
root@ubuntu:~# docker pull mysql:5.7
5.7: Pulling from library/mysql
20e4dcae4c69: Pull complete 
1c56c3d4ce74: Pull complete 
e9f03a1c24ce: Pull complete 
68c3898c2015: Pull complete 
6b95a940e7b6: Pull complete 
90986bb8de6e: Pull complete 
ae71319cb779: Pull complete 
ffc89e9dfd88: Pull complete 
43d05e938198: Pull complete 
064b2d298fba: Pull complete 
df9a4d85569b: Pull complete 
Digest: sha256:4bc6bc963e6d8443453676cae56536f4b8156d78bae03c0145cbe47c2aad73bb
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7




~~~

~~~shell
root@ubuntu:~# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
mysql         latest    245a6c909dc0   2 days ago      921MB
hello-world   latest    74cc54e27dc4   6 months ago    10.1kB
mysql         5.7       5107333e08a8   19 months ago   501MB
~~~

**docker rmi 删除镜像！**

~~~shell
root@ubuntu:~# docker rmi -f 镜像 # 删除指定容器
root@ubuntu:~# docker rmi -f 镜像id 镜像id 镜像id # 删除多个容器
root@ubuntu:~# docker rmi -f $(docker images -aq) # 删除全部的容器
~~~



## 容器命令

**注：有了镜像才能创建容器，linux,下载一个 centos镜像测试**

~~~shell
docker pull centos
~~~

**新建容器并启动**

~~~shell
docker run [可选参数] image

# 参数说明
--name="Name"	容器名字 tomcat01 tomcat02，用来区分容器
-d				后台方式运行
-it				使用交互方式运行，进入容器查看内容
-p				指定容器的端口	-p 8080:8080
	-p ip:主机端口:容器端口
	-p 主机端口:容器端口（常用）
	-p 容器端口
	容器端口
-p				随机指定端口

# 测试，启动并进入容器
root@ubuntu:~# docker pull centos # 下载centos镜像

root@ubuntu:~# docker run  -it centos /bin/bash # 进入容器
[root@3f640058d49d /]# ls # 查看容器内的centos
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

# 从容器退回主机
[root@3f640058d49d /]# exit
exit
root@ubuntu:~# ls
clash  snap

# docker ps 命令
	# 列出当前正在运行的容器
-a	# 列出当前正在运行的容器+带出历史运行过的容器
-n=?	# 显示最近创建的容器
-q	# 只显示容器的编号



root@ubuntu:~# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@ubuntu:~# docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS                     PORTS     NAMES
3f640058d49d   centos         "/bin/bash"   4 minutes ago   Exited (0) 2 minutes ago             gifted_lewin
93f4d890ac1e   74cc54e27dc4   "/hello"      21 hours ago    Exited (0) 21 hours ago              thirsty_hertz
~~~

**退出容器**

~~~shell
exit	# 直接容器停止并退出
Ctrl + P + Q 	# 容器不停止退出
~~~

**删除容器**

~~~shell
docker rm 容器id				# 删除指定的容器，不能删除正在运行的容器，如果要强制删除 rm -f
docker rm $(dockr ps -aq)	 # 删除所有的容器
docker ps -a -q|xargs docker rm # 删除所有的容器
~~~

**启动和停止容器操作**

~~~shell
docker start 容器id		# 启动容器
docker restart 容器id		# 重启容器
docker stop 容器id		# 停止当前正在运行的容器
docker kill 容器id		# 强制停止当前容器
~~~



## 常用其他命令

**后台启动容器**

~~~shell
# 命令 docker run -d 镜像名！
root@ubuntu:~# docker run -d centos

# 问题docker ps，发现centos 停止了

# 常见的坑，docker 容器使用后台运行，就必须要有一个前台进程，docker发现没有应用，就会自动停止
# nginx，容器启动后，发现自己没有提供服务，就会立刻停止，就是没有程序了
~~~

**查看日志**

~~~ shell
docker logs -f -t --tail 容器，没有日志

# 自己编写一段shell脚本
root@ubuntu:~# docker run -d centos /bin/sh -c "while true;do echo 114514;sleep 1;done"

# root@ubuntu:~# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
0c45a91c3334   centos    "/bin/sh -c 'while t…"   3 seconds ago   Up 2 seconds             wizardly_shaw

# 显示日志
-tf			# 显示日志
--tail number # 要显示日志条数
root@ubuntu:~# docker logs -tf --tail 10 0c45a91c3334
~~~

**查看容器中的进程信息 ps**

~~~shell
# 命令 docker top 容器id

root@ubuntu:~# docker top 0c45a91c3334
UID                 PID                 PPID                C                   STIME               TTY     
root                9008                8985                0                   20:42               ?       
root                9457                9008                0                   20:49               ?       

~~~

**查看镜像的元数据**

~~~ shell
# 命令
root@ubuntu:~# docker inspect 容器id
# 测试
root@ubuntu:~# docker inspect 0c45a91c3334
[
    {
        "Id": "0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb",
        "Created": "2025-07-25T03:42:48.973836436Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "while true;do echo 114514;sleep 1;done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 9008,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2025-07-25T03:42:49.033389101Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6",
        "ResolvConfPath": "/var/lib/docker/containers/0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb/hostname",
        "HostsPath": "/var/lib/docker/containers/0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb/hosts",
        "LogPath": "/var/lib/docker/containers/0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb/0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb-json.log",
        "Name": "/wizardly_shaw",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "bridge",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                34,
                146
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/interrupts",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "ID": "0c45a91c3334e1eb56ff7547a170af94589e0411f5e4c0c9cdc76e98b65efeeb",
                "LowerDir": "/var/lib/docker/overlay2/5d0c7c8f2e5d0f4b7b83940e0c12aa3f6cd1993f4a6a898b24ed9dc82f7a9023-init/diff:/var/lib/docker/overlay2/fe5cc2bc0d5c92251477555d7241a4795bccf0e78ea53581668e71dd43c75c09/diff",
                "MergedDir": "/var/lib/docker/overlay2/5d0c7c8f2e5d0f4b7b83940e0c12aa3f6cd1993f4a6a898b24ed9dc82f7a9023/merged",
                "UpperDir": "/var/lib/docker/overlay2/5d0c7c8f2e5d0f4b7b83940e0c12aa3f6cd1993f4a6a898b24ed9dc82f7a9023/diff",
                "WorkDir": "/var/lib/docker/overlay2/5d0c7c8f2e5d0f4b7b83940e0c12aa3f6cd1993f4a6a898b24ed9dc82f7a9023/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "0c45a91c3334",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "while true;do echo 114514;sleep 1;done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20210915",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "6e313f6351a85becd89fec134a4373527f1de2b4c6f175d8bd45471c6651c710",
            "SandboxKey": "/var/run/docker/netns/6e313f6351a8",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "7ef0f70360077176907a292b807aba3c0696817d32a1d54c61db435ee9e8b75e",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "22:9f:36:54:36:42",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "22:9f:36:54:36:42",
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "9111da8406bdba00b67d851991aabb295fc6400af2eecf95a9c01f6f95ecb56b",
                    "EndpointID": "7ef0f70360077176907a292b807aba3c0696817d32a1d54c61db435ee9e8b75e",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
        }
    }
]

~~~

**进入当前正在运行的容器**

~~~shell
# 通常容器都是使用后台方式运行的，需要进入容器，修改一些配置

# 命令
docker exec -it 容器id bashShell

# 测试
root@ubuntu:~# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
0c45a91c3334   centos    "/bin/sh -c 'while t…"   30 minutes ago   Up 30 minutes             wizardly_shaw

[root@0c45a91c3334 /]# docker exec -it 0c45a91c3334  /bin/bash

[root@0c45a91c3334 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

[root@0c45a91c3334 /]# ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 03:42 ?        00:00:00 /bin/sh -c while true;do echo 114514;sleep 1;done
root        1933       0  0 04:14 pts/0    00:00:00 /bin/bash
root        1962       1  0 04:14 ?        00:00:00 /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
root        1963    1933  0 04:14 pts/0    00:00:00 ps -ef

# 方式二
docker attach 容器id

# 测试
root@ubuntu:~# docker attach 0c45a91c3334
正在执行当前的代码...

# docker exec 	# 进入容器后开启一个新的终端，可以在里面操作（常用）
# docker attach # 进入容器正在执行的终端，不会启动新的进程！
~~~

**从容器内拷贝文件到主机上**

~~~shell
# 查看当前主机目录下
root@ubuntu:/home# ls
ruoyi  test  test2  zaoan
root@ubuntu:/home# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
ab9f19e0206b   centos    "/bin/bash"   25 seconds ago   Up 25 seconds             gifted_cohen
# 在容器内新建一个文件
root@ubuntu:/home# docker attach ab9f19e0206b
[root@ab9f19e0206b /]# cd /home
[root@ab9f19e0206b home]# ls
[root@ab9f19e0206b home]# touch test.java
[root@ab9f19e0206b home]# exit
exit
root@ubuntu:/home# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@ubuntu:/home# docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS                        PORTS     NAMES
ab9f19e0206b   centos         "/bin/bash"              About a minute ago   Exited (0) 12 seconds ago               gifted_cohen
85a9bb58c043   centos         "/bin/bash"              25 minutes ago       Exited (0) 24 minutes ago               friendly_feynman
c1adcfdfac05   centos         "/bin/bash"              25 minutes ago       Exited (127) 17 minutes ago             loving_thompson
0c45a91c3334   centos         "/bin/sh -c 'while t…"   5 hours ago          Exited (137) 29 minutes ago             wizardly_shaw
5fa0ce048d6f   centos         "/bin/sh -C 'while t…"   5 hours ago          Exited (127) 5 hours ago                wonderful_mcnulty
87601fe78b31   centos         "/bin/bash"              5 hours ago          Exited (0) 5 hours ago                  stupefied_davinci
30609caf0802   centos         "/bin/bash"              5 hours ago          Exited (0) 5 hours ago                  hardcore_pascal
e770a65b69ea   centos         "/bin/bash"              5 hours ago          Exited (0) 5 hours ago                  reverent_banzai
193b81878156   centos         "/bin/bash"              5 hours ago          Exited (137) 5 hours ago                suspicious_kirch
1d06d03700e8   centos         "/bin/bash"              5 hours ago          Exited (127) 5 hours ago                agitated_cohen
3f640058d49d   centos         "/bin/bash"              5 hours ago          Exited (0) 5 hours ago                  gifted_lewin
93f4d890ac1e   74cc54e27dc4   "/hello"                 26 hours ago         Exited (0) 26 hours ago                 thirsty_hertz

# 将这文件拷贝出来到主机上
root@ubuntu:/home# docker cp ab9f19e0206b:/home/test.java /home
Successfully copied 1.54kB to /home
root@ubuntu:/home# ls
ruoyi  test  test2  test.java  zaoan

root@ubuntu:/home#

# 拷贝是一个手动过程，后面使用 -v 卷的技术，可以实现

~~~

## 小结

~~~shell
attach		Attach to a running container					# 当前 shell 下 attach 连接指定运行镜像
build		Build an image from a Dockerfile				# 通过 Dockerfile 定制镜像
commit		Create a new image from a container changes		# 提交当前容器为新的镜像
cp			Copy files/folders from the containers filesystem to the host path	# 从容器中拷贝指定文件或者目录到宿主机中
create		Create a new container							# 创建一个新的容器，同 run，但不启动容器
diff		Inspect changes on a container's filesystem		# 查看 docker 容器变化
events		Get real time events from the server			# 从 docker 服务获取容器实时事件
exec		Run a command in an existing container			# 在已存在的容器上运行命令
export		Stream the contents of a container as a tar archive	# 导出容器的内容流作为一个 tar 归档文件[对应 import ]
history		Show the history of an image					# 展示一个镜像形成历史
images		List images										# 列出系统当前镜像
import		Create a new filesystem image from the contents of a tarball	# 从tar包中的内容创建一个新的文件系统映像[对应 export]
info		Display system-wide information					# 显示系统相关信息
inspect		Return low-level information on a container		# 查看容器详细信息
kill		Kill a running container						# kill 指定 docker容器
load		Load an image from a tar archive				# 从一个tar包加载一个镜像[对应 save]
login		Register or  Login to the docker registry serven	#注册或者登陆一个 docker 源服务器
logout		Log out from a Docker registry server			#从当前 Docker registry 退出
logs		Fetch the logs of a container					# 输出当前容器日志信息
port		Lookup the public-facing port which is NAT-ed to PRIVATE_PORT	# 查看映射端口对应的容器内部源端口
pause		Pause all processes within a container			# 暂停容器
ps			List containers									# 列出容器列表
pull		Pu1l an image or a repository from the docker registry server	# 从docker镜像源服务器拉取指定镜像或者库镜像
push		Push an image or a repository to the docker registry server		# 推送指定镜像或者库镜像至docker源服务器
restart		Restart a running container						# 重启运行的容器
rm			Remove one or mre containers					# 移除一个或者多个容器
rmi			Remove one or more images						# 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可即系或 -f 强制删除]
run			Run a command in a new container				# 创建一个新的容器并运行一个命令
save		Save an image to a tar archive					# 保存一个镜像为一个 tar 包[对应 load]
search		Search for an image on the Docker Hub			# 在 docker hub 中搜索镜像
start		Start a stopped containers						# 启动容器
stop		Stop a running containers						# 停止容器
tag			Tag an image into a repository					# 给源中镜像打标签
top			Lookup the running processes of a container		#查看容器中运行的进程信息
unpause		Unpause a paused container						# 取消暂停容器
version		Show the docker version information				# 查看 docker 版本号
wait		Block until a container stops,then print its exit code # 截取容器停止时的退出状态值
~~~

## 练手

> Docker 安装 Niginx

~~~shell
# 1、搜索镜像 search	如果搜索不到，可以换源直接pull下来
# 2、下载镜像 pull
# 3、运行测试
root@ubuntu:/home# docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        latest    2cd1d97f893f   10 days ago   192MB
centos       latest    5d0da3dc9764   3 years ago   231MB

# -d 后台运行
# --name 给容器命名
# -p 宿主机端口，容器内部端口
root@ubuntu:/home# docker run -d --name nginx01 -p 3344:80 nginx
d75f9240948a74f026795e3ed1f1301433329cce250bda9c924e234a24007fe5
root@ubuntu:/home# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                     NAMES
d75f9240948a   nginx     "/docker-entrypoint.…"   3 seconds ago   Up 3 seconds   0.0.0.0:3344->80/tcp, [::]:3344->80/tcp   nginx01
root@ubuntu:/home# curl localhost:3344

# 进入容器
root@ubuntu:/home# docker exec -it nginx01 /bin/bash
root@d75f9240948a:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@d75f9240948a:/# cd /etc/nginx
root@d75f9240948a:/etc/nginx# ls
conf.d	fastcgi_params	mime.types  modules  nginx.conf  scgi_params  uwsgi_params
root@d75f9240948a:/etc/nginx# 
~~~

> docker 安装 tomcat

~~~shell
root@ubuntu:/home# docker run -it --rm tomcat:9.0
# 官方的使用
docker run -it --rm tomcat:9.0

# 我们之前的启动都是后台，停止了容器之后，容器还是可以查到		docker run -it --rm，一般用来测试，用完就删除

# 下载在启动
docker pull tomcat

# 启动运行
docker run -d -p 3355:8080 --name tomcat01 tomcat

# 测试访问没有问题


# 进入容器
root@ubuntu:~# docker exec -it tomcat01 /bin/bash

# 发现问题，：1、Linux命令少了，2、没有webapps。阿里云镜像的原因。默认是最小的镜像，所有不必要的都剔除掉。
# 保证最小可运行的环境！
~~~

> 部署es + kibana

~~~shell
# es 暴露的端口很多
# es 十分的耗内存
# es 的数据一般需要放置到安全目录！挂载
#  --net somenetwork ？ 网络配置
# 启动 elasticsearch
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2

# 启动 linux卡住 docker stats 查看 cpu 的状态

# 查看 docker stats
# 测试一下es是否成功
root@ubuntu:~# curl localhost:9200
{
  "name" : "6d2746279653",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "bmjVAhRoTkquTNMg82puJw",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

# 关闭，增加内存的限制
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O        PIDS 
6d2746279653   elasticsearch   0.46%     1.261GiB / 3.785GiB   33.31%    3.42kB / 126B   46.5MB / 729kB   51

# 增加内存的限制，修改配置文件 -e 环境配置修改
docker run -d --name elasticsearch04 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2

# 查看docker stats
CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O        PIDS 
719408307ccf   elasticsearch04   0.38%     390.5MiB / 3.785GiB   10.08%    3.42kB / 126B   7.01MB / 729kB   48 


root@ubuntu:~# curl localhost:9200
{
  "name" : "719408307ccf",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "IkHAFFUcSAC2u9eSiJ-3QA",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
~~~

## 可视化

* portainer

  ~~~shell
  docker run -d -p 8088:9000 \
  --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
  ~~~

* Rancher（CI/CD再用）

**什么是 portainer ?**

Docker图形化界面管理工具！提供一个后台面板供我们操作！

~~~shell
docker run -d -p 8088:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
~~~

访问测试

http://192.168.1.226:8088/



# Docker镜像讲解

## 镜像是什么

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

所有的应用，直接打包docker镜像，就可以直接跑起来！

**如何得到镜像：**

* 从远程仓库下载
* 朋友拷贝给你
* 自己制作一个镜像 DockerFiles

## Docker镜像加载原理

> UnionFS（联合文件系统）

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下（unite several directories into a single virtual filesystem）。Union 文件系统是Docker镜像的基础。镜像可以通过分层来进行集成，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录



> Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFs。

bootfs（boot file system）主要包含bootloader和kernel，bootloader主要是引导加载kernel，Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已有bootfs转交给内核，此时系统也会卸载bootfs。

rootfs（root file system），在bootfs之上。包含的就是典型 Linux 系统中的 /dev，/proc，/bin，/etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。

平时我们安装金虚拟机的CentOS都是好几个G，为什么Docker这里才200M？

对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直接用Host的Kernel，自己只需要提供rootfs就可以了。由此可见对于不同的linux发行版，bootfs基本是一致的，rootfs会有差别，因此不同的发行版可以公用bootfs。

## 分层理解

> 分层镜像

下载一个镜像，注意观察下载的日志输出，可以看到是一层一层的在下载！

思考：为什么Docker镜像要采用这种分层的结构呢？

最大的好处是资源共享，比如有多个镜像都从相同的Base镜像构建而来，那么宿主机只需在磁盘上保留一封base镜像，同时内存中也只需要加载一份base镜像，这样就可以为所有的容器服务了，而且镜像的每一层都可以被共享。

查看镜像分层的方式可以通过 docker image inspect 命令！

~~~shell
[     // .....      
      "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:7cc7fe68eff66f19872441a51938eecc4ad33746d2baa3abc081c1e6fe25988e",
                "sha256:2617bd3c4d23f36d4af621c4642e37af75962c0ed335a7cf49f74d9b8c92b9c8",
                "sha256:39e137df48573bd019493358fd2de4ad003290841beeae9511185324bbcdb9f4",
                "sha256:be7b46ba11b1a94d683151cdb3f3ef473260524321c0db5aa8b6fdf7337f2cd2",
                "sha256:df94cdec0312397c77b1e3e1d85eda1feb7c06cdb419d944f923e62100fc6a19",
                "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef",
                "sha256:8722da68c93eafe5396114f8cea7496c21a6dcb34ac5bab384009fc8eb6ce251"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]

~~~

**理解：**

所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层。

举例，假如基于 Ubuntu Linux16.04 创建一个新的镜像，这就是新镜像的第一层；如果在该镜像中添加Python包，

该镜像当前已经包含 3 个镜像层。

在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合。



> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！

这一层就是我们通常说的容器层，容器之下的都叫镜像层！



如何提交一个自己的镜像

## commit镜像

~~~ shell
docker commit 提交容器成为一个新的副本

# 命令和git原理类似
docker commit -m="提交的描述信息" -a="作者" 容器id 目标镜像名:[TAG]
~~~

实战测试

~~~shell
# 1、启动一个默认的tomcat

# 2、发现这个默认的tomcat 是没有webapps应用，镜像的原因，官方的镜像默认 webapps下面是没有文件的！

# 3、我自己拷贝进去了基本的文件

# 4、将我们操作过的容器通过commit提交为一个镜像！我们以后就使用我们修改过的镜像即可，这就是我们自己的一个修改的镜像
root@ubuntu:~# docker commit -a="zaoan" -m="add webapps app" 265bf85aa92f tomcat02:14514.0
sha256:a9f1dcc0d4bc0ea7b1c7daeb13b4bfdba73cce36641870caccc1c3e8bd104bb6
root@ubuntu:~# docker images
REPOSITORY            TAG       IMAGE ID       CREATED          SIZE
tomcat02              14514.0   a9f1dcc0d4bc   26 seconds ago   474MB
redis                 latest    0378d73bea8b   2 weeks ago      128MB
tomcat                latest    9ca267cc83c7   3 weeks ago      468MB
portainer/portainer   latest    5f11582196a4   2 years ago      287MB
elasticsearch         7.6.2     f29a1ee41030   5 years ago      791MB

~~~

# 数据容器卷

## 使用数据卷

> 方式一：直接使用命令来挂载 -v

~~~ shell
docker run -it -v 主机目录:容器内目录

# 测试
root@ubuntu:/home# docker run -it -v /home/ceshi:/home centos /bin/bash

# 启动起来时候我们可以通过 docker inspect 容器id
       "Mounts": [
            {
                "Type": "bind",
                "Source": "/home/ceshi",
                "Destination": "/home",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
       ....
       ]   
 
~~~

## 实战：安装MySQL

~~~ shell
# 获取镜像
root@ubuntu:/home# docker pull mysql:5.7

# 运行容器，需要做数据挂载！ # 安装启动mysql，需要配置密码！
# 官网测试：$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag

# 启动测试
-d 后台运行
-p 端口映射
-v 卷挂载
-e 环境配置
--name 容器名字
root@ubuntu:/home# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

# 启动成功之后，我们在本地使用 DataGrid 测试一下
# DataGrid链接到服务器3310 ---3310 和容器内的 3306映射，这个时候我们就可以连接上了！

# 在本地测试创建一个数据库，查看一下映射路径是否ok

# 如果将容器删除，我们挂载的本地数据卷也不会丢失，这就实现了容器数据持久化功能！
root@ubuntu:/home/mysql/data# docker ps
CONTAINER ID   IMAGE                 COMMAND        CREATED        STATUS             PORTS                                                             NAMES
966a783f0daa   portainer/portainer   "/portainer"   44 hours ago   Up About an hour   8000/tcp, 9443/tcp, 0.0.0.0:8088->9000/tcp, [::]:8088->9000/tcp   keen_babbage

root@ubuntu:/home/mysql/data# ls
auto.cnf    client-cert.pem  ibdata1      ibtmp1      performance_schema  server-cert.pem  test
ca-key.pem  client-key.pem   ib_logfile0  mysql       private_key.pem     server-key.pem
ca.pem      ib_buffer_pool   ib_logfile1  mysql.sock  public_key.pem      sys

~~~

## 具名挂载和匿名挂载

~~~shell
# 匿名挂载
-v 容器内路径！
docker run -d -P --name nginx01 -v /etc/nginx nginx

# 查看所有的 volume 的情况
root@ubuntu:/home# docker volume ls
DRIVER    VOLUME NAME
local     df4586b92a17d5cc5a02ff0c53a207ee2e85e06da5804a07b9648aae68f56fe4

# 上面这种就是匿名挂载，我们在 -v 只写了容器内的路径，没有写容器外的路径！

# 具名挂载
root@ubuntu:/home# docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
a03f236e44f8ebc7fdb7a1cca7912d87abe1968fd3f3dd15142d2952cacf1eef
root@ubuntu:/home# docker volume ls
DRIVER    VOLUME NAME
local     df4586b92a17d5cc5a02ff0c53a207ee2e85e06da5804a07b9648aae68f56fe4
local     juming-nginx

# 通过 -v 卷名：容器内路径
# 查看这个卷

root@ubuntu:/home# docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2025-07-27T20:12:22-07:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data",
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]


~~~

所有的docker容器内的卷，没有指定目录的情况下都是在 **/var/lib/docker/volumes/juming-nginx/_data**
我们通过具名挂载可以方便的找到我们的一个卷，大多数情况再使用的 **具名挂载**

~~~shell
# 如何确定是具名挂载还是匿名挂载，还是指定路径挂载！
-v 容器内路径	# 匿名挂载
-v 卷名:容器内路径	# 具名挂载
-v /宿主机路径::容器内路径	# 指定路径挂载！
~~~

扩展：

~~~shell
# 通过 -v 容器内路径：ro	rw 改变读写权限
ro readonly # 只读
rw readwrite # 可读可写 

# 一旦这个设置了容器权限，容器对我们挂载出来的内容就有限定了！
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:rw nginx

# ro 只要看到ro就说明这个路径只能通过宿主机来操作，容器内部是无法操作！
~~~

## 初识Dockerfile

Dockerfile 就是用来构建 docker 镜像的构建文件！命令脚本！

通过这个脚本可以生成镜像，镜像是一层一层的，脚本一个个的命令，每个命令都是一层！

~~~shell
# 创建一个dockerfile1文件，名字可以随机，建议 dockerfile
# 文件中的内容 指令（大写） 参数

FROM centos
  
VOLUME ["volume01","volume02"]

CMD echo "-----end-----" && /bin/bash

# 这里的每个命令，就是镜像的一层！
root@ubuntu:/home/docker-test-volume# docker build -f dockerfile1 -t zaoan/centos:2.0 .
[+] Building 0.1s (5/5) FINISHED                                                                                                   docker:default
 => [internal] load build definition from dockerfile1                                                                                        0.0s
 => => transferring dockerfile: 121B                                                                                                         0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 5)              0.0s
 => [internal] load metadata for docker.io/library/centos:latest                                                                             0.0s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => CACHED [1/1] FROM docker.io/library/centos:latest                                                                                        0.0s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:a4be34c4f18b7767bb28ad138d16b5a1cd22b1ae77e087185976b126ace52de9                                                 0.0s
 => => naming to docker.io/zaoan/centos:2.0                                                                                                  0.0s
 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 5)
 
root@ubuntu:/home/docker-test-volume# docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
tomcat02              14514.0   a9f1dcc0d4bc   45 hours ago    474MB
nginx                 latest    2cd1d97f893f   13 days ago     192MB
redis                 latest    0378d73bea8b   3 weeks ago     128MB
tomcat                latest    9ca267cc83c7   3 weeks ago     468MB
<none>                <none>    5107333e08a8   19 months ago   501MB
portainer/portainer   latest    5f11582196a4   2 years ago     287MB
zaoan/centos          2.0       a4be34c4f18b   3 years ago     231MB
centos                latest    5d0da3dc9764   3 years ago     231MB
zaoan/centos          1.0       9b5949716ba8   3 years ago     231MB
zaoan/centos          latest    9b5949716ba8   3 years ago     231MB
elasticsearch         7.6.2     f29a1ee41030   5 years ago     791MB



#执行完后查看卷挂载的路径
root@ubuntu:~# docker inspect e554d66a801e

"Mounts": [
            {
                "Type": "volume",
                "Name": "6a58a149e3ae7c5acf6cbcc3d63a13e894eb8b4d754164a5aaa5ef7b2e992315",
                "Source": "/var/lib/docker/volumes/6a58a149e3ae7c5acf6cbcc3d63a13e894eb8b4d754164a5aaa5ef7b2e992315/_data",
                "Destination": "volume01",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "volume",
                "Name": "8d79955494bb76230f5743ef1385dbc8cda1f87070b66f6b6f3ce8bc994cf628",
                "Source": "/var/lib/docker/volumes/8d79955494bb76230f5743ef1385dbc8cda1f87070b66f6b6f3ce8bc994cf628/_data",
                "Destination": "volume02",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],

# 测试一下刚才的文件是否同步出去了
cd /var/lib/docker/volumes/6a58a149e3ae7c5acf6cbcc3d63a13e894eb8b4d754164a5aaa5ef7b2e992315/_data

# 这种方式我们未来使用的十分多，因为我们通常会构建自己的镜像！
# 假设构建镜像时候没有挂载卷，要手动镜像挂载 -v 卷名:容器内路径
~~~

## 数据卷容器

~~~shell
# 启动docker01
root@ubuntu:~# docker run -it --name docker01 zaoan/centos:2.0

# 查看目录，此时的volume01是没有文件的
[root@c6e5b110f7a8 /]# ls -l
total 56
lrwxrwxrwx   1 root root    7 Nov  3  2020 bin -> usr/bin
drwxr-xr-x   5 root root  360 Jul 28 07:04 dev
drwxr-xr-x   1 root root 4096 Jul 28 07:04 etc
drwxr-xr-x   2 root root 4096 Nov  3  2020 home
lrwxrwxrwx   1 root root    7 Nov  3  2020 lib -> usr/lib
lrwxrwxrwx   1 root root    9 Nov  3  2020 lib64 -> usr/lib64
drwx------   2 root root 4096 Sep 15  2021 lost+found
drwxr-xr-x   2 root root 4096 Nov  3  2020 media
drwxr-xr-x   2 root root 4096 Nov  3  2020 mnt
drwxr-xr-x   2 root root 4096 Nov  3  2020 opt
dr-xr-xr-x 435 root root    0 Jul 28 07:04 proc
dr-xr-x---   2 root root 4096 Sep 15  2021 root
drwxr-xr-x  11 root root 4096 Sep 15  2021 run
lrwxrwxrwx   1 root root    8 Nov  3  2020 sbin -> usr/sbin
drwxr-xr-x   2 root root 4096 Nov  3  2020 srv
dr-xr-xr-x  13 root root    0 Jul 28 07:04 sys
drwxrwxrwt   7 root root 4096 Sep 15  2021 tmp
drwxr-xr-x  12 root root 4096 Sep 15  2021 usr
drwxr-xr-x  20 root root 4096 Sep 15  2021 var
drwxr-xr-x   2 root root 4096 Jul 28 07:04 volume01
drwxr-xr-x   2 root root 4096 Jul 28 07:04 volume02

# 从 docker01 容器继承所有已挂载的数据卷，并共享数据
root@ubuntu:~# docker run -it --name docker02 --volumes-from docker01 zaoan/centos:2.0

# cd 到 volume01 目录下面创建container.txt
[root@e554d66a801e /]# cd volume01/
[root@e554d66a801e volume01]# touch container.txt

# 回到docker01容器查看文件是否被同步
[root@e370f834cd0e /]# cd volume01/
[root@e370f834cd0e volume01]# ls
docker01  

#测试docker03 
root@ubuntu:~# docker run -it --name docker03 --volumes-from docker01 zaoan/centos:2.0
[root@8fadd406b8ba volume01]# ls
docker01
[root@8fadd406b8ba volume01]# touch doucker03
[root@8fadd406b8ba volume01]# ls
docker01  doucker03


# 测试，可以删除docker01，查看一下docker02和docker03是否还可以访问这个文件
# 测试依旧可以访问
~~~

多个mysql  实现数据共享

~~~shell
root@ubuntu:/home# docker run -d -p 3310:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7


root@ubuntu:/home# docker run -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01 mysql:5.7


# 这个时候，可以实现两个容器数据同步
~~~

**结论：**

容器之间配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止。

但是一旦你持久化到本地，这个时候，本地的数据库是不会删除的！

# DockerFile

## Dockerfile介绍

dockerfile 是用来构建docker镜像的文件！命令参数脚本！

构建步骤：

1、编写一个dockerfile 文件

2、docker build 构建成为一个镜像

3、docker run 运行镜像

4、docker push 发布镜像（DockerHub、阿里云镜像仓库！）

## DockerFile构建过程

**基础知识：**

1、每个保留关键字（指令）都是必须是大写字母

2、执行从上到下顺序执行

3、#表示注释

4、每一个指令都会创建提交一个新的镜像层，并提交！

## DockerFile指令

~~~shell
FROM 		# 基础镜像，一切从这里开始构建
MAINTAINER	# 镜像是谁写的，姓名+邮箱
RUN 		# 镜像构建的时候需要运行的命令
ADD			# 步骤：tomcat镜像，这个tomcat压缩包！添加内容
WORKDIR		# 镜像的工作目录
VOLUME		# 挂载的目录
EXPOST		# 保留端口配置
CMD			# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT	# 指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD		# 当构建一个被继承 DockerFile 这个时候就会运行 ONBUILD
~~~

## 实战测试

Docker Hub 中 99% 镜像都是从这个基础镜像过来的 FROM scratch，然后配置需要的软件和配置来进行的构建

> 创建一个自己的centos

~~~shell
# 1 编写Dockerfile的文件
root@ubuntu:~/dockerfile# cat mydockerfile-centos                                                                                                 
FROM centos:7
LABEL maintainer="yourname@example.com"

# 配置阿里云镜像源
RUN mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup \
    && curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo \
    && yum clean all \
    && yum makecache

# 安装工具
RUN yum -y update \
    && yum -y install epel-release \
    && yum -y install vim net-tools wget curl

# 设置环境
ENV MYPATH=/usr/local



# 2、通过这个文件构建镜像
# 命令 docker build -f dockerfile文件路径 -t 镜像名:[tag]
 => exporting to image                                                                                                                       3.2s 
 => => exporting layers                                                                                                                      3.1s 
 => => writing image sha256:59c99dd17d6c18592f92edce5d80d5b5d8be4194760ef82fc7bfee8246918fd1                                                 0.0s 
 => => naming to docker.io/library/mycentos:0.1 
 
# 3、测试运行
[root@7baaec8438f8 local]# pwd
/usr/local
[root@7baaec8438f8 local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.3  netmask 255.255.0.0  broadcast 172.17.255.255
        ether f2:f2:21:c8:d9:b2  txqueuelen 0  (Ethernet)
        RX packets 18  bytes 2343 (2.2 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 3  bytes 126 (126.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

[root@7baaec8438f8 local]# vim test

# tips
# 查看镜像制作过程
root@ubuntu:~/dockerfile# docker history 59c99dd17d6c 
~~~

> CMD 和 ENTRYPOINT 区别

~~~shell
CMD 		# 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT 	# 指定这个容器启动的时候要运行的命令，可以追加命令
~~~

测试cmd

~~~shell
# 编写 dockerfile 文件
root@ubuntu:~/dockerfile# vim dockerfile-cmd-test
FROM centos:7
CMD ["ls","-a"]

# 构建镜像
root@ubuntu:~/dockerfile# docker build -f dockerfile-cmd-test  -t cmdtest .

# run运行，ls -a 命令生效
root@ubuntu:~/dockerfile# docker run 9a05c2ba0499
.
..
.dockerenv
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 追加一个命令
root@ubuntu:~/dockerfile# docker run 9a05c2ba0499 -l
docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: exec: "-l": executable file not found in $PATH: unknown

# cmd的清理下 -l 替换了CMD ["ls","-a"] 命令， -l 不是命令所以报错！
~~~

测试 ENTRYPOINT 

~~~shell
root@ubuntu:~/dockerfile# vim dockerfile-cmd-enttryponit
root@ubuntu:~/dockerfile# cat dockerfile-cmd-enttryponit 
FROM centos:7
ENTRYPOINT ["ls","-a"]

root@ubuntu:~/dockerfile# docker build -f dockerfile-cmd-enttryponit -t entrypointtest .
[+] Building 0.4s (5/5) FINISHED                                                                                                   docker:default
 => [internal] load build definition from dockerfile-cmd-enttryponit                                                                         0.0s
 => => transferring dockerfile: 91B                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/centos:7                                                                                  0.3s
 => [internal] load .dockerignore                                                                                                            0.0s
 => => transferring context: 2B                                                                                                              0.0s
 => CACHED [1/1] FROM docker.io/library/centos:7@sha256:be65f488b7764ad3638f236b7b515b3678369a5124c47b8d32916d6487418ea4                     0.0s
 => exporting to image                                                                                                                       0.0s
 => => exporting layers                                                                                                                      0.0s
 => => writing image sha256:6beb6f712117995cd7daa5bf7681d3cf6364b87aa2b4b99fe191edb74d398924                                                 0.0s
 => => naming to docker.io/library/entrypointtest                                                                                            0.0s
root@ubuntu:~/dockerfile# docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
mycentos              0.1       59c99dd17d6c   17 hours ago    1.19GB
tomcat02              14514.0   a9f1dcc0d4bc   2 days ago      474MB
nginx                 latest    2cd1d97f893f   2 weeks ago     192MB
redis                 latest    0378d73bea8b   3 weeks ago     128MB
tomcat                latest    9ca267cc83c7   3 weeks ago     468MB
mysql                 5.7       5107333e08a8   19 months ago   501MB
portainer/portainer   latest    5f11582196a4   2 years ago     287MB
cmdtest               latest    9a05c2ba0499   3 years ago     204MB
entrypointtest        latest    6beb6f712117   3 years ago     204MB
centos                latest    5d0da3dc9764   3 years ago     231MB
zaoan/centos          2.0       a4be34c4f18b   3 years ago     231MB
zaoan/centos          1.0       9b5949716ba8   3 years ago     231MB
zaoan/centos          latest    9b5949716ba8   3 years ago     231MB
elasticsearch         7.6.2     f29a1ee41030   5 years ago     791MB
root@ubuntu:~/dockerfile# docker run 6beb6f712117
.
..
.dockerenv
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 我们的追加命令，是直接拼接在我们的 ENTRYPOINT 命令的后面！
root@ubuntu:~/dockerfile# docker run 6beb6f712117 -l
total 64
drwxr-xr-x   1 root root  4096 Jul 29 02:35 .
drwxr-xr-x   1 root root  4096 Jul 29 02:35 ..
-rwxr-xr-x   1 root root     0 Jul 29 02:35 .dockerenv
-rw-r--r--   1 root root 12114 Nov 13  2020 anaconda-post.log
lrwxrwxrwx   1 root root     7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x   5 root root   340 Jul 29 02:35 dev
drwxr-xr-x   1 root root  4096 Jul 29 02:35 etc
drwxr-xr-x   2 root root  4096 Apr 11  2018 home
lrwxrwxrwx   1 root root     7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx   1 root root     9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x   2 root root  4096 Apr 11  2018 media
drwxr-xr-x   2 root root  4096 Apr 11  2018 mnt
drwxr-xr-x   2 root root  4096 Apr 11  2018 opt
dr-xr-xr-x 425 root root     0 Jul 29 02:35 proc
dr-xr-x---   2 root root  4096 Nov 13  2020 root
drwxr-xr-x  11 root root  4096 Nov 13  2020 run
lrwxrwxrwx   1 root root     8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x   2 root root  4096 Apr 11  2018 srv
dr-xr-xr-x  13 root root     0 Jul 29 02:35 sys
drwxrwxrwt   7 root root  4096 Nov 13  2020 tmp
drwxr-xr-x  13 root root  4096 Nov 13  2020 usr
drwxr-xr-x  18 root root  4096 Nov 13  2020 var

~~~

## 实战：tomcat镜像

1、准备镜像文件 tomcat 压缩包，jdk的压缩包！

~~~shell
root@ubuntu:/home/build/tomcat# ll
total 90292
drwxr-xr-x 2 root root     4096 Jul 28 20:03 ./
drwxr-xr-x 3 root root     4096 Jul 28 20:02 ../
-rwxr--r-- 1 root root 13009294 Jul 28 20:03 apache-tomcat-9.0.107.tar.gz*
-rwxr--r-- 1 root root 79436023 Jul 28 20:03 jdk-8u461-linux-x64.tar.gz*
~~~

2、编写dockerfile文件，官方命名 `Dockerfile`，build会自动寻找这个文件，就不需要  -f 指定了！

~~~shell
# 基础镜像：CentOS 7 操作系统
FROM centos:7

# 镜像元数据标签，记录维护者联系方式（LABEL 替代已废弃的 MAINTAINER 指令）
LABEL zaoan="shenmidadazaoan@qq.com"

# 将宿主机当前目录下的 readme.txt 复制到镜像的 /usr/local/ 目录
COPY readme.txt /usr/local/readme.txt

# 自动解压宿主机本地的 JDK 8u461 压缩包到镜像的 /usr/local/ 目录（ADD 指令支持自动解压）
ADD jdk-8u461-linux-x64.tar.gz /usr/local/
# 自动解压宿主机本地的 Tomcat 9.0.107 压缩包到镜像的 /usr/local/ 目录
ADD apache-tomcat-9.0.107.tar.gz /usr/local/

# 替换 CentOS 默认 yum 源为阿里云镜像，并安装 vim 编辑器
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*.repo && \
    sed -i 's|#baseurl=http://mirror.centos.org|baseurl=https://mirrors.aliyun.com|g' /etc/yum.repos.d/CentOS-*.repo && \
    yum -y install vim

# 设置环境变量 MYPATH 为 /usr/local
ENV MYPATH=/usr/local
# 指定容器启动后的默认工作目录为 MYPATH 的值（即 /usr/local）
WORKDIR $MYPATH

# 配置 Java 环境变量
ENV JAVA_HOME=/usr/local/jdk1.8.0_461  # 需确保解压后的 JDK 目录名与此一致
ENV CLASSPATH=$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar  # 类加载路径
# 配置 Tomcat 环境变量
ENV CATALINA_HOME=/usr/local/apache-tomcat-9.0.107  # Tomcat 安装路径
ENV CATALINA_BASH=/usr/local/apache-tomcat-9.0.107   
# 将 Java 和 Tomcat 的 bin 目录添加到系统 PATH 环境变量
ENV PATH=$PATH:$JAVA_HOME/bin:$CATALINA_HOME/bin

# 声明容器运行时暴露的端口（Tomcat 默认 8080）
EXPOSE 8080

# 容器启动时执行的命令
ENTRYPOINT /usr/local/apache-tomcat-9.0.107/bin/startup.sh && tail -F /url/local/apache-tomcat-9.0.107/bin/logs/catalina.out
~~~

3、构建镜像

~~~shell
# docker build -t diytomcat .
~~~

4、启动镜像

~~~shell
root@ubuntu:~# docker run  -d -p 9090:8080 --name zaoantomcat -v /home/build/tomcat/test:/url/local/apache-tomcat-9.0.107/webapps/test -v /home/build/tomcat/tomcatlogs/:/url/local/apache-tomcat-9.0.107/logs diytomcat
~~~

5、访问测试

~~~shell
root@ubuntu:~# curl localhost:9090
~~~

6、发布项目（由于做了卷挂载，我们直接在本地编写项目就可以发布了！）



## 发布自己的镜像

> DockerHub

1、地址https://hub.docker.com/ 注册自己的账号

2、登录账号

~~~shell
root@ubuntu:~# docker login --help
Usage:  docker login [OPTIONS] [SERVER]

Authenticate to a registry.
Defaults to Docker Hub if no server is specified.

Options:
  -p, --password string   Password or Personal Access Token (PAT)
      --password-stdin    Take the Password or Personal Access Token (PAT) from stdin
  -u, --username string   Username

root@ubuntu:~# docker login -u 你的用户名
~~~

3、登录完提交镜像

~~~shell
# push自己的镜像到服务器上
docker push zaoan/diytomcat:1.0
# or
docker push diytomcat
~~~



# Docker网络

## 理解Docker0

清空所有环境

> 测试

~~~shell
root@ubuntu:~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:1a:f4:d3 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.1.226/24 brd 192.168.1.255 scope global dynamic noprefixroute ens33
       valid_lft 242001sec preferred_lft 242001sec
    inet6 fe80::41d9:6566:f1ef:3d0c/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 52:a2:46:e8:03:a4 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::50a2:46ff:fee8:3a4/64 scope link 
       valid_lft forever preferred_lft forever
~~~

三个网络

~~~shell
lo 是虚拟回环接口
ens33 物理以太网接口
docker0 Docker默认创建的虚拟网桥
# 问题：docker 是如何处理容器网络访问的？
~~~

~~~shell
# root@ubuntu:~# docker run -d -P --name tomcat01 tomcat

# 查看容器的内部网络地址 ip addr
root@1a65fff154ba:/usr/local/tomcat# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0@if6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether de:9e:91:cd:d9:92 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

# 思考。linux 能不能ping 通容器内部！
root@ubuntu:~# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.513 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.064 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.053 ms
64 bytes from 172.17.0.2: icmp_seq=4 ttl=64 time=0.053 ms

# linux 可以ping通docker容器内部
~~~

> 原理

1、我们每启动一个docker容器，docker就会给docker容器分配一个ip，我们只要安装了docker，就会有一个网卡 docker0 桥接模式，使用的技术是 evth-pair 技术！

再次测试 ip addr

~~~shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:1a:f4:d3 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.1.226/24 brd 192.168.1.255 scope global dynamic noprefixroute ens33
       valid_lft 256551sec preferred_lft 256551sec
    inet6 fe80::41d9:6566:f1ef:3d0c/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:8f:8d:c8:dd:78 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::8f:8dff:fec8:dd78/64 scope link 
       valid_lft forever preferred_lft forever
6: vetha8da171@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether fa:06:f3:99:87:3e brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::f806:f3ff:fe99:873e/64 scope link 
       valid_lft forever preferred_lft forever

~~~

2、在启动一个容器测试,又多了个一个网卡

~~~shell
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:1a:f4:d3 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.1.226/24 brd 192.168.1.255 scope global dynamic noprefixroute ens33
       valid_lft 256473sec preferred_lft 256473sec
    inet6 fe80::41d9:6566:f1ef:3d0c/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:8f:8d:c8:dd:78 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::8f:8dff:fec8:dd78/64 scope link 
       valid_lft forever preferred_lft forever
6: vetha8da171@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether fa:06:f3:99:87:3e brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::f806:f3ff:fe99:873e/64 scope link 
       valid_lft forever preferred_lft forever
7: vethf173d21@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
    link/ether ae:59:ab:31:cc:4c brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::ac59:abff:fe31:cc4c/64 scope link 
       valid_lft forever preferred_lft forever
~~~

~~~shell
# 我们发现这个容器带来网卡，都是一对对的
# evth-pair 就是一对的虚拟设别接口，他们都是成对出现的，一段连着协议，一段彼此相连
# 正因为有这个特性，evth-pair 充当一个桥梁，连接各种虚拟网络设备的
# OpenStac，Docker容器之间的连接，OVS的连接，都是使用 evth-pair 技术
~~~

3、我们来测试 tomcat01 和 tomcat02 是否可以 ping 通

 结论tomcat01 和 tomcat02 是公用的一个路由器，docker0。
所有的容器不指定网络的情况下，都是 docker0 路由的，docker会给我们的容器分配一个默认的可用IP



> 小结

Docker 使用的是Linux的桥接，宿主机中是一个Docker容器的网桥 docker0.

## --link

> 思考一个场景，我们编写了一个微服务，database url=ip：，项目不重启，数据库ip换掉了，我们希望可以处理这个问题，可以用名字来进行访问容器？

~~~shell
root@ubuntu:~# docker exec -it tomcat02 ping tomcat01
ping: tomcat01: Name or service not known

# 如何可以解决呢？
# 通过--link 既可以解决网络连通问题
root@ubuntu:~# docker run -d -P --name tomcat03 --link tomcat02 tomcat
8bf5a2ee6e7049e05963b30c85e780867cdade610f660a489cb7a0889d0e3d86
root@ubuntu:~# docker exec -it tomcat03 ping tomcat02

# 反向可以ping通吗？
root@ubuntu:~# docker exec -it tomcat02 ping tomcat03
ping: tomcat03: Name or service not known
~~~

tomcat03就是在本地配置了tomcat02的配置

~~~shell
root@ubuntu:~# docker exec -it tomcat03 cat /etc/hosts
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::	ip6-localnet
ff00::	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.3	tomcat02 6c4698162e17
172.17.0.4	8bf5a2ee6e70

~~~

本质探究：--link 就是我们在hosts配置中增加了一个 172.17.0.3 tomcat02 6c4698162e17

现在使用docker 已经不建议使用--link了

自定义网络！不适用docker0！

docker0问题：不支持容器名连接访问

## 自定义网络

> 查看所有的docker网络

~~~shell
root@ubuntu:~# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
936e838751de   bridge    bridge    local
701b4ad34db0   host      host      local
8737290d6830   none      null      local
~~~

**网络模式**

bridge：桥接 docker（默认）

none：不配置网络

host：和宿主机共享网络

container：容器网络连通！（用的少！）

测试

~~~shell
# 我们直接启动的命令 --net bridge，而这个就是我们的docker0
docker run -d -P --name tomcat01 tomcat
docker run -d -P --name tomcat01 --net bridge tomcat

# docker0特定： 默认，域名不能访问， --link可以打通连接！

# 我们可以自定义一个网络！
# --driver bridge
# --subnet 192.168.0.0/16   192.168.0.1 ~ 192.168.255.255
# --gateway 192.168.0.1
root@ubuntu:~# docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
0af59b86e40cfbcea5fbcfdb6bccabbc9be9c9d4faed7efcf1cf03ce69f148af

Run 'docker --help' for more information
root@ubuntu:~# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
936e838751de   bridge    bridge    local
701b4ad34db0   host      host      local
0af59b86e40c   mynet     bridge    local
8737290d6830   none      null      local


~~~



创建自己的网络

~~~shell
root@ubuntu:~# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "0af59b86e40cfbcea5fbcfdb6bccabbc9be9c9d4faed7efcf1cf03ce69f148af",
        "Created": "2025-07-29T20:56:02.470363563-07:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

# 再次测试ping连接
root@ubuntu:~# docker exec -it tomcat-net-01 ping 192.168.0.3

# 现在不使用--link
root@ubuntu:~# docker exec -it tomcat-net-01 ping tomcat-net-02


~~~
