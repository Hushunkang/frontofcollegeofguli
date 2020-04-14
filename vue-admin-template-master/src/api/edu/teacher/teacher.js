import request from '@/utils/request'

export default{
    //多条件组合查询带分页效果的讲师数据
    pageTeacherCondition(current,size,teacherQuery){
        return request({
            //url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+size,
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${size}`,//采用`这个字符来实现，后面用表达式取值
            method: 'post',
            // params
            //teacherQuery条件对象，后端@RequestBody注解表示我要获取json数据格式的用户请求参数并封装到我这个局部变量里面来
            //因为后端使用@RequestBody获取用户请求参数，那么前端应该传递json数据格式的用户请求参数
            //否则后端获取不到数据，data表示把条件对象转换为json数据格式然后传递到后端接口里面
            data: teacherQuery
          })
    },
    //逻辑删除讲师
    removeTeacher(id){
        return request({
            url: `/eduservice/teacher/removeTeacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
          })
    },
    //根据讲师id查询讲师
    getTeacherById(id){
        return request({
            url: `/eduservice/teacher/getTeacherById/${id}`,
            method: 'get'
          })
    },
    //修改讲师数据
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
          })
    }
}
