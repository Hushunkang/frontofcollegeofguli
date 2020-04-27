<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程列表开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="queryAllCourse()" :class="{active:allIndex==1}">全部</a>
                </li>
               <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="searchOne(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
               <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.title" href="#" @click="searchTwo(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="关注度" href="javascript:void(0);" @click="searchBuyCount()">关注度
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in data.records" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span><!-- 价格等于0前端会显示免费，不等于0这一块组件就不显示 -->   
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="goToPage(1)">首页</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="goToPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="goToPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="goToPage(data.current == data.pages ? data.pages : (data.current+1))">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="goToPage(data.pages)"
          >末页</a>
        <div class="clear"/>
      </div>
    </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from '@/api/course/course';
export default {
  data(){
    return {
      page:1, //当前页
      data:{},  //课程列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表

      searchObj: {}, // 查询表单对象

      oneIndex:-1,//做一级课程分类显示效果，如果选中某一个一级课程分类，它被选择了背景变红，下面几个参数作用类似
      twoIndex:-1,
      allIndex: 1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
  created(){
    //第一次查询课程
    this.initCourseFirstPage();

    //查询所有课程分类
    this.initSubject();
  },
  methods:{
    //点击全部，查询所有课程信息
    queryAllCourse(){
     this.searchObj = {};
     this.subSubjectList = [];
     this.initCourseFirstPage();
     this.initSubject();
     this.oneIndex = -1;
     this.allIndex = 1;
    },

    //查询第一页课程的数据
    initCourseFirstPage(){
      courseApi.frontPageCourse(1,8,this.searchObj)
      .then(response => {
        this.data = response.data.data.result;
      });
    },

    //查询所有一级课程分类（这个一级课程分类里面有二级课程分类的信息）
    initSubject(){
      courseApi.getAllSubject()
      .then(
        response => {
          this.subjectNestedList = response.data.data.list
        }
      );
    },

    //分页切换的方法 分页查询课程
    //分页切换的方法
    goToPage(page) {
      courseApi.frontPageCourse(page, 8,this.searchObj).then(response => {
        this.data = response.data.data.result; //前端return data:在当前vue页面定义了一个变量为data
      });
    },

    //点击某个一级分类，查询对应二级分类
    searchOne(subjectParentId,index) {
      //把传递index值赋值给oneIndex,为了active样式生效
      this.oneIndex = index

      this.twoIndex = -1
      this.searchObj.subjectId = ""
      this.subSubjectList = []

      this.allIndex = 0;

      //把一级分类点击id值，赋值给searchObj
      this.searchObj.subjectParentId = subjectParentId

      //点击某个一级分类进行条件查询出课程信息，默认找第一页数据
      this.goToPage(1)//this.goToPage(this.page)

      //拿着点击的一级分类id 和 所有一级分类id进行比较，
      //如果id相同，从一级分类里面获取对应的二级分类
      for(let i=0;i<this.subjectNestedList.length;i++) {
        //获取每个一级分类
        var oneSubject = this.subjectNestedList[i]
        //比较id是否相同
        if(subjectParentId == oneSubject.id) {
          //从一级分类里面获取对应的二级分类
          this.subSubjectList = oneSubject.children
        }
      }
    },

    //点击某个二级分类实现查询
    searchTwo(subjectId,index) {
      //把index赋值,为了样式生效
      this.twoIndex = index
      //把二级分类点击id值，赋值给searchObj
      this.searchObj.subjectId = subjectId
      //点击某个二级分类进行条件查询
      this.goToPage(1)//this.goToPage(this.page)
    },

    //根据关注度排序，业务上面使用销售数量来表示关注度，销售数量多的课程表示其关注度高
    searchBuyCount() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = "1"
      this.gmtCreateSort = ""
      this.priceSort = ""

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.goToPage(1)//this.goToPage(this.page)
    },

    //最新排序
    searchGmtCreate() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = ""
      this.gmtCreateSort = "1"
      this.priceSort = ""

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.goToPage(1)
    },

    //价格排序
    searchPrice() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      this.priceSort = "1"

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.goToPage(1)
    }
  }
};
</script>
<style>
/* 定义一些css样式，类选择器 */
.active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>
