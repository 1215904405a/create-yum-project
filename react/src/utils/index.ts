import dayjs from 'dayjs';

export function getParams(search = '') {
  // const ps = search.substr(1);
  const ps = search.startsWith('?') ? search.substr(1) : search;
  const par = ps.split('&');
  const params = {};
  par.forEach(item => {
    if (item) {
      const ar = item.split('=');
      params[ar[0]] = ar[1];
    }
  });
  return params;
}

export function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function setKey(arrs = []) {
  return arrs.map((item: { key?: any }, index) => {
    item.key = index + 1;
    return item;
  });
}

export function setFormData(params: any) {
  const fd = new FormData();
  const arrs = Object.keys(params);
  arrs.forEach(key => {
    if (params[key] === undefined) {
      return;
    }
    fd.append(key, params[key]);
  });
  return fd;
}

// 数字‘,’隔开显示
export function toThousands(num: any) {
  if (num === null) {
    return ''
  }
  let valueNode = '';
  const val = String(num);
  const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/)
  if (!cells || val === '-') {
    valueNode = val;
  } else {
    let int = cells[2] || '0';
    const decimal = cells[4] || '';
    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimal) {
      valueNode = int + '.' + decimal
    } else {
      valueNode = int + '.00'
    }
  }
  return valueNode// (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export function getSelfId() {
  return Math.random().toString(16).slice(2)
  // return Number(Math.random().toString().substr(3, 6)).toString(36)
}

export function filterData(data: any[], key: string, value: string) {// 过滤字典返回
  return data?.filter(v => v[key] === value)
}

export function getSelectlabel(data: any[], code: string | string[]) {
  if (typeof code === 'string') {
    const hasObj = data.find(v => v.code === code)
    return hasObj ? hasObj.label : ''
  } else if (Array.isArray(code)) {
    const result = code.reduce((bf: string[], af: string) => {
      const hasObj = data.find(v => v.code === af)
      if (hasObj) {
        bf.push(hasObj.label)
      }
      return bf
    }, [])
    return result.join(',')
  }
}

export function formatDate(time: any) {// 格式化时间，后台传输均用此格式
  // tslint:disable-next-line:no-null-keyword
  return time ? Math.floor(dayjs(time).valueOf() / 1000) : null
}
export const timeFormat = {
  dateMinute: 'YYYY-MM-DD HH:mm',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeSlash: 'YYYY/MM/DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateYear: 'YYYY',
  dateMonth: 'YYYY/MM',
  dateMonthDay: 'YYYY/MM/DD',
  dateRequestMonth: 'YYYYMM',
  dateWeek: 'dddd',
  time: 'HH:mm:ss',
  dateTimeNoSeparator: 'YYYYMMDDHHmmss',
  dateNoSeparator: 'YYYYMMDD',
  month: 'MM'
}
export function formatTime(time: any, format = 'YYYY-MM-DD HH:mm:ss') {// 格式化时间，页面展示显示调用
  // tslint:disable-next-line:no-null-keyword
  return time ? format === '' ? dayjs(time) : dayjs(time).format(format) : null
}

export function formatNormalTime(time: any, format: keyof typeof timeFormat) {
  // tslint:disable-next-line:no-null-keyword
  return time ? dayjs(time).format(timeFormat[format]) : null
}

// 获取当前月的第一天
export function getCurrentMonthFirst(date: Date) {
  date.setDate(1);
  return date;
}

// 获取当前月的最后一天
export function getCurrentMonthLast(date: Date) {
  let currentMonth = date.getMonth();
  const nextMonth = ++currentMonth;
  const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1).getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return new Date(nextMonthFirstDay - oneDay);
}


export function assign(bf: object, af: object) {
  return Object.assign({ ...bf }, JSON.parse(JSON.stringify(af)))
}

export function debounce(fn: any, delay = 500) {
  // tslint:disable-next-line:no-null-keyword
  let timer: any = null // 声明计时器
  return (...args: any) => {
    // const context: any = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      // tslint:disable-next-line:no-null-keyword
      fn.call(null, ...args)
    }, delay)
  }
}


export function getShortFileNameByLen(fileName: string, len: number) {
  if (!fileName) return ''
  return fileName.length > 10 ? (fileName.substring(0, len) + '...') : fileName
}

// 计算百分比
export function getPercent(num: any, total: any) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return '-';
  }
  return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00) + '%';
}

// divide计算
export function divideCalc(num: any, total: any) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return '-';
  }
  return total <= 0 ? '0' : (num / total).toFixed(2);
}

// base64转file
export function base64ToFile(base64Str: any, fileName: string, fileType: any) {
  if (base64Str.indexOf('base64,') > -1) {
    base64Str = base64Str.substr(base64Str.indexOf(',') + 1)
  }
  const bstr = window.atob(base64Str);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: fileType });
}

/**
 * 关闭浏览器窗口
 */
export const closeWindow = () => {
  const userAgent = navigator.userAgent
  if (userAgent.indexOf('Firefox') !== -1 || userAgent.indexOf('Chrome') !== -1) {
    window.location.replace('about:blank')
  } else {
    window.opener = null
    window.open('', '_self')
  }
  window.close()
}
