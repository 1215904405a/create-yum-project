// 可以结构化都放后端 具体看情况
import { routes as example } from 'modules/example'
import { opportunityPointIcon, myIcon } from '@/conf/iconsvg';

// 必须都有name，tab的名称
let urls: any[] = [
  {
    name: '我的',
    key: 'my',
    icon: myIcon,
    code: 'NEW01_my_01',
    children: [
      {
        name: '我的待办',
        path: '/home/needToDealt',
        code: 'NEW01_my_0101',
      },
      {
        name: '我的申请',
        path: '/home/apply',
        code: 'NEW01_my_0102',
      },
      {
        name: '我的消息',
        path: '/home/myMsg',
        code: 'NEW01_my_0103',
      },
    ]
  },
  {
    name: '机会点管理',
    key: 'opportunityPoint',
    icon: opportunityPointIcon,
    code: 'NEW01_opportunityPoint_01',
    children: [
      {
        name: '机会点分配',
        path: '/opportunityPoint/distribution',
        code: 'NEW01_opportunityPoint_0101',
      },
      {
        name: '机会点排查',
        path: '/opportunityPoint/invest',
        code: 'NEW01_opportunityPoint_0102',
      },
      {
        name: '排查报表',
        path: '/opportunityPoint/reportInvest',
        code: 'NEW01_opportunityPoint_0103',
      },
    ]
  }
];

if (_FRENV_ === 'log') { // 给后端用
  // urls = [...log];
} else if (_FRENV_ === 'dev') {
  urls = urls.concat([...example]);
}

window.console.log(_FRENV_);

const urlObj = {}
function getUrlObj(menu: any[]) {
  return menu.map((item, idx) => {
    const Path = item.path ? item.path.split('/').slice(0, 3).join('/') : ''
    if (Path) {
      urlObj[Path] = item
    }
    if (item.children) {
      getUrlObj(item.children)
    }
  })
}

getUrlObj(urls)

export { urlObj };
export default urls;
