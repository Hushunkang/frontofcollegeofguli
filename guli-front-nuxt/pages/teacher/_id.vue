<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">讲师介绍</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- 讲师基本信息 -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="eduTeacher.avatar">
            </section>
            <h3 class="hLh30">
              <!-- 方式一 -->
              <!-- <span class="fsize24 c-333">{{eduTeacher.name}}&nbsp;
                {{ eduTeacher.level===1?'高级讲师':'首席讲师' }}</span> -->
                <!-- 方式二 -->
                <span v-if="eduTeacher.level===1" class="fsize24 c-333">{{eduTeacher.name}}&nbsp;
                高级讲师</span>
                <span v-if="eduTeacher.level===2" class="fsize24 c-333">{{eduTeacher.name}}&nbsp;
                首席讲师</span>
            </h3>
            <section class="mt10">
              <span class="t-tag-bg">{{eduTeacher.intro}}</span>
            </section>
            <section class="t-infor-txt">
              <p
                class="mt20"
              >{{eduTeacher.career}}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">主讲课程</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courses.length==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-for="course in courses" :key="course.id">
            <ul class="of">
              <li>
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" >
                    <div class="cc-mask">
                      <a href="#" title="开始学习" target="_blank" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a href="#" :title="course.title" target="_blank" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher/teacher";
export default {

  asyncData({ params, error }) {
    return teacherApi.frontGetTeacherById(params.id)//params.id获取路径中的值，此处就是teacher/index.vue里面<a :href="'/teacher/' + teacher.id"
    //为什么是params.id不是params.abc，原因是这个id和_id.vue一致，如果是_abc.vue这里要写params.abc才可以获取到路径中的值
    //别人框架这么设计的，你遵守规范去使用它这个框架即可
      .then(response => {
        return {
          eduTeacher: response.data.data.eduTeacher,
          courses: response.data.data.courses
        }
      })
  }

};
</script>
