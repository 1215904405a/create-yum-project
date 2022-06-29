## 注意：
node版本需要14以上

本地调试
```
  yarn start
```

生产
```
  yarn build
```

[测试 yarn test 参考example/example/link.test.jsx](https://jestjs.io/zh-Hans/docs/tutorial-react)  


```
webpack5 + react18 + mobx + react-router6 + ts 基础脚手架 自己功能自己扩展
```
[mobx](https://mobx.js.org/README.htm)
[mobx demo](https://blog.csdn.net/weixin_50983325/article/details/116529381)

可以修改reactcomponent组件 依赖自己的tag版本就行
## 如果是外部使用，请注释reactcomponent引用

项目放到gitlab上后需要：
```
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

提交规范格式：
```
['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert']: 'notes...'
```

持续更新中