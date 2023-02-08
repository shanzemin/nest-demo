import { Schema } from 'mongoose'

export const BooksSchema = new Schema({
    // 书名
    name: {
        type: String,
        required: true,
        default: ''
    },
    // 作者
    author: {
        type: String,
        required: true,
        default: ''
    },
    // 分类
    category: {
        type: Array,
        required: true,
        default: []
    },
    // 评分
    score: {
        type: Number,
        required: false,
        default: 0
    }
})
