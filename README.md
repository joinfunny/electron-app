# 项目说明
> 本项目基于`node-express`框架构建，旨在创建前后端分离的／可一键部署的独立web应用。规范开发流程，节省项目搭建成本，构建快速高效的团队开发解决方案。

1. **项目整体结构**

项目基于`node-express` 框架搭建，静态页面采用[`Vue Admin-UI`](http://wiki.dataengine.com/pages/viewpage.action?pageId=13241520)。

2. **项目模块**
- **静态资源**
- **Web应用运行时**
    - **应用基础模块**
        - **常用方法集**
        - **全局配置**
        - **业务规则**
        - **消息资源**
    - **权限体系**
    - **模版引擎**
    - **路由与服务**
    - **Session持久化**
    - **视图解析器**
- **视图**
- **路由**
- **服务**

3. **配置文件全解析**

4. **开发与线上环境**

    4.1 **开发环境**

      4.1.1 编码规范
      _请参考[Admin-UI](http://wiki.dataengine.com/pages/viewpage.action?pageId=13241520)的编码规范_

      4.1.2 开发流程

    - 入口视图页面

    - Router路由定义
    - Service服务接口定义
    - 远程服务接口调用（Node）

      4.1.3 前后端开发规范约定


    4.2 **线上环境**

采用Node PM2插件进行线上环境的部署，在启动时需要指定对应的环境变量`env=production`
