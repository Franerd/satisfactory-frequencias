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

    if(isAdminUnlocked() && item.image){
      const changeImageBtn = document.createElement('button');
      changeImageBtn.className = 'ghost changeImageBtn';
      changeImageBtn.type = 'button';
      changeImageBtn.textContent = 'Trocar imagem';
      changeImageBtn.addEventListener('click', () => openImageModal(item));
      node.querySelector('.cardBody').appendChild(changeImageBtn);
    }

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
const generateFreq = document.querySelector('#generateFreq');
const saveGithubConfig = document.querySelector('#saveGithubConfig');
const addItemGithub = document.querySelector('#addItemGithub');
const addItemToQueue = document.querySelector('#addItemToQueue');
const sendBatchQueue = document.querySelector('#sendBatchQueue');
const clearBatchQueue = document.querySelector('#clearBatchQueue');
const batchQueueList = document.querySelector('#batchQueueList');
const adminStatus = document.querySelector('#adminStatus');
const adminPanel = document.querySelector('#adminPanel');
const adminAccess = document.querySelector('#adminAccess');
const openAdminLogin = document.querySelector('#openAdminLogin');
const adminLoginBox = document.querySelector('#adminLoginBox');
const adminPassword = document.querySelector('#adminPassword');
const adminLoginBtn = document.querySelector('#adminLoginBtn');
const adminLoginStatus = document.querySelector('#adminLoginStatus');
const adminLogout = document.querySelector('#adminLogout');
const imageUpdateModal = document.querySelector('#imageUpdateModal');
const closeImageUpdateModal = document.querySelector('#closeImageUpdateModal');
const imageUpdateItemName = document.querySelector('#imageUpdateItemName');
const currentImagePreview = document.querySelector('#currentImagePreview');
const currentImagePath = document.querySelector('#currentImagePath');
const replaceImageFile = document.querySelector('#replaceImageFile');
const newImagePreview = document.querySelector('#newImagePreview');
const newImagePlaceholder = document.querySelector('#newImagePlaceholder');
const confirmReplaceImage = document.querySelector('#confirmReplaceImage');
const replaceImageStatus = document.querySelector('#replaceImageStatus');

let selectedImageItem = null;


// Senha simples para esconder o painel de visitantes comuns.
// Atenção: em GitHub Pages isso não é segurança real, pois o JS é público.
const ADMIN_PASSWORD = 'admin123';

function setAdminStatus(message, type = ''){
  adminStatus.textContent = message;
  adminStatus.className = `adminStatus ${type}`.trim();
}

function setAdminLoginStatus(message, type = ''){
  adminLoginStatus.textContent = message;
  adminLoginStatus.className = `adminStatus ${type}`.trim();
}

function setReplaceImageStatus(message, type = ''){
  replaceImageStatus.textContent = message;
  replaceImageStatus.className = `adminStatus ${type}`.trim();
}

function isAdminUnlocked(){
  return localStorage.getItem('satisfactoryAdminUnlocked') === 'true';
}

function showAdminPanel(){
  adminPanel.classList.remove('hidden');
  adminAccess.classList.add('hidden');
  localStorage.setItem('satisfactoryAdminUnlocked', 'true');
  render();
}

function hideAdminPanel(){
  adminPanel.classList.add('hidden');
  adminAccess.classList.remove('hidden');
  adminLoginBox.classList.add('hidden');
  adminPassword.value = '';
  setAdminLoginStatus('');
  localStorage.removeItem('satisfactoryAdminUnlocked');
  closeImageModal();
  render();
}

function tryAdminLogin(){
  if(adminPassword.value === ADMIN_PASSWORD){
    showAdminPanel();
  } else {
    setAdminLoginStatus('Senha incorreta.', 'error');
    adminPassword.focus();
  }
}

