import request from '@/utils/request'

export default {
    getSubjects() {
        return request({
            url: '/edu/subject/all',
            method: 'get'
        })
    }
}