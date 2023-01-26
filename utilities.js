const createNode = (options) => {
  const node = document.createElement(options.tag);
  if(options.className) node.setAttribute('class',options.className);
  if(options.innerHTML) node.innerHTML = options.innerHTML;
  if(options.attributes) Object.keys(options.attributes).forEach(key => node.setAttribute(key,options.attributes[key]) );
  if(options.style) Object.keys(options.style).forEach(key => node.style[key] = options.style[key]);
  if(options.event_listeners) Object.keys(options.event_listeners).forEach(key => node.addEventListener(key,options.event_listeners[key]) )
  if(options.root) options.root.appendChild(node);
  return node;
}

const xhrURL = (options) => new Promise(resolve => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => resolve(xhr.responseText) );
  xhr.addEventListener('error', () => resolve(false) );
  xhr.open(options.method, options.url);
  xhr.setRequestHeader('Content-type', options.content_type);
  const params = new URLSearchParams(options.params).toString();
  xhr.send(params);
});

const loadImage = src => new Promise(resolve => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => resolve(false);
  img.src = src;
});

const currencyFormat = (value) => {
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  return currency.format(value);
}

const kFormatter = num => {
  const lookup = [ { value: 1, symbol: '' }, { value: 1e3, symbol: 'k' }, { value: 1e6, symbol: 'M' } ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(item => num >= item.value );
  const digits = item.symbol === 'M' ? 2 : 0;
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}

const daysToYMD = x => {
  const y = 365;
  const y2 = 31;
  const remainder = x % y;
  const casio = remainder % y2;
  const year = (x - remainder) / y;
  const month = (remainder - casio) / y2;
  if(month) return `${month} Month${month !== 1 ? 's' :''}`;
  else if(casio) return `${casio} Day${casio !== 1 ? 's' :''}`;
}

const timeSince = date => {
  const intervals = [
    { label: 'Year', seconds: 31536000 },
    { label: 'Month', seconds: 2592000 },
    { label: 'Day', seconds: 86400 },
    { label: 'Hour', seconds: 3600 },
    { label: 'Minute', seconds: 60 },
    { label: 'Second', seconds: 1 }
  ];
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}
