<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="" href="#">&nbsp;&nbsp;</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="data.total > 0">
            <ul class="of">
              <li v-for="teacher in data.records" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/' + teacher.id" :title="teacher.name" target="_self">
                      <img :src="teacher.avatar" :alt="teacher.name" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      target="_self"
                      class="fsize18 c-666"
                    >{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- css样式 undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="goToPage(1)"
            >首页</a><!-- prevent表示阻止a标签的默认行为，a标签默认行为是跳转，这里阻止了让点击a标签触发执行我自己定义的方法 -->

            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="goToPage(data.current-1)"
            >&lt;</a><!-- 如果没有上一页，这个就不能点击 -->

            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="goToPage(page)"
            >{{ page }}</a>

            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="goToPage(data.current == data.pages ? data.pages : (data.current+1))"
            >&gt;</a>

            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="goToPage(data.pages)"
            >末页</a>

            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher/teacher";
export default {
  //换一种写法，不同于以往的写法
  //异步调用，只会调用一次
  //params: 相当于之前 this.$route.params.id  等价  params.id
  asyncData({ params, error }) {
    return teacherApi.frontPageTeacher(1, 4).then(response => {
      // console.log("response" + response);

      // console.log("response.data.data" + response.data.data);

      //遍历出一个js对象的所有属性的信息 var obj = {k1:v1,k2:v2};
      // var msg ="";
      //             for(var name in response.data.data){
      //                 msg += name+": "+ response.data.data[name]+"\r\n ";
      //             }
      //             alert(msg);

      return { data: response.data.data.result }; //这里面的return data:相当于以前的写法，在当前的vue页面定义了一个data变量
    });
  },

  methods: {
    //由于没有使用element-ui分页组件，分页自己手撸
    //分页切换的方法
    goToPage(page) {
      teacherApi.frontPageTeacher(page, 4).then(response => {
        this.data = response.data.data.result; //前端return data:在当前vue页面定义了一个变量为data
      });
    }
  }
};
</script>
