# dev-note-week2

## 1、前端工程搭建

### 1.1、克隆项目

本项目前端使用 vue 进行开发，github 上有现成的 vue 后端管理框架，可以根据自己的需要进行修改。第一步就是先将项目克隆下来。

> 项目地址 -> https://github.com/PanJiaChen/vue-admin-template.git
>
> 可以看看项目的说明文档进行部署。

```
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

### 1.2、修改登录接口

这个模板是使用自己的登录接口，我们需要将它换成自己的。由于现在还没有写权限认证授权功能，先使用一个假接口，进去系统即可。

登录功能主要包含两个主要接口，我们需要根据它需要的返回结果，自己写一些数据返回。

其中之一的接口是登录接口 /user/login ，它只需要返回一个 token。

其中之二的接口是用户信息接口 /user/info ，根据token获取用户的信息，包括avatar、introduction、name和roles。

在后端新建一个控制类，专门返回上面所需的信息。

```java
@RestController
@RequestMapping("/admin/user")
@CrossOrigin
public class LoginController {

    @PostMapping("login")
    public ResultBody login() {
        return ResultBody.ok().data("token", "123456");
    }

    @GetMapping("info")
    public ResultBody info() {
        return ResultBody.ok()
                .data("avatar", "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
                .data("introduction", "I am a super administrator")
                .data("name", "user")
                .data("roles", "[admin]");
    }

}
```

因为需要有跨域问题，所以需要加上 CrossOrigin 注解。其他的接口也是，需要加上这个注解。

### 1.3、修改前端配置

1、在 `src/api/user.js` 中，定义了用户相关的请求配置，包括请求URL、请求方法、和请求参数。需要跟后端的请求保持一致。

2、在 `src/utils/request.js` 中，定义了接收数据成功和失败的配置，在 49 行左右可以修改请求成功的状态码，需要跟后端保持一致。

3、在 `.env.delelopment` 中可以配置开发环境的配置，需要修改 `VUE_APP_BASE_API` 为自己后端的运行地址。

```
VUE_APP_BASE_API = 'http://localhost:8001/'
```

这样，前端发送请求时，就会拼接上这个链接。例如登录接口 `http://localhost:8001/admin/user/login`

## 2、讲师模块

### 2.1、路由配置

在管理系统左侧的菜单添加一个讲师管理的菜单，需要配置 `src/router/index.js` 

```js
{
  path: '/edu', // 访问的地址
  component: Layout,
  redirect: '/edu/teacher', // 重定向地址
  name: 'Example',
  meta: { title: '讲师管理', icon: 'el-icon-s-help' }, // title 显示标题
  children: [ // 配置子目录
    {
      path: 'teacher',
      name: 'Teacher',
      component: () => import('@/views/edu/teacher/index'), // 页面位置
      meta: { title: '讲师列表', icon: 'table' } // 子目录标题
    }
  ]
}
```

### 2.2、讲师列表页面

新建 `src/views/edu/teacher/index.vue` 文件，在这里定义讲师列表的显示页面，具体可以到目录中找。

### 2.3、定义请求接口

讲师管理包括讲师的增删改查，这里使用模板的 request 模块定义请求配置。具体文件参考 `src/api/edu/teacher/index.js`

> 由于我自定义的请求接口（讲师分页条件查询）同时使用了两种传递参数的方式，在写请求时要特别注意。

### 2.4、post 请求参数

post 请求数据有两种传递方式，一是请求参数，二是请求体。

请求参数是 `page?current=1&limit=10` 将请求数据写在请求链接之后。请求体是将 json 数据写到请求体中，这时候后端需要使用 RequestBody 注解接收请求体中的数据。如果没有注解，默认就是请求参数的方式。

get只有第一种数据传输方式。

在发送请求时，get请求使用 data 或者 params，数据都会拼接到请求链接中，因为 axios 会自动修改。post 请求的 params 会拼接到链接中，data 会放到请求体中。

### 2.5、讲师添加和修改

上面的讲师管理页面可以完成讲师的分页条件查询和删除，要修改和添加一个讲师还需要一张表单来填写。

1、新建 `src/components/edu/TeacherForm/index.vue` 文件。

2、在 `src/views/edu/teacher/index.vue` 引入组件并使用。

3、具体使用方式参考文件及其注释。

到此为止，讲师管理的部分就完全结束了。
