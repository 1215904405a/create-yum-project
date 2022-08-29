import { useStore, Dispatch } from 'vuex'
import { defineComponent, ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import { SET_USER } from '@/store/login/actionType'

import Child from '@/components/child'
import TodoList from '@/components/todoList'
import style from './login.module.less'

import { showToast, Form, Field, CellGroup, Button, Skeleton } from 'vant';

// 函数式组件
// const DropdownMenu = (dispatch: Dispatch, router: Router): JSX.Element => (
//   <ElDropdownMenu>
//     <ElDropdownItem
//       {...{
//         onClick: () => {
//           dispatch(`login/${SET_USER}`, {})
//           localStorage.removeItem('user')
//           router.push({ name: 'login' })
//         }
//       }}
//       icon="el-icon-switch-button"
//     >
//       退出登录
//     </ElDropdownItem>
//   </ElDropdownMenu>
// )

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const name = ref<string>('')
    const password = ref<string>('')

    setTimeout(() => {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        store.dispatch(`login/${SET_USER}`, user)
      }
      name.value = store.state.login.user.name
      password.value = store.state.login.user.password.replace(/[\s\S]/g, '*')
    }, 1000)

    return () =>(
      <div class={style['home']}>
        {name.value ? (
          <>
            {/* <ElDropdown
            style={{
              marginBottom: '15px'
            }}
            v-slots={{
              dropdown: DropdownMenu(store.dispatch, router)
            }}
          >
            <span>
              <i
                class="el-icon-s-tools el-icon--right"
                style={{
                  marginRight: '8px'
                }}
              ></i>
              设置
            </span>
          </ElDropdown> */}
            <Button
              {...{
                onClick: () => {
                  store.dispatch(`login/${SET_USER}`, {})
                  localStorage.removeItem('user')
                  router.push({ name: 'login' })
                }
              }}
            >退出登录</Button>
            <Child
              type="primary"
              size="small"
              v-slots={{
                // prefix: <i class="el-icon-star-on">11</i>,
                suffix: (props: string) => <div>22{props}</div>
              }}
              onChangePswVisible={(flag) => {
                password.value = flag
                  ? store.state.login.user.password
                  : store.state.login.user.password.replace(/[\s\S]/g, '*')
              }}
            >
            这是一段默认插槽的内容
            </Child>
            用户信息: <br />
            用户名: {name.value} <br />
            密码: {password.value} <br />
            <TodoList />
          </>
        ) : (
          <Skeleton row="6"></Skeleton>
        )}
      </div>)  
  }
})
