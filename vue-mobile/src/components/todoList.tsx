import { defineComponent, ref } from 'vue'
import foucsDirective from '@/directive/focus'
import { showToast, Form, Field, CellGroup, Button, Empty, Checkbox } from 'vant';

interface IListData {
  value: string
  finish: boolean
}

export default defineComponent({
  directives: { focus: foucsDirective },
  setup() {
    const content = ref<string>('')
    const list = ref<IListData[]>([])

    function addList() {
      if (!content.value) {
        showToast('请输入todo信息')
        return
      }
      list.value.push({
        value: content.value,
        finish: false
      })
      content.value = ''
    }

    function delItem(index: number) {
      list.value.splice(index, 1)
    }

    return () => (
      <div class="todo-list">
        <Field
          type="text"
          v-focus
          v-model={content.value}
          v-slots={{
            extra: () => (
              <Button
                icon="el-icon-circle-plus-outline"
                {...{
                  onClick: addList
                }}
              >
                添加
              </Button>
            )
          }}
          autocomplete="on"
        />
        {/* <ElInput
          type="text"
          v-focus
          v-model={content.value}
          v-slots={{
            append: (
              <ElButton
                icon="el-icon-circle-plus-outline"
                {...{
                  onClick: addList
                }}
              >
                添加
              </ElButton>
            )
          }}
        /> */}

        <div>
          {list.value.length === 0 ? (
            <Empty />
          ) : (
            list.value.map((data, index) => (
              <div
                class="list-item"
                style={{
                  textDecoration: data.finish ? 'line-through' : 'none',
                  display: 'flex',
                }}
                key={index}
              >
                <Checkbox v-model={data.finish} style={{ display: 'inline-block', verticalAlign: 'middle', }}>完成</Checkbox>
                {data.value}
                <Button
                  round
                  // size="mini"
                  type="danger"
                  class="el-icon-delete"
                  icon="el-icon-delete"
                  {...{
                    onClick: () => {
                      delItem(index)
                    }
                  }}
                >
                  删除
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
})
