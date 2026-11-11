const photos = {
  hero: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=82',
  meat: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'],
  soup: ['https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1569293511145-3ab84dddd911?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1651330395670-1680a92028bc?auto=format&fit=crop&w=900&q=80'],
  veg: ['https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'],
  seafood: ['https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80'],
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'
};
const groups = [
 ['凉菜', '凉拌黄瓜|酸辣木耳|拍蒜皮蛋|凉拌豆腐|椒麻鸡丝|五香卤牛肉|麻酱茄子|凉拌海带丝|酸甜萝卜|夫妻肺片'],
 ['肉类', '咕噜肉|宫保鸡丁|鱼香肉丝|回锅肉|红烧肉|黑椒牛柳|姜葱鸡|蒜香排骨|梅菜扣肉|蜜汁叉烧'],
 ['海鲜', '清蒸鱼|姜葱鱼片|椒盐虾|麦片虾|咸蛋黄鱿鱼|豉汁蒸排骨|蒜蓉蒸扇贝|宫保虾球|酸甜鱼片|虾仁炒蛋'],
 ['蔬菜豆腐', '麻婆豆腐|家常豆腐|蚝油生菜|蒜蓉炒空心菜|上汤娃娃菜|干煸四季豆|鱼香茄子|西兰花炒菇|腐乳炒通菜|番茄炒蛋'],
 ['汤与主食', '老火靓汤|玉米红萝卜排骨汤|酸辣汤|紫菜蛋花汤|番茄豆腐汤|扬州炒饭|咸鱼鸡粒炒饭|福建炒面|干炒牛河|白饭']
];
const descriptions = {
 '咕噜肉':'经典家常味，外酥里嫩，酸甜开胃，配上一碗热饭刚刚好。',
 '老火靓汤':'慢火煲出温润汤味，适合一家人围桌分享。',
 '宫保鸡丁':'鸡丁搭配花生与香料，咸香微甜，越吃越下饭。',
 '清蒸鱼':'以简单调味带出鱼肉鲜味，清爽不腻，适合分享。',
 '麻婆豆腐':'豆腐柔嫩入味，香麻微辣，是经典的下饭家常菜。'
};
const flavorMap = {'凉菜':'清爽开胃','肉类':'咸香下饭','海鲜':'鲜香家常','蔬菜豆腐':'清鲜可口','汤与主食':'暖胃饱足'};
const imageMap = {'凉菜':photos.veg,'肉类':photos.meat,'海鲜':photos.seafood,'蔬菜豆腐':photos.veg,'汤与主食':photos.soup};
const dishes = groups.flatMap(([category, names]) => names.split('|').map((name, i) => ({name, category, index:i+1, image:imageMap[category][i % imageMap[category].length], flavor:flavorMap[category], description:descriptions[name] || `${name}是熟悉的中式家常味，认真烹调、热热上桌，适合配饭，也适合和家人朋友一起分享。`})));
const grid = document.querySelector('#dish-grid');
const count = document.querySelector('#menu-count');
function renderMenu(category='全部') {
 const shown = category==='全部' ? dishes : dishes.filter(d=>d.category===category);
 count.textContent = `${shown.length} 道${category==='全部'?'家常菜':category}`;
 grid.innerHTML = shown.map((d,i)=>`<article class="dish-card" tabindex="0" role="button" aria-label="查看${d.name}详情" data-index="${dishes.indexOf(d)}"><div class="dish-photo" style="background-image:url('${d.image}')"></div><div class="dish-info"><div><span class="dish-number">${String(dishes.indexOf(d)+1).padStart(2,'0')} · ${d.category}</span><h3>${d.name}</h3></div><span class="dish-arrow">↗</span></div><p>${d.description}</p></article>`).join('');
 grid.querySelectorAll('.dish-card').forEach(card=>{card.addEventListener('click',()=>openDish(Number(card.dataset.index)));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDish(Number(card.dataset.index));}});});
}
const modal=document.querySelector('#dish-modal');
function openDish(i){const d=dishes[i];document.querySelector('#modal-photo').style.backgroundImage=`url('${d.image}')`;document.querySelector('#modal-category').textContent=d.category;document.querySelector('#modal-title').textContent=d.name;document.querySelector('#modal-description').textContent=d.description;document.querySelector('#modal-flavor').textContent=d.flavor;document.querySelector('#modal-order').href=`https://wa.me/60122228286?text=${encodeURIComponent(`你好，我想询问「${d.name}」这道菜。`)}`;modal.showModal();}
if(modal){document.querySelector('.modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});}
if(grid){document.querySelectorAll('.category-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelector('.category-tab.active').classList.remove('active');tab.classList.add('active');renderMenu(tab.dataset.category);}));}
const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav-links');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
if(grid)renderMenu();
