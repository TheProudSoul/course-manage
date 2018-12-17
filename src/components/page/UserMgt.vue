<template>
  <div class="content-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3 style="float:left">{{type}}用户管理</h3>
        <el-button style="float: right" type="primary" @click="handleAdd">
          <i class="fa fa-plus" aria-hidden="true"></i>
          添加{{type}}用户
        </el-button>
      </div>
      <div align="center">
      <el-collapse accordion @change="fetchUserList" style="width:95%">
        <el-collapse-item
          v-for="school in schoolList"
          :key="school.id"
          :title="school.name"
          :name="school.id"
        >
          <el-table :data="userList" style="width: 100%">
            <el-table-column v-if="type=='学生'" type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="学生姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="学生 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="所属学院">
                    <span>{{ props.row.school }}</span>
                  </el-form-item>
                  <el-form-item label="专业">
                    <span>{{ props.row.major }}</span>
                  </el-form-item>
                  <el-form-item label="年级">
                    <span>{{ props.row.grade }}</span>
                  </el-form-item>
                  <el-form-item label="班级">
                    <span>{{ props.row.class }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column :label="type+'ID'" prop="id"></el-table-column>
            <el-table-column :label="type+'姓名'" prop="name"></el-table-column>
            <el-table-column label="所属学院" prop="school"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      </div>
    </el-card>

    <!-- 添加用户弹框 -->
    <el-dialog :title="'添加'+type+'用户'" :visible.sync="addFormVisible">
      <el-form :hide-required-asterisk="false" label-width="120px" status-icon>
        <template v-if="type=='教师'">
          <el-form-item label="教师编号" required>
            <el-input  v-model="id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="教师姓名" required>
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院编号" required>
            <el-input v-model="school_id" autocomplete="off"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="学号" required>
            <el-input v-model="id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" required>
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院编号" required>
            <el-input v-model="school_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" required>
            <el-input v-model="major" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" required>
            <el-input v-model="grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" required>
            <el-input v-model="theClass" autocomplete="off"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import _ from "lodash";

const mapFields = (namespace, fields) => {
  return _.mapValues(fields, path => {
    return {
      get() {
        return _.get(this.$store.state[namespace], path);
      },
      set(value) {
        this.$store.commit(`${namespace}/updateUser`, { path, value });
      }
    }
  })
}

export default {
  data() {
    return {
      addFormVisible: false
    };
  },
  computed: {
    type: function() {
      if (this.$route.params.type == "student") {
        return "学生";
      } else {
        return "教师";
      }
    },
    ...mapFields("admin", {
      id: "userInfo.id",
      name: "userInfo.name",
      school_id: "userInfo.school_id",
      major: "userInfo.major",
      grade: "userInfo.grade",
      theClass: "userInfo.class"
    }),
    ...mapState({
      schoolList: state => state.admin.schoolList,
      userList: state => state.admin.userList,
      userInfo: state => state.admin.userInfo
    })
  },
  created() {
    this.$store.dispatch("admin/getSchool")
  },
  methods: {
    fetchUserList(school_id) {
      if (school_id) {
        this.$store.dispatch("admin/getUser", {
          type: this.$route.params.type,
          school: school_id
        })
      }
    },
    handleAdd() {
      this.$store.dispatch("admin/initUserInfo", this.$route.params.type);
      this.addFormVisible = true;
    },
    
    handleEdit(index, row) {
      this.$alert("没有这个功能哟", "提示", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },

    handleDelete(index, row) {
      this.$confirm('是否确认删除"' + row.name + '"这名学生?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http("post", "/currican/account/student", {
            action: "delete",
            student_id: row.id
          }).then(res => {
            if (res.data.status == 0) {
              this.$message({ type: "success", message: "删除成功!" });
              setTimeout(() => {
                this.$router.go(0);
              }, 1000);
            } else {
              this.$message({ type: "info", message: res.data.error_msg });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    addUser() {
      for(let key in this.userInfo){
        if(this.userInfo[key]===''){
          this.$notify({
            title: '警告',
            message: '请确认所有用户信息均不为空！',
            type: 'warning'
          })
          return
        }
      }
      this.$http('post', '/currican/account/'+'type',this.userInfo).then(res=>{
        if (res.data.status == 0) {
              this.$message({ type: "success", message: "添加成功!" });
              setTimeout(() => {
                this.$router.go(0);
              }, 1000);
            } else {this.$message({ type: "info", message: res.data.error_msg })}
      })
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>