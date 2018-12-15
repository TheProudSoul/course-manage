<template>
  <!-- 按钮统一为“确认” -->
  <!-- 使用input动态绑定value -->
  <div class="content">
    <div class="new-assign-header">
      <h1 class="title">{{title}}</h1>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <hr color="#d3d3d3" style="margin-bottom: 10px; margin-top: 5px"/>
    </div>
    <el-form
      :model="assignmentInfo"
      ref="assignmentInfo"
      label-width="50px"
      label-position="left"
      class="form-assign"
    >
      <el-form-item class="item-title" label="标题：" label-width="60px">
        <el-input
          type="text"
          v-model="assignmentInfo.name"
          placeholder="请输入作业名称"
          clearable="true" style="margin-left: 40px"></el-input>
      </el-form-item>
      <el-form-item class="item" label="截止时间：" label-width="100px">
        <el-input
          type="text"
          v-model="assignmentInfo.deadline"
          placeholder="请输入截止时间"
          clearable="true"></el-input>
      </el-form-item>
      <el-form-item class="item" label="作业要求：" label-width="100px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 7}"
          v-model="assignmentInfo.content"
          placeholder="请输入作业要求"
          clearable="true"></el-input>
      </el-form-item>
      <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :data="params"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
            <el-button class="submit" size="small" @click="submit">提交</el-button>
          </el-upload>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      assignmentInfo: {
        section_id: '',
        // 去api看看
        name: '',
        content: '',
        deadline: '',
        file_id: '',
        file_name: ''
      }
    }
  },
  created () {
    console.log(this.$route.params.section_id)
  },
  computed: {
    title () {
      if (this.$route.params.operation === 'add') {
        return '添加作业'
      } else {
        return '修改作业'
      }
    }
  },
  methods:{
    back(){this.$router.go(-1)}
  }
}
</script>
<style>
  .title{
    display: inline-block;
  }
  .form-assign{
    margin-top: 30px;
  }
  .item-title{
    margin-right: 240px;
    margin-left: 300px;
    font-weight: bold;
  }
  .item{
    margin-right: 200px;
    margin-left: 300px;
    margin-top: 30px;
    font-weight: bold;
  }
</style>
