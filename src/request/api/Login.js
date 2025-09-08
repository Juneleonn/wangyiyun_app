import apiClient from '@/request/index'

// 明文密码登录
export function loginByPhone(phone, password) {
  return apiClient.get('/login/cellphone', {
    params: {
      phone,
      password
    }
  })
}
import api from '@/request/index'

// 1. 发送验证码
export function sendCaptcha(phone) {
  return api.get('/captcha/sent', {
    params: { phone }
  })
}

// 2. 使用验证码登录
export function loginByCaptcha(phone, captcha) {
  return api.get('/login/cellphone', {
    params: {
      phone,
      captcha
    }
  })
}

// 2、退出登录

export function logout() {
  return api.get('/logout', {
    params: {
    }
  })
}