import { get } from './base.js'

async function beforeLogin() {
  const serverData = await get('/login/qr/key')
  return serverData.data.unikey
}

async function login(key) {
  const serverData = await get('/login/qr/create', {
    key,
    qrimg: true,
  })
  //   console.log(data)
  return serverData.data.qrimg
}

// qrCheck('f0b167c2-f592-40fa-b265-51c8cd458700')

async function qrCheck(key) {
  console.log('qrcheck')
  const serverData = await get('/login/qr/check', {
    key,
  })
  // 800 过期 801 等待 802 待确认 803 成功
  console.log('data', serverData.code)
  return serverData.code
}

export { beforeLogin, qrCheck, login }
