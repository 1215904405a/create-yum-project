import delay from 'mocker-api/lib/delay';

const proxy = {
  _proxy: { // 可以在这里做代理

  },
  'GET /api/test': {
    code: 0,
    data: {
      total: 2,
      list: [{
        id: '1',
        tprq: '2022/06/21',
        tpyt: '###议题内容##',
        status: '确认中',
        tbsj: '2022/06/21',
      },
      {
        id: '2',
        tprq: '2022/06/22',
        tpyt: '###议题内容##',
        status: '确认中',
        tbsj: '2022/06/22',
      }],
    },
    message: '',
  },
  'GET /api/user': {
    id: 1,
    username: 'kenny',
    sex: 6,
  },
  'GET /api/user/list': [
    {
      id: 1,
      username: 'kenny',
      sex: 6,
    }, {
      id: 2,
      username: 'kenny',
      sex: 6,
    },
  ],
  'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
    const { owner, repo, ref } = req.params;
    // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
    // owner => admin
    // repo => webpack-mock-api
    // ref => masters
    // req.params[0] => add/ddd.md
    return res.json({
      id: 1,
      owner,
      repo,
      ref,
      path: req.params[0],
    });
  },
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: 'sdfsdfsdfdsf',
        data: {
          id: 1,
          username: 'kenny',
          sex: 6,
        },
      });
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403,
      });
    }
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body);
    console.log('---->', req.params.id);
    res.send({ status: 'ok', message: '删除成功！' });
  },
};
export default delay(proxy, 100);
