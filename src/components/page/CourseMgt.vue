<template>
  <div class="content-box">
    <el-button type="primary" icon="el-icon-edit" @click="setCourse">发布课程</el-button>
    <el-collapse accordion @change="fetchCourseList">
      <el-collapse-item
        v-for="school in schoolList"
        :key="school.id"
        :title="school.name"
        :name="school.id"
      >
        <el-table :data="courseList" style="width: 100%">
          <el-table-column prop="course_name" label="课程名称" width="auto"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="getCourse(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="info" @click="getDiscuss(scope.$index, scope.row)">讨论区</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      schoolList: state => state.admin.schoolList,
      courseList: state => state.admin.courseList
    })
  },
  created() {
    this.$store.dispatch("admin/getSchool");
  },
  methods: {
    fetchCourseList(school_id) {
      if (school_id) {
        this.$store.dispatch("admin/getCourse", school_id);
      }
    },
    setCourse() {
      this.$router.push({
        name: "setCourse",
        params: {
          operation: "add"
        }
      });
    },
    getCourse(index, row) {
        console.log(row.course_name)
      this.$router.push({
          name: 'coursehome',
          params: {
              course: row.course_id
          }
      })
    },
    getDiscuss(index, row) {
      console.log(index, row);
    }
  }
};
</script>
