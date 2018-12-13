<template>
    <div class="hearder">
      <!-- LOGO (图片) -->
      <div style="text-align: left; margin-left: 40px">
        <img src="../../assets/logo.png" class="logo">
        <span class="cm-title">课程管理网站</span>
      </div>
      <div class="header-right">
          <div class="user-avator"><img src="../../assets/avator.png"></div>
          <el-button type="text" class="logout" @click="logout">退出</el-button>
      </div>
    </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.setItem('role', '')
      this.$store.commit('login/userType', localStorage.getItem('role'))
      this.$router.push('/login');
    }
  }
}
</script>


<style>
.hearder {
  padding-top: 20px;
  padding-bottom: 30px;
  background-color:rgba(159, 125, 100, 1);
  position: relative;
  font-family: Microsoft YaHei;
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
  top: 20px;
  right: 40px;
}
.header-right .logout {
  color: white;
  text-decoration: none;
}

.user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
}
</style>
