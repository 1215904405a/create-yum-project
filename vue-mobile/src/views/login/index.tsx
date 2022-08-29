import { useStore } from 'vuex'
import { IUser } from '@/store/login'
import { useRouter } from 'vue-router'
import { SET_USER } from '@/store/login/actionType'
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { showToast, Form, Field, CellGroup, Button } from 'vant';
import style from './login.module.less'

export default defineComponent({
  setup() {
    /*
    * Proxy响应式绑定 reactive是用于复杂数据类型；   reactive() 返回的是一个源对象的 Proxy，它和源对象是不相等的
    * ref 函数传入一个值作为参数，一般传入基本数据类型
    * torefs是因为把reactive的值转成ref型，如果不转就不能响应式。
    */
    const data = reactive<{
      user: IUser
    }>({
      user: {
        name: 'admin',
        password: '123456'
      }
    })
    const { dispatch } = useStore()
    const router = useRouter()

    onMounted(() => {
      // showToast('提示121212')
    })

    function login() {
      if (data.user.name === 'admin' && data.user.password === '123456') {
        router.push({
          name: 'home'
        })

        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch(`login/${SET_USER}`, data.user)
      } else {
        // data.user = {
        //   name: '',
        //   password: ''
        // }
        localStorage.removeItem('user')
        showToast('用户名或密码错误')
      }
    }

    function keyUp({ code }: KeyboardEvent) {
      if (code === 'Enter') {
        login()
      }
    }

    return () => (
      <div class={style['login']}>
        <Form v-model={data.user}  onSubmit={login}>
          <CellGroup inset>
            <Field
              name="用户名"
              label="用户名"
              placeholder="用户名"
              v-model={data.user.name}
              {...{
                onKeyup: keyUp
              }}
              rules={[{ required: true, message: '请填写用户名' }]}
              autocomplete="on"
            />
            <Field
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              v-model={data.user.password}
              {...{
                onKeyup: keyUp
              }}
              rules={[{ required: true, message: '请填写密码' }]}
              autocomplete="on"
            />
          </CellGroup>
          <div>
            <Button round block 
              type="primary" 
              native-type="submit"
            >
              提交
            </Button>
          </div>
        </Form> 
        {/* <ElForm model={data.user} ref={loginForm}>
          <ElFormItem
            label="账号"
            prop="name"
            rules={[{ required: true, message: '请输入用户名', trigger: 'blur' }]}
          >
            <ElInput
              placeholder="请输入用户名"
              v-model={data.user.name}
              v-slots={{
                prefix: <symbol-icon type="iconpinxianggongyingshang" />
              }}
              {...{
                onKeyup: keyUp
              }}
            ></ElInput>
          </ElFormItem>
          <ElFormItem
            label="密码"
            prop="password"
            rules={[{ required: true, message: '请输入密码', trigger: 'blur' }]}
          >
            <ElInput
              placeholder="请输入密码"
              type='password'
              v-model={data.user.password}
              v-slots={{
                prefix: <symbol-icon type="iconpinxianggongyingshang" />
              }}
              {...{
                onKeyup: keyUp
              }}
            ></ElInput>
          </ElFormItem>
          <ElFormItem class={style['login-button']}>
            <ElTooltip placement="top" content="账号：admin 密码：123456">
              <ElButton
                type="primary"
                {...{
                  onClick: login
                }}
              >
              登陆
              </ElButton>
            </ElTooltip>
          </ElFormItem>
        </ElForm> */}
      </div>
    )
  }
})
