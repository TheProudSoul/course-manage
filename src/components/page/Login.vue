<template>
  <div class="login-wrap">
    <div class="hearder">
      <!-- LOGO (图片) -->
      <div style="text-align: left; margin-left: 40px">
        <img src="../../assets/logo.png" class="logo">
        <span class="cm-title">课程管理网站</span>
      </div>
      <div class="header-right">
        <!-- ABOUTUS (形状) -->
        <a href="#">ABOUT US</a>
      </div>
    </div>
    <!-- 登录选项卡 (组 合) -->
    <el-card class="box-card">
        <!-- http://element.eleme.io/#/en-US/component/tabs#card-style -->    
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane label="学生"></el-tab-pane>
          <el-tab-pane label="教师"></el-tab-pane>
          <el-tab-pane label="管理员"></el-tab-pane>
        </el-tabs>
        <div class="cm-title">登录账户</div>
        <!-- http://element.eleme.io/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号">
            <!-- http://element.eleme.io/#/zh-CN/component/input#ji-chu-yong-fa -->
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
    </el-card>  

  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {},
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  background-image: url(../../assets/bg.jpg);
  background-repeat:no-repeat;
  background-position:center;
  position: relative;
  height:100%;
  background-size: 100%;

}
.hearder {
  padding-top: 20px;
  padding-bottom: 30px;
  background-color:rgba(159, 125, 100, 1);
  position: relative;
  font-family: Microsoft YaHei;
}

.box-card {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
}
.cm-title{
  margin-bottom: 8px;
  font-size:28px;
  color: aliceblue;
  font-weight: bold;
}
.logo {
  width: 50px;
  height: 50px;
  vertical-align: bottom;
}
.header-right{
  position: absolute;
  top: 40px;
  right: 40px;
}
.header-right a {
  color: white;
  text-decoration: none;
}
</style>