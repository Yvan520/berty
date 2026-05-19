// ─── TL Nexus Game Data ───
window.TL = window.TL || {};

TL.WEATHERS = {thunder:'⛈️',rain:'🌧️',fog:'🌫️',sun:'☀️',snow:'❄️'};
TL.WEATHER_CN = {thunder:'雷暴',rain:'暴雨',fog:'浓雾',sun:'晴天',snow:'暴雪'};
TL.WEATHER_EFFECT = {
  thunder:'雷系伤害+50%，视野-30%',
  rain:'水面上涨，脚步声降低50%',
  fog:'视野-70%，远程失效，近战优势',
  sun:'视野最佳，远程武器射程+10%',
  snow:'冰系控制延长30%，移速-15%'
};
TL.WEATHER_DESC = {
  thunder:'雷暴天气是雷法师的绝对主场。雷系技能伤害+50%，一套爆发可以秒掉同装备的对手。非雷系职业建议避战或利用视野降低打游击。',
  rain:'暴雨天水面上涨，平时无法通行的河道变成隐蔽路线。脚步声降低50%，刺客可以从你想不到的位置发起突袭。',
  fog:'浓雾是所有远程职业的噩梦——视野降低70%，长弓和法杖很难命中目标。但这是刺客和近战的天堂。',
  sun:'晴天视野最佳，远程武器获得射程+10%的隐藏加成。适合长弓/十字弩风筝流派。不利：刺客没有天气掩护。',
  snow:'暴雪天气冰系控制效果延长30%，移动速度降低15%。冰法/控制流派优势巨大，被冻住基本等于等死。'
};

TL.SERVERS = [
  {name:'美洲 - Throne Peak',   flag:'🇺🇸', offset:-7, cycleStart:8,  cycleMin:120},
  {name:'美洲 - Eclipse Ridge', flag:'🇺🇸', offset:-5, cycleStart:10, cycleMin:120},
  {name:'欧洲 - Castle Dawn',   flag:'🇪🇺', offset:1,  cycleStart:16, cycleMin:120},
  {name:'欧洲 - Stormwind Valley',flag:'🇪🇺',offset:0, cycleStart:15, cycleMin:120},
  {name:'韩国 - Dragon Valley', flag:'🇰🇷', offset:9,  cycleStart:0,  cycleMin:120},
  {name:'日本 - Sakura Realm',  flag:'🇯🇵', offset:9,  cycleStart:3,  cycleMin:120},
  {name:'东南亚 - Jade Tiger',  flag:'🇸🇬', offset:7,  cycleStart:22, cycleMin:120}
];

TL.WEAPONS = [
  {id:'thunder-staff', name:'雷霆法杖', icon:'⚡', type:'magic'},
  {id:'greatsword',    name:'巨剑',     icon:'⚔️', type:'melee'},
  {id:'bow',           name:'长弓',     icon:'🏹', type:'ranged'},
  {id:'crossbow',      name:'十字弩',   icon:'🎯', type:'ranged'},
  {id:'dagger',        name:'双匕首',   icon:'🗡️', type:'melee'},
  {id:'shield',        name:'盾牌',     icon:'🛡️', type:'defense'},
  {id:'scythe',        name:'镰刀',     icon:'💀', type:'melee'},
  {id:'horn',          name:'号角',     icon:'📯', type:'support'}
];

TL.BUILDS = [
  {id:1,w:'thunder',wp:'⚡ 雷霆法杖 + 💀 镰刀',combo:'雷云召唤 → 连锁雷击 → 闪电链 → 死亡收割',tip:'雷暴天气雷系伤害+50%。开场雷云建立持续场伤，连锁雷击AOE，闪电链收残血，镰刀斩杀。15秒爆发期可秒同装备对手。',author:'公会测试组',v:true},
  {id:2,w:'thunder',wp:'⚡ 雷霆法杖 + 🛡️ 盾牌',combo:'雷盾 → 雷云召唤 → 盾击 → 连锁雷击',tip:'雷盾提供减伤+反伤，雷暴天气反伤翻倍。站桩法师打法，适合前排消耗。注意蓝量管理。',author:'欧服巅峰公会',v:true},
  {id:3,w:'rain',wp:'🗡️ 双匕首 + 🏹 长弓',combo:'暗影步 → 背刺 → 后跳射击 → 穿心箭',tip:'雨天脚步声降低50%。暗影步起手背刺+20%暴击，后跳射击拉开距离，穿心箭收尾。打完消失等CD。',author:'韩服刺客榜前十',v:true},
  {id:4,w:'rain',wp:'⚔️ 巨剑 + 📯 号角',combo:'战争呐喊 → 冲锋斩 → 旋风斩 → 碎甲',tip:'号角+15%群体攻击力，雨天河道冲锋斩附带击退水流效果，可打断敌方阵型。适合公会战前排。',author:'美服公会战指挥',v:true},
  {id:5,w:'fog',wp:'🗡️ 双匕首 + 💀 镰刀',combo:'潜伏 → 暗影步 → 死亡印记 → 收割连击',tip:'浓雾视野-70%，刺客黄金天气。潜伏移速不减，雾中先手+15%暴击。打完换位置，反复消耗。',author:'日服竞技场高分玩家',v:true},
  {id:6,w:'fog',wp:'🛡️ 盾牌 + 📯 号角',combo:'集结号 → 盾墙 → 嘲讽 → 反击风暴',tip:'浓雾中远程废了，近战小团是主流。盾墙+号角群体减伤，嘲讽拉住不让人逃出雾区。',author:'PVP攻略组',v:true},
  {id:7,w:'sun',wp:'🏹 长弓 + ⚔️ 剑',combo:'瞄准射击 → 穿透箭 → 冲锋斩 → 快剑连击',tip:'晴天射程+10%。先手瞄准压低血量，穿透箭打群体，冲锋斩近身收尾。最万金油的晴天组合。',author:'综合评分最高推荐',v:true},
  {id:8,w:'sun',wp:'🎯 十字弩 + 🗡️ 匕首',combo:'毒箭 → 淬毒匕首 → 连射 → 处决',tip:'晴天适合风筝打法。十字弩挂毒减速，切匕首近身叠毒，DOT伤害打持久战收益高。',author:'德服毒药流',v:true},
  {id:9,w:'snow',wp:'⚡ 雷霆法杖 + 🛡️ 盾牌',combo:'冰雷结界 → 雷盾 → 连锁雷击 → 冰霜新星',tip:'暴雪冰系控制延长30%。冰雷结界减速+持续伤，雷盾保命，冰霜新星冻住一片让队友集火。',author:'俄服高分玩家',v:true},
  {id:10,w:'snow',wp:'⚔️ 巨剑 + 📯 号角',combo:'战斗怒吼 → 碎冰斩 → 旋风斩 → 斩杀',tip:'碎冰斩对被减速目标+35%伤害，暴雪天几乎人人减速。号角+怒吼双群体buff配合队友一波带走。',author:'韩服公会战参考',v:true}
];
