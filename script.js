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

// ================== ADMIN GITHUB ==================
const ghOwner = document.querySelector('#ghOwner');
const ghRepo = document.querySelector('#ghRepo');
const ghBranch = document.querySelector('#ghBranch');
const ghToken = document.querySelector('#ghToken');
const newItemName = document.querySelector('#newItemName');
const newItemFreq = document.querySelector('#newItemFreq');
const newItemImage = document.querySelector('#newItemImage');
const saveGithubConfig = document.querySelector('#saveGithubConfig');
const addItemGithub = document.querySelector('#addItemGithub');
const adminStatus = document.querySelector('#adminStatus');
const toggleAdmin = document.querySelector('#toggleAdmin');
const adminPanel = document.querySelector('#adminPanel');

function setAdminStatus(message, type = ''){
  adminStatus.textContent = message;
  adminStatus.className = `adminStatus ${type}`.trim();
}

function loadGithubConfig(){
  const cfg = JSON.parse(localStorage.getItem('satisfactoryGithubConfig') || '{}');
  ghOwner.value = cfg.owner || '';
  ghRepo.value = cfg.repo || '';
  ghBranch.value = cfg.branch || 'main';
  ghToken.value = cfg.token || '';
}

function saveConfig(){
  localStorage.setItem('satisfactoryGithubConfig', JSON.stringify({
    owner: ghOwner.value.trim(),
    repo: ghRepo.value.trim(),
    branch: ghBranch.value.trim() || 'main',
    token: ghToken.value.trim()
  }));
  setAdminStatus('Configuração salva neste navegador.', 'ok');
}

function slugifyFileName(text){
  return normalizeText(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

function getImageExtension(file){
  const nameExt = (file.name.split('.').pop() || '').toLowerCase();
  if(['png','jpg','jpeg','webp'].includes(nameExt)) return nameExt === 'jpeg' ? 'jpg' : nameExt;
  if(file.type === 'image/png') return 'png';
  if(file.type === 'image/webp') return 'webp';
  return 'jpg';
}

function fileToBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function decodeBase64Utf8(base64){
  const binary = atob(base64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
}

function encodeBase64Utf8(text){
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
}

function extractItemsFromJs(jsText){
  const start = jsText.indexOf('[');
  const end = jsText.lastIndexOf(']');
  if(start === -1 || end === -1 || end <= start) throw new Error('Não consegui ler o array do items.js.');
  return JSON.parse(jsText.slice(start, end + 1));
}

function buildItemsJs(items){
  return `const ITEMS = ${JSON.stringify(items, null, 2)};\n`;
}

async function githubRequest(path, options = {}){
  const owner = ghOwner.value.trim();
  const repo = ghRepo.value.trim();
  const token = ghToken.value.trim();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));
  if(!response.ok){
    throw new Error(data.message || `Erro ${response.status} na API do GitHub.`);
  }
  return data;
}

async function putGithubFile(path, contentBase64, message, sha){
  return githubRequest(path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: ghBranch.value.trim() || 'main',
      ...(sha ? { sha } : {})
    })
  });
}

async function getGithubFile(path){
  return githubRequest(`${path}?ref=${encodeURIComponent(ghBranch.value.trim() || 'main')}`);
}

async function addItemToGithub(){
  const owner = ghOwner.value.trim();
  const repo = ghRepo.value.trim();
  const token = ghToken.value.trim();
  const branch = ghBranch.value.trim() || 'main';
  const itemName = newItemName.value.trim();
  const freq = newItemFreq.value.trim();
  const file = newItemImage.files[0];

  if(!owner || !repo || !token || !branch) return setAdminStatus('Preencha dono, repositório, branch e token.', 'error');
  if(!itemName || !freq) return setAdminStatus('Preencha nome do item e frequência.', 'error');
  if(!file) return setAdminStatus('Selecione uma imagem.', 'error');

  addItemGithub.disabled = true;
  setAdminStatus('Enviando imagem e atualizando items.js...', 'loading');

  try{
    saveConfig();

    const ext = getImageExtension(file);
    const imagePath = `img/${slugifyFileName(itemName)}.${ext}`;
    const imageContent = await fileToBase64(file);

    let imageSha = null;
    try{
      const existingImage = await getGithubFile(imagePath);
      imageSha = existingImage.sha;
    } catch(err){
      if(!String(err.message).includes('Not Found')) throw err;
    }

    await putGithubFile(
      imagePath,
      imageContent,
      `Adiciona imagem: ${itemName}`,
      imageSha
    );

    const itemsFile = await getGithubFile('items.js');
    const itemsJs = decodeBase64Utf8(itemsFile.content);
    const items = extractItemsFromJs(itemsJs);
    const newItem = {
      item: itemName,
      freq: String(freq),
      image: imagePath,
      freqNum: Number(freq)
    };

    const existingIndex = items.findIndex(i => normalizeText(i.item) === normalizeText(itemName));
    if(existingIndex >= 0){
      items[existingIndex] = newItem;
    } else {
      items.push(newItem);
    }

    items.sort((a,b) => a.item.localeCompare(b.item, 'pt-BR'));

    await putGithubFile(
      'items.js',
      encodeBase64Utf8(buildItemsJs(items)),
      existingIndex >= 0 ? `Atualiza item: ${itemName}` : `Adiciona item: ${itemName}`,
      itemsFile.sha
    );

    setAdminStatus('Item enviado com sucesso. O GitHub Pages pode levar alguns minutos para atualizar.', 'ok');
    newItemName.value = '';
    newItemFreq.value = '';
    newItemImage.value = '';
  } catch(err){
    setAdminStatus(`Erro: ${err.message}`, 'error');
  } finally {
    addItemGithub.disabled = false;
  }
}

saveGithubConfig?.addEventListener('click', saveConfig);
addItemGithub?.addEventListener('click', addItemToGithub);
toggleAdmin?.addEventListener('click', () => {
  adminPanel.classList.toggle('collapsed');
  toggleAdmin.textContent = adminPanel.classList.contains('collapsed') ? 'Mostrar painel' : 'Ocultar painel';
});

loadGithubConfig();
