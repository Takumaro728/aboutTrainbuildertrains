const orderedNames = [
  "糀谷",
  "京急蒲田",
  "海森丘",
  "網代",
  "叢森西口",
  "緑木川",
  "TwinTowersHill",
  "五位鷺町",
  "潮入",
  "阪急淡路",
  "水瀬市",
  "東橙の浦",
  "宮木ヶ丘",
  "羽沢横浜",
  "東阿波口",
  "研究センター"
];

const stations = [
    {
    "name": "緑木川",
    "image": "midori.png",
    "description": "近くには自動運転時に使用されるトロッコを置いておく車両基地もある。",
    "transfer": "中央線、貨物線、地下鉄",
    "reference": "急行停車駅"
    
  },
{
    "name": "叢森西口",
    "image": "kusamura.png",
    "description": "ジャングルとの境目に作られた高架駅。地上は中央線が走る。",
    "transfer": "中央線"
  },
{
    "name": "網代",
    "image": "ajiro.png",
    "description": "通過線がホームの上にあるのが印象的な駅。2025.4/7現在、環状高速鉄道の最新駅である。",
    "transfer": "中央線、新幹線"
  },
{
    "name": "海森丘",
    "image": "uminomori.png",
    "description": "サイト制作者の推し駅。中央線、環状高速鉄道ホームどちらからでも京急蒲田へ伸びる高架が見える。",
    "transfer": "中央線"
  },
{
    "name": "京急蒲田",
    "image": "keikyu.png",
    "description": "他にはほぼない2層構造の駅。実際の京急蒲田との再現度に定評がある。",
    "transfer": "メサ横断鉄道(連絡線経由)",
    "reference": "急行停車駅"
  },
{
    "name": "糀谷",
    "image": "koujiya.png",
    "description": "京急蒲田⇔糀谷は現実の路線を再現しており、平面交差を見ることができる。",
    "transfer": "なし"
  },
{
    "name": "研究センター",
    "image": "kennkyuu.png",
    "description": "過去に自動運転の実験線として機能していた島にある駅。",
    "transfer": "新幹線"
  },
{
    "name": "東阿波口",
    "image": "higasiawa.png",
    "description": "メサの山に入る手前の海岸に置かれた駅。伊勢港町駅がきれいに見える。",
    "transfer": "メサ横断鉄道",
    "reference": "急行停車駅"
  },
{
    "name": "羽沢横浜",
    "image": "hazawa.png",
    "description": "羽沢横山国大モチーフの駅。地下化工事する前の線路が見えるなど魅力沢山。",
    "transfer": "メサ縦断鉄道",
    "reference": "急行停車駅"
  },
{
    "name": "宮木ヶ丘",
    "image": "miyakigaoka.png",
    "description": "メサの近くの緑広がるエリアに作られた高架駅。見える支線の高架は圧巻。",
    "transfer": "環状支線、新幹線",
    "reference": "急行停車駅"
  },
{
    "name": "東橙の浦",
    "image": "higasitago.png",
    "description": "何もないように見えるものの近くには貨物や連絡線が集まる駅。",
    "transfer": "なし"
  },
{
    "name": "水瀬市",
    "image": "minasesi.png",
    "description": "環状高速鉄道を代表する駅の一つ。屋根はポルトガルのオリエンテ駅モチーフ。",
    "transfer": "なし",
    "reference": "急行停車駅"
  },
{
    "name": "阪急淡路",
    "image": "hannkyuu.png",
    "description": "大平面交差や高架化工事中の駅舎が見える。",
    "transfer": "北西本線",
    "reference": "急行停車駅"
  },
{
    "name": "潮入",
    "image": "sio.png",
    "description": "内回り・外回りでホームの数が違う駅。間隔調整として用いられることが多い。",
    "transfer": "なし"
  },
{
    "name": "五位鷺町",
    "image": "goisagi.png",
    "description": "ピリジャー前哨基地の最寄り駅。一般的な途中駅の立ち位置をしている。",
    "transfer": "なし"
  },
{
    "name": "TwinTowersHill",
    "image": "twin.png",
    "description": "当時あった素材で作られた駅舎だそう。クオリティがとても高い。",
    "transfer": "ピリジャーライン",
    "reference": "急行停車駅"
  }
]



window.onload = function () {
  fetch('data/stations.json')
    .then(response => response.json())
    .then(data => {
      const sorted = orderedNames.map(name => data.find(st => st.name === name));
      createStationButtons(sorted);
    })
    .catch(error => console.error('JSON読み込みエラー:', error));
};

function drawCircleLine(radius, centerX, centerY) {
  const canvas = document.getElementById('circle-line');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#27ae60';
  ctx.lineWidth = 10;
  ctx.stroke();
}

function createStationButtons(stations) {
  const stationList = document.getElementById('station-list');
  const centerX = 350, centerY = 350, radius = 250;
  drawCircleLine(radius, centerX, centerY);

  stations.forEach((station, i) => {
    const angle = (2 * Math.PI * i) / stations.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const button = document.createElement('button');
    button.textContent = station.name;
    button.classList.add('station-button');
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.onclick = () => showModal(station);
    stationList.appendChild(button);
  });
}

function showModal(station) {
  document.getElementById('station-name').textContent = station.name;
  document.getElementById('station-image').src = `images/${station.image}`;
  document.getElementById('station-info').textContent = station.description;
  document.getElementById('station-transfer').textContent = station.transfer || "情報なし";
  document.getElementById('station-reference').textContent = station.reference || "情報なし";
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
