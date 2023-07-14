import request from '@/utils/request'

export default {
    getTeacherPage(current, limit, teacherQuery) {
        return request({
            url: '/edu/teacher/page',
            method: 'post',
            params: {current, limit},
            data: teacherQuery
        })
    },
    deleteTeacher(id) {
        return request({
            url: '/edu/teacher/delete',
            method: 'delete',
            params: {id}
        })
    },
    getTeacher(id) {
        return request({
            url: `/edu/teacher/${id}`,
            method: 'get'
        })
    },
    addTeacher(teacher) {
        return request({
            url: '/edu/teacher/add',
            method: 'post',
            data: teacher
        })
    },
    updateTeacher(teacher) {
        return request({
            url: '/edu/teacher/update',
            method: 'post',
            data: teacher
        })
    }
}