function initAdminLogin(){
  if(localStorage.getItem('satisfactoryAdminUnlocked') === 'true'){
    showAdminPanel();
    return;
  }

  hideAdminPanel();
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

function getUsedFrequencies(items = ITEMS){
  return new Set(
    items
      .map(item => Number(item.freqNum || item.freq))
      .filter(num => Number.isInteger(num) && num >= 1000 && num <= 9999)
  );
}

function findItemByFrequency(freq, items = ITEMS){
  const target = Number(freq);
  return items.find(item => Number(item.freqNum || item.freq) === target);
}

const MIN_FREQUENCY_DISTANCE = 50;

function gerarFrequenciaUnica(items = ITEMS){
  const usadas = getUsedFrequencies(items);

  const candidatos = [];
  for(let freq = 1000; freq <= 9999; freq++){
    if(usadas.has(freq)) continue;

    const longeDasUsadas = [...usadas].every(usada =>
      Math.abs(usada - freq) >= MIN_FREQUENCY_DISTANCE
    );

    if(longeDasUsadas) candidatos.push(freq);
  }

  if(!candidatos.length){
    throw new Error(`Não há frequência livre com distância mínima de ${MIN_FREQUENCY_DISTANCE}.`);
  }

  const indiceAleatorio = Math.floor(Math.random() * candidatos.length);
  return candidatos[indiceAleatorio];
}

function preencherFrequenciaUnica(items = ITEMS){
  try{
    newItemFreq.value = gerarFrequenciaUnica(items);
    setAdminStatus('Frequência única gerada.', 'ok');
  } catch(err){
    setAdminStatus(`Erro: ${err.message}`, 'error');
  }
}

window.preencherFrequenciaUnica = preencherFrequenciaUnica;

function validateFrequency(freq, items = ITEMS, itemName = ''){
  const freqNumber = Number(freq);
  if(!Number.isInteger(freqNumber) || freqNumber < 1000 || freqNumber > 9999){
    return 'A frequência precisa ser um número de 4 dígitos entre 1000 e 9999.';
  }

  const repeated = findItemByFrequency(freqNumber, items);
  const sameItem = repeated && itemName && normalizeText(repeated.item) === normalizeText(itemName);
  if(repeated && !sameItem){
    return `A frequência ${freqNumber} já está em uso no item "${repeated.item}".`;
  }

  const tooClose = items.find(item => {
    const existing = Number(item.freqNum || item.freq);
    return Number.isInteger(existing) && Math.abs(existing - freqNumber) < MIN_FREQUENCY_DISTANCE;
  });

  if(tooClose && normalizeText(tooClose.item) !== normalizeText(itemName)){
    return `A frequência ${freqNumber} está muito próxima da frequência ${tooClose.freq} do item "${tooClose.item}". Use uma distância mínima de ${MIN_FREQUENCY_DISTANCE}.`;
  }

  return '';
}

function suggestInitialFrequency(){
  if(!newItemFreq.value){
    try{ newItemFreq.value = gerarFrequenciaUnica(); } catch {}
  }
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

function openImageModal(item){
  selectedImageItem = item;
  replaceImageFile.value = '';
  newImagePreview.src = '';
  newImagePreview.classList.add('hidden');
  newImagePlaceholder.classList.remove('hidden');
  setReplaceImageStatus('');

  imageUpdateItemName.textContent = item.item;
  currentImagePreview.src = `${item.image}?preview=${Date.now()}`;
  currentImagePreview.alt = item.item;
  currentImagePath.textContent = item.image;

  imageUpdateModal.classList.remove('hidden');
}

function closeImageModal(){
  if(!imageUpdateModal) return;
  imageUpdateModal.classList.add('hidden');
  selectedImageItem = null;
  if(replaceImageFile) replaceImageFile.value = '';
  setReplaceImageStatus('');
}

function previewReplacementImage(){
  const file = replaceImageFile.files[0];
  if(!file){
    newImagePreview.src = '';
    newImagePreview.classList.add('hidden');
    newImagePlaceholder.classList.remove('hidden');
    return;
  }

  const url = URL.createObjectURL(file);
  newImagePreview.src = url;
  newImagePreview.classList.remove('hidden');
  newImagePlaceholder.classList.add('hidden');
}

async function replaceExistingImageOnGithub(){
  const owner = ghOwner.value.trim();
  const repo = ghRepo.value.trim();
  const token = ghToken.value.trim();
  const branch = ghBranch.value.trim() || 'main';
  const file = replaceImageFile.files[0];

  if(!selectedImageItem) return setReplaceImageStatus('Nenhum item selecionado.', 'error');
  if(!owner || !repo || !token || !branch) return setReplaceImageStatus('Preencha dono, repositório, branch e token no painel admin.', 'error');
  if(!selectedImageItem.image) return setReplaceImageStatus('Este item não possui imagem cadastrada para substituir.', 'error');
  if(!file) return setReplaceImageStatus('Selecione a nova imagem.', 'error');

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if(file.type && !allowedTypes.includes(file.type)){
    return setReplaceImageStatus('Use uma imagem PNG, JPG ou WEBP.', 'error');
  }

  const imagePath = selectedImageItem.image.replace(/^\/+/, '');

  confirmReplaceImage.disabled = true;
  setReplaceImageStatus('Buscando arquivo atual no GitHub...', 'loading');

  try{
    saveConfig();

    const existingImage = await getGithubFile(imagePath);
    const imageContent = await fileToBase64(file);

    setReplaceImageStatus('Substituindo imagem existente...', 'loading');

    await putGithubFile(
      imagePath,
      imageContent,
      `Substitui imagem: ${selectedImageItem.item}`,
      existingImage.sha
    );

    setReplaceImageStatus('Imagem substituída com sucesso. O GitHub Pages pode levar alguns minutos para atualizar.', 'ok');
    currentImagePreview.src = `${URL.createObjectURL(file)}`;
    replaceImageFile.value = '';
    newImagePreview.src = '';
    newImagePreview.classList.add('hidden');
    newImagePlaceholder.classList.remove('hidden');
  } catch(err){
    setReplaceImageStatus(`Erro: ${err.message}`, 'error');
  } finally {
    confirmReplaceImage.disabled = false;
  }
}


const BATCH_QUEUE_KEY = 'satisfactoryBatchQueue';
let batchQueue = loadBatchQueue();

function loadBatchQueue(){
  try{
    const parsed = JSON.parse(localStorage.getItem(BATCH_QUEUE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBatchQueue(){
  localStorage.setItem(BATCH_QUEUE_KEY, JSON.stringify(batchQueue));
}

function queueAsItems(excludeId = ''){
  return batchQueue
    .filter(item => item.id !== excludeId && item.status !== 'done')
    .map(item => ({
      item: item.itemName,
      freq: String(item.freq),
      freqNum: Number(item.freq),
      image: item.imagePath || `img/${slugifyFileName(item.itemName)}.${item.ext || 'png'}`
    }));
}

function setQueueItemStatus(id, status, message = ''){
  const item = batchQueue.find(entry => entry.id === id);
  if(!item) return;
  item.status = status;
  item.message = message;
  saveBatchQueue();
  renderBatchQueue();
}

function renderBatchQueue(){
  if(!batchQueueList) return;

  if(!batchQueue.length){
    batchQueueList.innerHTML = '<p class="emptyQueue">Nenhum item na fila.</p>';
    return;
  }

  batchQueueList.innerHTML = '';
  batchQueue.forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = `batchQueueItem ${entry.status || 'pending'}`;

    const preview = document.createElement('img');
    preview.src = `data:${entry.fileType};base64,${entry.imageContent}`;
    preview.alt = entry.itemName;

    const info = document.createElement('div');
    info.className = 'batchQueueInfo';
    info.innerHTML = `
      <strong>${index + 1}. ${entry.itemName}</strong>
      <span>Frequência: ${entry.freq}</span>
      <small>${entry.imagePath || `img/${slugifyFileName(entry.itemName)}.${entry.ext}`}</small>
      ${entry.message ? `<em>${entry.message}</em>` : ''}
    `;

    const actions = document.createElement('div');
    actions.className = 'batchQueueActions';

    const status = document.createElement('span');
    status.className = `queueStatus ${entry.status || 'pending'}`;
    status.textContent = entry.status === 'done' ? 'Enviado' : entry.status === 'error' ? 'Erro' : entry.status === 'sending' ? 'Enviando' : 'Na fila';

    const remove = document.createElement('button');
    remove.className = 'ghost';
    remove.type = 'button';
    remove.textContent = 'Remover';
    remove.disabled = entry.status === 'sending';
    remove.addEventListener('click', () => {
      batchQueue = batchQueue.filter(item => item.id !== entry.id);
      saveBatchQueue();
      renderBatchQueue();
    });

    actions.append(status, remove);
    row.append(preview, info, actions);
    batchQueueList.appendChild(row);
  });
}

async function addCurrentItemToQueue(){
  const itemName = newItemName.value.trim();
  const freq = newItemFreq.value.trim();
  const file = newItemImage.files[0];

  if(!itemName || !freq) return setAdminStatus('Preencha nome do item e frequência antes de adicionar à fila.', 'error');
  if(!file) return setAdminStatus('Selecione uma imagem antes de adicionar à fila.', 'error');

  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if(file.type && !allowedTypes.includes(file.type)){
    return setAdminStatus('Use uma imagem PNG, JPG ou WEBP.', 'error');
  }

  const validationItems = [...ITEMS, ...queueAsItems()];
  const freqError = validateFrequency(freq, validationItems, itemName);
  if(freqError) return setAdminStatus(freqError, 'error');

  const repeatedNameInQueue = batchQueue.find(item => normalizeText(item.itemName) === normalizeText(itemName) && item.status !== 'done');
  if(repeatedNameInQueue) return setAdminStatus(`O item "${itemName}" já está na fila. Remova ele antes de adicionar novamente.`, 'error');

  try{
    const ext = getImageExtension(file);
    const imagePath = `img/${slugifyFileName(itemName)}.${ext}`;
    const imageContent = await fileToBase64(file);

    batchQueue.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      itemName,
      freq: String(freq),
      freqNum: Number(freq),
      ext,
      fileName: file.name,
      fileType: file.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
      imagePath,
      imageContent,
      status: 'pending',
      message: ''
    });

    saveBatchQueue();
    renderBatchQueue();
    setAdminStatus(`Item "${itemName}" adicionado à fila.`, 'ok');

    newItemName.value = '';
    newItemFreq.value = '';
    newItemImage.value = '';
    preencherFrequenciaUnica([...ITEMS, ...queueAsItems()]);
  } catch(err){
    setAdminStatus(`Erro ao adicionar à fila: ${err.message}`, 'error');
  }
}

async function sendOneQueuedItem(entry){
  const imageSha = await getExistingShaOrNull(entry.imagePath);

  await putGithubFile(
    entry.imagePath,
    entry.imageContent,
    `Adiciona imagem: ${entry.itemName}`,
    imageSha
  );

  const itemsFile = await getGithubFile('items.js');
  const itemsJs = decodeBase64Utf8(itemsFile.content);
  const items = extractItemsFromJs(itemsJs);
  const remoteFreqError = validateFrequency(entry.freq, items, entry.itemName);
  if(remoteFreqError) throw new Error(remoteFreqError);

  const newItem = {
    item: entry.itemName,
    freq: String(entry.freq),
    image: entry.imagePath,
    freqNum: Number(entry.freq)
  };

  const existingIndex = items.findIndex(i => normalizeText(i.item) === normalizeText(entry.itemName));
  if(existingIndex >= 0){
    items[existingIndex] = newItem;
  } else {
    items.push(newItem);
  }

  items.sort((a,b) => a.item.localeCompare(b.item, 'pt-BR'));

  await putGithubFile(
    'items.js',
    encodeBase64Utf8(buildItemsJs(items)),
    existingIndex >= 0 ? `Atualiza item: ${entry.itemName}` : `Adiciona item: ${entry.itemName}`,
    itemsFile.sha
  );
}

async function getExistingShaOrNull(path){
  try{
    const existing = await getGithubFile(path);
    return existing.sha;
  } catch(err){
    if(String(err.message).includes('Not Found')) return null;
    throw err;
  }
}

async function sendBatchQueueToGithub(){
  const owner = ghOwner.value.trim();
  const repo = ghRepo.value.trim();
  const token = ghToken.value.trim();
  const branch = ghBranch.value.trim() || 'main';

  if(!owner || !repo || !token || !branch) return setAdminStatus('Preencha dono, repositório, branch e token.', 'error');
  const pending = batchQueue.filter(item => item.status !== 'done');
  if(!pending.length) return setAdminStatus('A fila não possui itens pendentes.', 'error');

  sendBatchQueue.disabled = true;
  addItemToQueue.disabled = true;
  addItemGithub.disabled = true;
  saveConfig();

  let ok = 0;
  let failed = 0;

  for(const entry of pending){
    setQueueItemStatus(entry.id, 'sending', 'Enviando para o GitHub...');
    setAdminStatus(`Enviando fila: ${ok + failed + 1}/${pending.length} - ${entry.itemName}`, 'loading');

    try{
      await sendOneQueuedItem(entry);
      ok++;
      setQueueItemStatus(entry.id, 'done', 'Enviado com sucesso.');
    } catch(err){
      failed++;
      setQueueItemStatus(entry.id, 'error', err.message);
    }
  }

  batchQueue = batchQueue.filter(item => item.status !== 'done');
  saveBatchQueue();
  renderBatchQueue();

  if(failed){
    setAdminStatus(`Fila finalizada com ${ok} enviado(s) e ${failed} erro(s). Corrija os itens com erro e tente novamente.`, 'error');
  } else {
    setAdminStatus(`Fila enviada com sucesso: ${ok} item(ns). O GitHub Pages pode levar alguns minutos para atualizar.`, 'ok');
  }

  sendBatchQueue.disabled = false;
  addItemToQueue.disabled = false;
  addItemGithub.disabled = false;
}

function clearQueue(){
  if(!batchQueue.length) return setAdminStatus('A fila já está vazia.', 'ok');
  if(!confirm('Tem certeza que deseja limpar toda a fila?')) return;
  batchQueue = [];
  saveBatchQueue();
  renderBatchQueue();
  setAdminStatus('Fila limpa.', 'ok');
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
  const localFreqError = validateFrequency(freq, ITEMS, itemName);
  if(localFreqError) return setAdminStatus(localFreqError, 'error');
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
    const remoteFreqError = validateFrequency(freq, items, itemName);
    if(remoteFreqError) throw new Error(remoteFreqError);

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
    preencherFrequenciaUnica(items);
  } catch(err){
    setAdminStatus(`Erro: ${err.message}`, 'error');
  } finally {
    addItemGithub.disabled = false;
  }
}

saveGithubConfig?.addEventListener('click', saveConfig);
generateFreq?.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  preencherFrequenciaUnica();
});
newItemFreq?.addEventListener('input', () => {
  const error = validateFrequency(newItemFreq.value, ITEMS, newItemName.value.trim());
  if(error) setAdminStatus(error, 'error');
});
addItemGithub?.addEventListener('click', addItemToGithub);
addItemToQueue?.addEventListener('click', addCurrentItemToQueue);
sendBatchQueue?.addEventListener('click', sendBatchQueueToGithub);
clearBatchQueue?.addEventListener('click', clearQueue);
openAdminLogin?.addEventListener('click', () => {
  adminLoginBox.classList.toggle('hidden');
  if(!adminLoginBox.classList.contains('hidden')) adminPassword.focus();
});
adminLoginBtn?.addEventListener('click', tryAdminLogin);
adminPassword?.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') tryAdminLogin();
});
adminLogout?.addEventListener('click', hideAdminPanel);
closeImageUpdateModal?.addEventListener('click', closeImageModal);
replaceImageFile?.addEventListener('change', previewReplacementImage);
confirmReplaceImage?.addEventListener('click', replaceExistingImageOnGithub);
imageUpdateModal?.addEventListener('click', (event) => {
  if(event.target === imageUpdateModal) closeImageModal();
});

renderBatchQueue();
loadGithubConfig();
suggestInitialFrequency();
initAdminLogin();
