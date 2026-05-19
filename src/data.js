// ─── TL Nexus Build Data — Real Game Content ───
// 基于王权与自由国际服/亚服真实数据

const WEAPONS = [
  { id:'greatsword', name:'巨剑', icon:'⚔️', type:'近战', desc:'高爆发近战武器，拥有冲锋、眩晕、范围劈砍技能' },
  { id:'sword-shield', name:'剑盾', icon:'🛡️', type:'近战', desc:'防御型武器，挑衅、格挡、团队减伤' },
  { id:'longbow', name:'长弓', icon:'🏹', type:'远程', desc:'精准远程武器，单体爆发、狙击、标记' },
  { id:'crossbow', name:'弩', icon:'🎯', type:'远程', desc:'机动远程武器，连射、毒伤、位移' },
  { id:'staff', name:'法杖', icon:'⚡', type:'魔法', desc:'元素魔法武器，范围伤害、控制、持续输出' },
  { id:'wand', name:'魔杖', icon:'📯', type:'魔法', desc:'辅助魔法武器，治疗、护盾、debuff' },
  { id:'dagger', name:'匕首', icon:'🗡️', type:'近战', desc:'刺客武器，背刺、隐身、爆发' },
];

const BUILDS = [
  {
    id:'staff-wand', slug:'staff-wand',
    weapons: ['staff','wand'],
    comboName:'⚡法杖 + 📯魔杖',
    role:'魔法远程DPS/治疗',
    tier:'S',
    difficulty:'中',
    summary:'当前版本最全能的法系组合。法杖提供高额AOE和持续伤害，魔杖提供治疗和护盾自保，能打能奶能解控。',
    pros:[
      'PvE和PvP都能打，适应性最强',
      'AOE清怪效率全游戏第一',
      '有治疗技能可以自保，单人游戏体验好',
      '团战输出环境安全',
    ],
    cons:[
      '瞬间爆发不如纯物理系',
      '被刺客近身很难打',
      '走位要求高，站桩容易死',
      '装备要求高才能打出理想伤害',
    ],
    skills:[
      {name:'连锁闪电',icon:'⚡',desc:'主输出技能，对目标释放闪电链跳跃到附近敌人'},
      {name:'火焰风暴',icon:'🔥',desc:'范围持续火伤，配合连锁闪电打元素反应'},
      {name:'治愈之触',icon:'💚',desc:'单体治疗+持续回复，自保核心'},
      {name:'法力护盾',icon:'🔮',desc:'吸收伤害的护盾，持续8秒'},
    ],
    rotation:'起手火焰风暴铺场 → 连锁闪电主输出 → 穿插治愈之触保持血量 → 法力护盾挡关键技能 → 循环',
    gear:'推荐「元素精通」套装：头和手+魔法穿透，衣服和裤子+暴击。武器优先选择「折磨法杖」和「救赎魔杖」',
    weatherAdvice:'晴天远程射程加成适合风筝走位。雷暴天雷系伤害加成巨大，是这个build的黄金天气',
  },
  {
    id:'greatsword-shield', slug:'greatsword-shield',
    weapons: ['greatsword','sword-shield'],
    comboName:'⚔️巨剑 + 🛡️剑盾',
    role:'坦克',
    tier:'S',
    difficulty:'低',
    summary:'团本必备的坦克组合。剑盾提供减伤和仇恨控制，巨剑提供AOE清怪和单体控制，任何副本都缺不了你。',
    pros:[
      '任何副本都缺坦克，就业率100%',
      '操作简单，适合新手入坑',
      'pvp团战前排抗伤核心',
      '装备门槛在四个坦职中最低',
    ],
    cons:[
      '单刷效率低',
      '野外pvp容易被风筝',
      '打不出高伤害，缺乏爽感',
      '坦克责任大，队伍灭了先怪你',
    ],
    skills:[
      {name:'挑衅怒吼',icon:'📢',desc:'强制周围敌人攻击自己8秒'},
      {name:'盾墙',icon:'🛡️',desc:'大幅减少受到的伤害，持续6秒'},
      {name:'冲锋斩',icon:'⚔️',desc:'突进技能，附带眩晕2秒'},
      {name:'旋风斩',icon:'🌀',desc:'范围AOE，持续伤害'},
    ],
    rotation:'挑衅怒吼开场 → 冲锋斩控怪 → 盾墙抗高压 → 旋风斩清怪 → 循环',
    gear:'推荐「钢铁壁垒」套装：全防御属性。武器优先「守护者巨剑」+「铁壁盾牌」。副属性优先生命值和减CD',
    weatherAdvice:'所有天气都能打，暴雪天全图减速反而让坦克更容易粘住敌人。',
  },
  {
    id:'greatsword-dagger', slug:'greatsword-dagger',
    weapons: ['greatsword','dagger'],
    comboName:'⚔️巨剑 + 🗡️匕首',
    role:'近战DPS',
    tier:'A',
    difficulty:'高',
    summary:'爆发最高的近战组合。巨剑的正面硬刚加上匕首的背刺爆发，一套连招可以秒杀同装等布甲职业。',
    pros:[
      '近战爆发全游戏最高',
      '野外偷人一把好手',
      '匕首提供隐身切入',
      '1v1王者',
    ],
    cons:[
      '操作难度高，连招失误等于送人头',
      '团战容易被集火',
      '持续输出不足，打完一套就疲软',
      '装备成本高',
    ],
    skills:[
      {name:'毁灭打击',icon:'⚔️',desc:'巨剑终结技，对低血量敌人造成额外伤害'},
      {name:'暗影步',icon:'🌑',desc:'瞬移到目标背后，下次攻击必暴击'},
      {name:'背刺',icon:'🗡️',desc:'匕首核心技能，背后攻击+50%伤害'},
      {name:'狂怒',icon:'💢',desc:'增加攻速和暴击率，持续10秒'},
    ],
    rotation:'暗影步切入 → 背刺 → 狂怒增伤 → 毁灭打击斩杀 → 隐身撤退等CD',
    gear:'推荐「暗影猎手」套装：+暴击和暴击伤害。武器优先「狂战士巨剑」+「暗影匕首」',
    weatherAdvice:'浓雾天视野差，近战优势极大，这个build在雾里是噩梦。',
  },
  {
    id:'longbow-dagger', slug:'longbow-dagger',
    weapons: ['longbow','dagger'],
    comboName:'🏹长弓 + 🗡️匕首',
    role:'远程DPS/刺客',
    tier:'A',
    difficulty:'高',
    summary:'风筝流天花板。长弓远距离压血线，匕首近身收割。高机动性让对手抓不住你。',
    pros:[
      '机动性全游最高',
      '风筝打法让近战绝望',
      '单人野外生存能力强',
      '收残血能力一流',
    ],
    cons:[
      '群战AOE不足',
      '操作量巨大，非常累手',
      '被控制就暴毙',
      '装备不好时伤害刮痧',
    ],
    skills:[
      {name:'精准射击',icon:'🎯',desc:'长弓蓄力技，距离越远伤害越高'},
      {name:'标记',icon:'🏷️',desc:'标记目标，你的攻击对其+20%伤害'},
      {name:'后跳射击',icon:'↩️',desc:'后跳同时射出一箭，减速敌人'},
      {name:'割喉',icon:'🔪',desc:'匕首近身技，沉默目标2秒'},
    ],
    rotation:'标记 → 精准射击远程消耗 → 后跳射击拉开距离 → 敌人残血时近身割喉收尾',
    gear:'推荐「游侠」套装：+移动速度和暴击。武器优先「穿云长弓」+「疾风匕首」',
    weatherAdvice:'晴天射程+10%让长弓压制力更强。雨天脚步降低，先手优势大。',
  },
  {
    id:'crossbow-dagger', slug:'crossbow-dagger',
    weapons: ['crossbow','dagger'],
    comboName:'🎯弩 + 🗡️匕首',
    role:'爆发DPS/刺客',
    tier:'A',
    difficulty:'中',
    summary:'瞬间爆发最高的组合。弩的连射叠加毒层，匕首引爆毒伤，双倍毒爆可以在2秒内打出天文数字。',
    pros:[
      '2秒爆发全游最高',
      '毒伤无视部分防御',
      '刺客中操作相对简单',
      '战场收割能力极强',
    ],
    cons:[
      '打完一套就萎了',
      '持续作战能力差',
      '被风筝就废了',
      '毒可以被治疗驱散',
    ],
    skills:[
      {name:'淬毒连射',icon:'🏹',desc:'对目标快速射击3次，每次叠加毒层'},
      {name:'毒爆',icon:'💚',desc:'引爆目标身上的毒层，每层造成额外伤害'},
      {name:'疾跑',icon:'💨',desc:'短时间大幅提升移速'},
      {name:'处决',icon:'🗡️',desc:'对中毒目标+30%伤害'},
    ],
    rotation:'淬毒连射叠毒 → 毒爆引爆 → 疾跑追击/撤退 → 处决收残血',
    gear:'推荐「毒刃」套装：+毒伤和暴击。武器优先「淬毒弩」+「剧毒匕首」',
    weatherAdvice:'雨天脚步声降低，偷袭更容易成功。晴天视野好适合远程起手。',
  },
  {
    id:'staff-longbow', slug:'staff-longbow',
    weapons: ['staff','longbow'],
    comboName:'⚡法杖 + 🏹长弓',
    role:'远程法系DPS',
    tier:'B',
    difficulty:'中',
    summary:'双远程组合，手最长的build。法杖铺场AOE，长弓远程收割，团战中站在最后排输出。',
    pros:[
      '攻击距离最远',
      '阵地战王者',
      '大規模团战伤害可观',
      '晴天双远程加成',
    ],
    cons:[
      '被近身必死',
      '没治疗没护盾不能自保',
      '移动战输出大打折扣',
      '装备不好伤害感人',
    ],
    skills:[
      {name:'火焰之雨',icon:'🔥',desc:'大范围火雨，持续伤害'},
      {name:'冰箭',icon:'❄️',desc:'减速+伤害'},
      {name:'狙击',icon:'🎯',desc:'长弓超远距离单体高伤'},
      {name:'闪电链',icon:'⚡',desc:'连锁闪电AOE'},
    ],
    rotation:'火焰之雨铺场 → 闪电链主输出 → 冰箭减速近身的敌人 → 狙击收残血',
    gear:'推荐「元素射手」套装：+魔法穿透和远程伤害。武器优先「大魔法师法杖」+「狙击长弓」',
    weatherAdvice:'晴天射程加成最适合双远程。雷暴天雷系增伤让闪电链更痛。',
  },
  {
    id:'wand-greatsword', slug:'wand-greatsword',
    weapons: ['wand','greatsword'],
    comboName:'📯魔杖 + ⚔️巨剑',
    role:'近战法系DPS/辅助',
    tier:'B',
    difficulty:'高',
    summary:'魔剑士流派，利用魔杖的debuff和持续伤害配合巨剑的爆发。能打能奶的混合职业。',
    pros:[
      '玩法独特，有新鲜感',
      '混合伤害让对手不好堆防御',
      '有治疗能自保',
      '反杀能力强',
    ],
    cons:[
      '打坦刮痧',
      '爆发不稳定',
      '两头都不精',
      '操作复杂',
    ],
    skills:[
      {name:'暗影箭',icon:'🌑',desc:'暗影伤害，附带减治疗效果'},
      {name:'腐蚀咒',icon:'☣️',desc:'持续暗影伤害，叠加层数'},
      {name:'巨剑斩',icon:'⚔️',desc:'正面高伤技能'},
      {name:'治愈波',icon:'💚',desc:'范围治疗'},
    ],
    rotation:'腐蚀咒叠层 → 暗影箭减治疗 → 巨剑斩爆发 → 治愈波维持血量',
    gear:'推荐「混响」套装：+魔法攻击和近战攻击。武器优先「暗影魔杖」+「裁决巨剑」',
    weatherAdvice:'暴雪天暗影系技能的控制延长效果显著。',
  },
  {
    id:'wand-shield', slug:'wand-shield',
    weapons: ['wand','sword-shield'],
    comboName:'📯魔杖 + 🛡️剑盾',
    role:'辅助/治疗',
    tier:'A',
    difficulty:'中',
    summary:'最强辅助组合。剑盾提供生存和群体减伤，魔杖提供治疗和buff。团队中的定海神针。',
    pros:[
      '治疗量最高',
      '生存力极强',
      '任何副本队伍都需要',
      'pvp阵地战核心',
    ],
    cons:[
      '输出最低',
      '单人游戏体验差',
      '队友死了先怪奶',
      '打怪效率极低',
    ],
    skills:[
      {name:'圣光术',icon:'✨',desc:'大额单体治疗'},
      {name:'群体治愈',icon:'💚',desc:'范围持续回血'},
      {name:'神圣护盾',icon:'🛡️',desc:'给队友加护盾'},
      {name:'净化',icon:'🔰',desc:'移除友方负面状态'},
    ],
    rotation:'圣光术保T → 群体治愈维持全团 → 神圣护盾档AOE → 净化解关键控制',
    gear:'推荐「圣职者」套装：+治疗量和冷却缩减。武器优先「救赎魔杖」+「守护者盾牌」',
    weatherAdvice:'不受天气影响，任何天气都能稳定发挥作用。',
  },
];

