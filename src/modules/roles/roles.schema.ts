import { Schema } from 'mongoose'

export const RolesSchema = new Schema({
    // 角色名称
    name: {
        type: String,
        required: true,
        default: ''
    },
    // 等级：1-管理员 2-用户
    level: {
        type: Number,
        required: true,
        default: 2
    }
})
