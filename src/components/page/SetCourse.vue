<template>
    <div class="content-box" >
        <div class="content">
            <div>
                        <el-button
                          class="btn-return"
                          icon="el-icon-back"
                          circle
                          style="align-content: left; float: left"
                          @click="back"
                        ></el-button>
                        <h3
                          class="title"
                          style="font-size: 24px; margin-top: 10px; margin-bottom: 15px"
                        >添加课程</h3>
            </div>
            <hr color="gold">
            <div>
                <div class="desc">
                        <p class="id" style="float:left">课程编号：</p>
                        <div class="id-content">
                              <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="id">{{this.id}}</el-input>
                        </div>
                </div>
                <div class="desc">
                        <p class="credit" style="float:left">课程学分：</p>
                        <div class="credit-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="credit">{{this.credit}}</el-input>
                        </div>
                </div>
                <div class="date">
                        <p class="start-year" style="float:left">开课年份：</p>
                        <div class="year-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="year">{{this.year}}</el-input>
                        </div>
                </div>
                <div class="date">
                        <p class="start-semester" style="float:left">开课学期：</p>
                        <div class="semester-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="semester">{{this.semester}}</el-input>
                        </div>
                </div>
                <div class="time">
                        <p class="course-time" style="float:left">上课时间：</p>
                        <div class="time-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="time">{{this.time}}</el-input>
                        </div>
                </div>
                <div class="time">
                        <p class="course-week" style="float:left">上课周：</p>
                        <div class="week-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id = "week">{{this.week}}</el-input>
                        </div>
                </div>
                <div class="where">
                        <p class="building" style="float:left">教学楼：</p>
                        <div class="building-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id = "building">{{this.building}}</el-input>
                        </div>
                </div>
                <div class="where">
                        <p class="classroon" style="float:left">教室：</p>
                        <div class="classroom-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id = "classroom">{{this.building}}</el-input>
                        </div>
                </div>
                <div class="teacher">
                        <p class="tea" style="float:left">教室编号：</p>
                        <div class="teacher-content">
                                <el-input type="textarea" :autosize="{ maxRows: 1}" placeholder="请输入内容" v-model="content" class="id-c" id="tea">{{this.teacher}}</el-input>
                        </div>
                </div> 
            </div>   
                <div class="buttons" align="center">
                        <el-button @click="submit" class="confirm">确认</el-button>
                        <el-button @click="clear" class="clear">清空</el-button>
                </div>
          </div>

        </div>
    </div>
</template>

<script>
    export default{
        data(){
               return{
                    id:'',
                    credit:'',
                    year:'',
                    semester:'',
                    time:'',
                    week:'',
                    building:'',
                    classroom:'',
                    teacher:''
               };
        },
        methods:{
             submit(){
                this.$http("post", "/test_submit", {
                        action: "post",
                        course_id: this.id,
                        credit: this.credit,
                        year: this.year,
                        semester: this.semester,
                        time_slot: this.time,
                        week: this.week,
                        building: this.building,
                        room: this.classroom,
                        teacher_id :this.teacher
                    });
             },
             clear(){
                document.getElementById('id').value = '';
                document.getElementById('credit').value = '';
                document.getElementById('year').value = '';
                document.getElementById('semester').value = '';
                document.getElementById('time').value = '';
                document.getElementById('week').value = '';
                document.getElementById('building').value = '';
                document.getElementById('classroom').value = '';
                document.getElementById('tea').value = '';

             },
             back() {
                this.$router.go(-1);
             }
        }
    };
</script>

<style scoped>
.content-box{
    margin-right: 30px;
}
.desc,
.date,
.time,
.where,
.teacher
{
  text-align: left;
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 18px;
}
.id-content,
.credit-content,
.year-content,
.semester-content,
.time-content,
.week-content,
.building-content,
.classroom-content,
.teacher-content{
    margin-left: 120px;
}
.id-c{
    width: 300px;
}
.clear,
.confirm {
  padding-left: 30px;
  padding-right: 30px;
  background: cornflowerblue;
  color: #fff;
  font-size: 13px;
  
}
</style>