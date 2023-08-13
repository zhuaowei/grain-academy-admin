# dev-note-week3

## 1、内容介绍

完成了课程分类的展示和添加。展示采用树形结构进行不同层级的展示，只能通过excel进行分类添加。

## 2、开发内容

主要设计4个文件的添加或者修改。具体内容参考代码和注释。

1. public/subject-module.xlsx 分类模板文件下载，用户可以根据该模板修改添加课程分类。
2. src/api/edu/subject/index.js 课程分类的api文件，包括上传和查询接口。
3. src/router/index.js 添加课程分类的路由。
4. src/views/edu/subject/index.vue 课程分类的主页面，包括上传和查询。