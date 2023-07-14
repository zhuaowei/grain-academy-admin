<template>
  <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" @close="closeDialog">
    <!-- BEGIN: 表单 -->
    <!-- 
      属性
        dialogName            表单左上角标题
        dialogFormVisible     表单可见性
        dataForm              表单绑定的数据
        formLabelWidth        表单项的标签宽度
        formEleWidth          表单项的输入框宽度
      方法
        closeDialog           关闭弹窗的方法
        saveItem              点击确定的方法
     -->
    <el-form :model="dataForm" ref="dataForm"><!--- :model="attractionForm" --->
      <el-form-item lable="唯一ID" v-show="false" :label-width="formLabelWidth">
        <el-input aria-readonly="true" v-model="dataForm.id"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="dataForm.gender">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker
          v-model="dataForm.birth"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="dataForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="住址" :label-width="formLabelWidth">
        <el-input v-model="dataForm.address"></el-input>
      </el-form-item>
      <el-form-item label="级别" :label-width="formLabelWidth">
        <el-slider v-model="dataForm.level" show-input show-stops :min="1" :max="10" label="级别"></el-slider>
        <!-- <el-input v-model="dataForm.level"></el-input> -->
      </el-form-item>
      <el-form-item label="职称" :label-width="formLabelWidth">
        <el-input v-model="dataForm.career"></el-input>
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <el-input v-model="dataForm.introduce"></el-input>
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-input v-model="dataForm.avatar"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-slider v-model="dataForm.weight" show-input :min="1" :max="100" ></el-slider>
      </el-form-item>
      <!-- 图片上传 -->
      <!-- <el-form-item label="图片链接" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleUploadImage"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.image_url" :src="dataForm.image_url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <!-- <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-switch
          v-model="dataForm.enable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item> -->
    </el-form>
    <!-- END: 表单 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="saveItem">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import teacher from '@/api/edu/teacher/index'

export default {
  data() {
    return {
      dialogName: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formEleWidth: '400px',
      dataForm: {
        gender: true
      }
    }
  },
  created() {

  },
  methods: {
    /* 打开弹窗，确定标题 */
    openDialog(id) {
      if (id) {
        this.dialogName = '更新讲师'
        this.getItem(id)
      } else {
        this.dialogName = '添加讲师'
      }
      this.dialogFormVisible = true
    },
    /* 保存，包括修改和添加 */
    saveItem() {
      if (this.dataForm.id) {
        this.updateItem()
      } else {
        this.addItem()
      }
      // 触发事件，更新表格
      this.$emit('refreshTable')
      this.closeDialog()
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.dataForm = {}
      this.$refs.dataForm.resetFields()
      this.dialogFormVisible = false
    },
    /* 根据 id 获取一项记录 */
    getItem(id) {
      teacher.getTeacher(id)
        .then(res => {
          this.dataForm = res.data.item
          // 删除一些不需要的字段
          delete this.dataForm.gmtCreate
          delete this.dataForm.gmtModified
          delete this.dataForm.version
          delete this.dataForm.isDeleted
        })
        .catch(err => {
          console.log(err)
        })
    },
    /* 添加一项 */
    addItem() {
      teacher.addTeacher(this.dataForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
          console.log(err)
        })
    },
    /* 更新一项 */
    updateItem() {
      teacher.updateTeacher(this.dataForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>