// Weather Engine
const WEATHER_TYPES = ['sun','rain','fog','thunder','snow'];
const WEATHER_CN = { sun:'晴天', rain:'暴雨', fog:'浓雾', thunder:'雷暴', snow:'暴雪' };
const WEATHER_EMOJI = { sun:'☀️', rain:'🌧️', fog:'🌫️', thunder:'⛈️', snow:'❄️' };
const WEATHER_DESC = {
  sun:'视野最佳，远程射程+10%。适合风筝和狙击流派。',
  rain:'水面上升，脚步声降低50%。刺客和河道作战有加成。',
  fog:'视野-70%，远程失效。近战和刺客的黄金天气。',
  thunder:'雷系伤害+50%，视野-30%。法师爆发期。',
  snow:'冰系控制延长30%，移速-15%。控制流派优势。',
};

function getWeather(serverOffset){
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utc + serverOffset * 3600000);
  const totalMin = local.getHours() * 60 + local.getMinutes();
  const phase = Math.floor(totalMin / 120);
  return WEATHER_TYPES[phase % WEATHER_TYPES.length];
}

function slugify(name){
  return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WEAPONS, BUILDS, WEATHER_TYPES, WEATHER_CN, WEATHER_EMOJI, WEATHER_DESC, getWeather, slugify };
}
