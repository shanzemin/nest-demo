import { Schema } from 'mongoose'

export const UsersSchema = new Schema({
    // 用户名
    username: {
        type: String,
        required: true,
        default: ''
    },
    // 密码
    password: {
        type: String,
        required: true,
        default: ''
    },
    // 角色ID
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true,
        default: null
    },
    // 创建时间
    createTime: {
        type: Number,
        default: () => Date.now()
    },
    // 更新时间
    updateTime: {
        type: Number,
        default: () => Date.now()
    }
})
