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
      <h1>登录账户</h1>

      <!-- http://element.eleme.io/#/en-US/component/tabs#card-style -->
      <el-tabs type="card" @tab-click="handleLoginType">
        <el-tab-pane label="学生"></el-tab-pane>
        <el-tab-pane label="教师"></el-tab-pane>
        <el-tab-pane label="管理员"></el-tab-pane>
      </el-tabs>
      <!-- http://element.eleme.io/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="账号" prop="account" label-width="50px">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd" label-width="50px">
          <el-input type="password" v-model="loginForm.passwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitInfo" class="submit-btn">登 录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      loginForm: {
        account: "",
        passwd: "",
        group: 3
      },

      loginRules: {
        account: [
          {
            message: "请输入账号",
            validator: validateId,
            trigger: "blur"
          }
        ],
        passwd: [
          {
            message: "请输入密码",
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    submitInfo() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http("post", "/currican/login", this.loginForm).then(res => {
            if (res.data.status == 0) {
              if (this.loginForm.group == 3) {
                this.$store.commit("login/userType", "student");
                this.$router.push("home");
              } else if (this.loginForm.group === 2) {
                this.$store.commit("login/userType", "teacher");
                this.$router.push("home");
              } else if (this.loginForm.group === 1) {
                this.$store.commit("login/userType", "admin");
                this.$router.push("home");
              }              
            } else {
              this.$message.error("用户名或密码错误");
            }
          });
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
    },

    handleLoginType(tab, event) {
      this.loginForm.group = 3 - tab.index;
    }
  }
};
</script>

<style scoped>
h1 {
  font-family: serif;
  font-size: 21px;
  color: black;
  padding-top: 10px;
  padding-bottom: 20px;
}
.login-wrap {
  position: relative;
  width: 100%;
  background-image: url(../../assets/bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  height: 100%;
  background-size: 100%;
}
.hearder {
  padding-top: 20px;
  padding-bottom: 30px;
  background-color: rgba(159, 125, 100, 1);
  position: relative;
  font-family: Microsoft YaHei;
}

.box-card {
  height: 55%;
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.85;
}
.cm-title {
  margin-bottom: 8px;
  font-size: 28px;
  color: aliceblue;
  font-weight: bold;
}
.logo {
  width: 50px;
  height: 50px;
  vertical-align: bottom;
}
.header-right {
  position: absolute;
  top: 40px;
  right: 40px;
}
.header-right a {
  color: white;
  text-decoration: none;
}
.demo-ruleForm {
  margin: 20px 70px 30px 60px;
}
.submit-btn {
  margin-top: 20px;
  opacity: 1;
  font-size: 14px;
}
</style>
