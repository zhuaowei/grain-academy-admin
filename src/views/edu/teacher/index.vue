<template>
  <div>
    <el-container>
      <!-- 
        使用容器包含三部分内容
          header 放置查询条件和添加按扭（为了使查询垂直居中，需要在其中再套一层容器）
          main   放置表格
          footer 放置分页插件
       -->
      <el-header>
        <el-container>
          <el-main>
            <!-- BEGIN: 条件查询表单 -->
            <!-- 
              表单绑定 teacherQuery 查询条件，还有一个添加按扭
             -->
            <el-form :inline="true" :model="teacherQuery" class="demo-form-inline" style="vertical-align=middle">
              <el-form-item label="姓名">
                <el-input v-model="teacherQuery.name" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item label="级别">
                <el-input v-model="teacherQuery.level" placeholder="级别（1 - 10）"></el-input>
              </el-form-item>
              <el-form-item label="开始日期">
                <el-date-picker
                  v-model="teacherQuery.startTime"
                  type="date"
                  placeholder="开始日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期">
                <el-date-picker
                  v-model="teacherQuery.endTime"
                  type="date"
                  placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getTeacherPageList">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addItem">添加</el-button>
              </el-form-item>
            </el-form>
            <!-- END: 条件查询表单 -->
          </el-main>
        </el-container>
      </el-header>
      <el-main>
        <!-- BEGIN: 表格主体 -->
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="list"
          stripe 
          border
          fit
          highlight-current-row
          style="width: 100%">
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column align="center" label="性别">
            <template slot-scope="scope">
              {{ scope.row.gender ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="年龄">
            <template slot-scope="scope">
              {{ scope.row.birth | getAge }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="introduce" label="简介">
          </el-table-column>
          <el-table-column align="center" prop="career" label="职称">
          </el-table-column>
          <el-table-column align="center" prop="contact" label="联系方式">
          </el-table-column>
          <el-table-column align="center" prop="address" label="家庭住址">
          </el-table-column>
          <el-table-column align="center" prop="gmtCreate" label="创建时间">
          </el-table-column>
          <el-table-column align="center" prop="gmtModified" label="修改时间">
          </el-table-column>
          <!-- 操作按扭 -->
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary"
                @click="updateItem(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger"
                @click="handleDeleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- END: 表格主体 -->
      </el-main>
      <el-footer>
        <!-- BEGIN: 分页插件 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, ->, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- END: 分页插件 -->
      </el-footer>
    </el-container>
    <!-- BEGIN: 讲师表单 -->
    <!-- 
      讲师表单，在添加和修改的时候会弹出
      refreshTable 是自定义事件，需要在组件中使用 this.$emit 触发此事件才能执行后面的方法
      -->
    <teacher-form ref="teacherForm" 
      @refreshTable="getTeacherPageList()" />
    <!-- END: 讲师表单 -->
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher/index'
import TeacherForm from '@/components/edu/TeacherForm/index'

export default {
  data() {
    return {
      // 查询条件，分页查询和条件查询
      currentPage: 1,
      pageSize: 10,
      dateRange: [],
      teacherQuery: {},
      total: 0,
      list: [],
      listLoading: false
    };
  },
  filters: {
    /* 过滤器，通过生日计算出本人的年龄 */
    getAge(value) {
      let birth = Date.parse(value)
      let now = Date.now()
      return Math.ceil((now - birth) / 31536000000)
    }
  },
  components: {
    /* 表单组件 */
    TeacherForm
  },
  created() {
    /* 在 vue 创建后执行的代码。此时可以访问 data 和 methods */
    this.getTeacherPageList();
  },
  methods: {
    /* 获取 讲师列表 和 分页数据 */
    getTeacherPageList() {
      this.listLoading = true
      teacher
        .getTeacherPage(this.currentPage, this.pageSize, this.teacherQuery)
        .then((res) => {
          this.total = res.data.total
          this.list = res.data.rows
          this.listLoading = false
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /* 当 表格页大小 发生改变时执行 */
    handleSizeChange(val) {
      this.pageSize = val
      this.getTeacherPageList()
    },
    /* 当 表格当前页 发生改变时执行 */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTeacherPageList()
    },
    /* 添加一项，打开表单 */
    addItem() {
      this.$refs.teacherForm.openDialog()
    },
    /* 修改一项，打开表单 */
    updateItem(id) {
      this.$refs.teacherForm.openDialog(id)
    },
    /* 删除一项 */
    deleteItem(index, id) {
      teacher.deleteTeacher(id)
        .then(res => {
          this.list.splice(index, 1)
          this.total -= 1
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
    },
    /* 控制删除一项记录，弹出确认框 */
    handleDeleteRow(index, row) {
      this.$confirm(`是否删除 ${row.name} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem(index, row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
};
</script>

<style>
</style>