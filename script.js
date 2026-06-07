const grid = document.querySelector('#grid');
const tpl = document.querySelector('#cardTemplate');
const search = document.querySelector('#search');
const rangeFilter = document.querySelector('#rangeFilter');
const sortBy = document.querySelector('#sortBy');
const resultCount = document.querySelector('#resultCount');
const totalItens = document.querySelector('#totalItens');
const clearFilters = document.querySelector('#clearFilters');
const toast = document.querySelector('#toast');

totalItens.textContent = ITEMS.length;

function normalizeText(text){
  return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
}

function buildRanges(){
  const ranges = [...new Set(ITEMS.map(i => Math.floor(Number(i.freqNum || i.freq) / 1000) * 1000))].sort((a,b)=>a-b);
  for(const start of ranges){
    const opt = document.createElement('option');
    opt.value = String(start);
    opt.textContent = `${start} - ${start + 999}`;
    rangeFilter.appendChild(opt);
  }
}

function showToast(){
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1100);
}

async function copyFreq(freq){
  try { await navigator.clipboard.writeText(String(freq)); }
  catch { prompt('Copie a frequência:', freq); }
  showToast();
}

function render(){
  const q = normalizeText(search.value.trim());
  const range = rangeFilter.value;
  let list = ITEMS.filter(item => {
    const matchSearch = !q || normalizeText(item.item).includes(q) || String(item.freq).includes(q);
    const matchRange = range === 'all' || Math.floor(Number(item.freqNum || item.freq) / 1000) * 1000 === Number(range);
    return matchSearch && matchRange;
  });

  list.sort((a,b)=>{
    if(sortBy.value === 'freqAsc') return Number(a.freqNum || a.freq) - Number(b.freqNum || b.freq);
    if(sortBy.value === 'freqDesc') return Number(b.freqNum || b.freq) - Number(a.freqNum || a.freq);
    return a.item.localeCompare(b.item, 'pt-BR');
  });

  grid.innerHTML = '';
  for(const item of list){
    const node = tpl.content.cloneNode(true);
    const imageWrap = node.querySelector('.imageWrap');
    if(item.image){
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.item;
      img.loading = 'lazy';
      imageWrap.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'placeholder';
      ph.textContent = item.item.charAt(0);
      imageWrap.appendChild(ph);
    }
    node.querySelector('h2').textContent = item.item;
    const btn = node.querySelector('.freqBtn');
    btn.textContent = item.freq;
    btn.addEventListener('click', () => copyFreq(item.freq));
    grid.appendChild(node);
  }
  resultCount.textContent = `${list.length} item(ns) encontrado(s)`;
}

[search, rangeFilter, sortBy].forEach(el => el.addEventListener('input', render));
clearFilters.addEventListener('click', () => {
  search.value = '';
  rangeFilter.value = 'all';
  sortBy.value = 'name';
  render();
});

buildRanges();
render();
