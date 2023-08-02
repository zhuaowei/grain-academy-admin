<template>
  <div>
    <el-container>
      <!-- <el-header></el-header> -->
      <el-container>
        <el-aside>
          <el-card>
            <div slot="header" class="clearfix">
              <span>文件上传</span>
            </div>
            <div class="card-content">

              <el-upload
                ref="upload"
                action="http://localhost:8001/edu/subject/upload"
                :auto-upload="false"
                :limit="1"
                :file-list="fileList"
                :on-success="handleUploadSuccess">
                <el-button slot="trigger" size="small" type="primary">
                  选取文件
                </el-button>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload">
                  上传到服务器
                </el-button>
              </el-upload>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="clearfix">
              <span>文件格式说明</span>
              <el-button style="float: right; padding: 3px 0" type="text" href="/subject-module.xlsx">模板下载</el-button>
            </div>
            <div class="text">
              <p>
                可以通过上传Excel文件的方式进行课程分类的添加。Excel文件的格式如下：
              </p>
              <p>包含两列，第一列为一级分类，第二列为二级分类。</p>
              <p>表格第一行 为标题，其余行为分类。下面是一个表格示例。</p>
            </div>
            <div>
              <el-table :data="subjectDemo">
                <el-table-column label="一级分类" prop="firstTierSubject">
                </el-table-column>
                <el-table-column label="二级分类" prop="secondTierSubject">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
          <!-- BEGIN: 树形控件 -->
          <el-tree
            :data="data"
            :props="treeProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
          >
          </el-tree>
          <!-- END: 树形控件 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import subject from "@/api/edu/subject/index"

export default {
  data() {
    return {
      // subject 分类示例
      subjectDemo: [
        {
          firstTierSubject: "前端",
          secondTierSubject: "HTML",
        },
        {
          firstTierSubject: "前端",
          secondTierSubject: "CSS",
        },
        {
          firstTierSubject: "前端",
          secondTierSubject: "JavaScript",
        },
        {
          firstTierSubject: "后端",
          secondTierSubject: "Java",
        },
        {
          firstTierSubject: "后端",
          secondTierSubject: "Spring",
        },
        {
          firstTierSubject: "后端",
          secondTierSubject: "JSP",
        },
        {
          firstTierSubject: "大数据",
          secondTierSubject: "Hadoop",
        },
      ],

      // 文件上传列表
      fileList: [],
      // 请求返回的 subject 列表
      data: [],
      // 定义树的节点树形，子节点的名字，节点的显示属性
      treeProps: {
        children: "children",
        label: "title",
      },
      // 过滤使用的字段
      filterText: "",
    }
  },
  created() {
    // 进入页面，获取树节点。添加监听器
    this.getSubjectTree()
    this.$watch("filterText", (newValue, oldValue) => {
      this.$refs.tree.filter(newValue)
    })
  },
  methods: {
    // 获取所有树节点
    getSubjectTree() {
      subject
        .getSubjects()
        .then((res) => {
          this.data = res.data.subjects
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 节点过滤函数
    filterNode(value, data) {
      if (!value) return true
      // 使用的是自定义的名字 title
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    // 手动提交函数
    submitUpload() {
      // 提交
      this.$refs.upload.submit()
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.getSubjectTree()
      this.$message({
        type: "success",
        message: "上传成功",
      })
    }
  },
}
</script>

<style>
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.card-content {
  height: 120px;
}
</style>