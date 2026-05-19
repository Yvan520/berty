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
  {
    id:'staff-dagger', slug:'staff-dagger',
    weapons: ['staff','dagger'],
    comboName:'⚡法杖 + 🗡️匕首',
    role:'魔法刺客',
    tier:'B',
    difficulty:'高',
    summary:'元素刺客流派。利用法杖的范围控制和匕首的高爆发切入，打出混合伤害。适合喜欢高风险高回报的玩家。',
    pros:[
      '魔法+物理混合伤害，对手难以针对',
      '爆发连招有秒杀能力',
      '玩法独特，不容易被预判',
      '有隐身技能可以撤退',
    ],
    cons:[
      '操作极其复杂',
      '身板脆，失误就死',
      '持续输出能力差',
      '装备成本高，需要两套属性',
    ],
    skills:[
      {name:'冰霜新星',icon:'❄️',desc:'范围冰冻，控制2秒'},
      {name:'暗影步',icon:'🌑',desc:'瞬移背后，下次攻击必爆'},
      {name:'雷击',icon:'⚡',desc:'单体高伤雷系技能'},
      {name:'背刺',icon:'🗡️',desc:'背后攻击+50%伤害'},
    ],
    rotation:'冰霜新星控场 → 雷击输出 → 暗影步切入 → 背刺爆发',
    gear:'推荐「元素刺客」混搭套：法系穿透+物理暴击混搭。武器优先「风暴法杖」+「暗影匕首」',
    weatherAdvice:'雷暴天雷系加成让法杖伤害质变。浓雾天近战加成让背刺伤害更高。',
  },
  {
    id:'crossbow-shield', slug:'crossbow-shield',
    weapons: ['crossbow','sword-shield'],
    comboName:'🎯弩 + 🛡️剑盾',
    role:'远程坦克',
    tier:'B',
    difficulty:'中',
    summary:'另类坦克玩法。利用剑盾的仇恨和生存能力，配合弩的远程输出，可以在安全距离拉住怪物。',
    pros:[
      '远程拉怪，容错率高',
      '生存能力比纯远程强很多',
      'PvP中能抗能打',
      '玩法有新鲜感',
    ],
    cons:[
      '输出不如纯DPS',
      '仇恨不如纯坦克稳',
      '定位尴尬，队伍可能不认可',
      '装备选择困难',
    ],
    skills:[
      {name:'挑衅射击',icon:'🎯',desc:'远程挑衅，强制目标攻击你'},
      {name:'盾墙',icon:'🛡️',desc:'大幅减伤6秒'},
      {name:'连射',icon:'🏹',desc:'快速射击，叠加伤害'},
      {name:'震荡射击',icon:'💥',desc:'击退+减速'},
    ],
    rotation:'挑衅射击开怪 → 连射输出 → 震荡射击控制 → 盾墙抗高压',
    gear:'推荐「铁壁射手」套装：+防御和远程伤害。武器优先「坚盾弩」+「壁垒盾牌」',
    weatherAdvice:'晴天远程增伤收益最高。暴雪天全图减速对这个组合影响最小。',
  },
  {
    id:'longbow-staff', slug:'longbow-staff',
    weapons: ['longbow','staff'],
    comboName:'🏹长弓 + ⚡法杖',
    role:'远程法系DPS',
    tier:'B',
    difficulty:'低',
    summary:'双远程新手友好组合。全程保持距离输出，操作简单。长弓打单体，法杖打群体，适用场景全面。',
    pros:[
      '操作最简单，适合新手',
      '攻击距离最远，安全',
      '单体AOE都能打',
      '练级效率高',
    ],
    cons:[
      '被近身就死',
      '没有自保技能',
      '爆发不足',
      '移动战表现差',
    ],
    skills:[
      {name:'多重射击',icon:'🏹',desc:'长弓AOE，对前方扇形区域造成伤害'},
      {name:'火焰之雨',icon:'🔥',desc:'法杖范围持续伤害'},
      {name:'精准射击',icon:'🎯',desc:'长弓蓄力单体高伤'},
      {name:'闪电链',icon:'⚡',desc:'法杖连锁闪电'},
    ],
    rotation:'火焰之雨铺场 → 多重射击清怪 → 精准射击打精英 → 闪电链收残血',
    gear:'推荐「元素射手」套装：+魔法攻击和远程暴击。武器优先「鹰眼长弓」+「元素法杖」',
    weatherAdvice:'晴天远程射程加成全游戏收益最高的组合。雷暴天闪电链伤害翻倍。',
  },
  {
    id:'dagger-shield', slug:'dagger-shield',
    weapons: ['dagger','sword-shield'],
    comboName:'🗡️匕首 + 🛡️剑盾',
    role:'敏捷坦克',
    tier:'B',
    difficulty:'中',
    summary:'高速坦克流派。放弃部分防御换取机动性，利用匕首的高闪避和剑盾的减伤打出灵活的坦克玩法。',
    pros:[
      '机动性最高的坦克',
      '闪避流对某些boss有奇效',
      'PvP中能缠住后排',
      '野外生存能力最强',
    ],
    cons:[
      '不稳定，闪避看脸',
      '面对魔法boss很脆',
      '仇恨控制需要技巧',
      '需要特定装备支持',
    ],
    skills:[
      {name:'闪避姿态',icon:'💨',desc:'短时间内大幅提升闪避率'},
      {name:'盾击',icon:'🛡️',desc:'眩晕目标2秒'},
      {name:'暗影步',icon:'🌑',desc:'瞬移到目标背后'},
      {name:'挑衅',icon:'📢',desc:'强制攻击你'},
    ],
    rotation:'闪避姿态开怪 → 挑衅建立仇恨 → 盾击打断关键技能 → 暗影步追击',
    gear:'推荐「疾风壁垒」套装：+闪避和减CD。武器优先「疾风匕首」+「轻盈盾牌」',
    weatherAdvice:'浓雾天近战加成明显，是这套build的最佳天气。',
  },
];

// Guide Pages (high-search-volume topics)
const GUIDES = [
  {
    id:'class-guide', slug:'class-guide',
    title:'王权与自由职业推荐 2026 — 新手选什么职业？',
    summary:'2026年最新职业推荐，从零氪/微氪/PvP/PvE四个维度分析7把武器的强度，帮你找到最适合的入门职业。',
    sections:[
      { heading:'新手首选：巨剑+剑盾（坦克）', content:'如果你是第一次玩MMORPG，巨剑+剑盾是最宽容的选择。操作简单，副本就业率100%，装备便宜。缺点是单刷慢，但组队永远有人要。' },
      { heading:'零氪推荐：法杖+魔杖（法系DPS/治疗）', content:'法杖+魔杖是零氪玩家的最佳选择。不需要极品装备就能打出可观的AOE伤害，副本里能奶能打，容易进组。' },
      { heading:'微氪推荐：弩+匕首（刺客）', content:'微氪玩家建议玩弩+匕首。这套组合对装备投入的回报率最高，小氪就能在PvP里秒人，野外偷人体验极佳。' },
      { heading:'PvE爱好者的选择', content:'纯PvE玩家推荐长弓+法杖，双远程最安全，打副本输出环境好。或者巨剑+剑盾，坦克永远不缺队伍。' },
      { heading:'PvP玩家的选择', content:'PvP玩家首选弩+匕首（爆发秒人）或长弓+匕首（风筝拉扯）。这两个组合在战场和野外PvP中表现最优。' },
      { heading:'武器强度排名', content:'当前版本（2026年5月）：S级=法杖+魔杖、巨剑+剑盾；A级=巨剑+匕首、长弓+匕首、弩+匕首、魔杖+剑盾；B级=法杖+长弓、魔杖+巨剑' },
    ]
  },
  {
    id:'newbie-faq', slug:'newbie-faq',
    title:'王权与自由新手FAQ — 入坑前必看的20个问题',
    summary:'国际服/亚服入坑常见问题汇总：服务器选择、职业推荐、汉化方法、配置要求、前期该做什么。',
    sections:[
      { heading:'国际服还是亚服？', content:'国际服（Amazon运营）：全球玩家最多，英文为主，有欧美/日本/东南亚服务器。亚服（NCSoft运营）：韩服，需要韩国手机验证。推荐国际服，人多且不需要验证。' },
      { heading:'需要加速器吗？', content:'国际服需要加速器，推荐UU加速器或迅游加速器。亚服如果直连韩国延迟在100ms以下可以不用。' },
      { heading:'有中文吗？', content:'目前官方没有中文。可以通过汉化补丁实现界面汉化，但不推荐——游戏更新频繁，汉化容易失效。建议直接查攻略。' },
      { heading:'推荐哪个服务器？', content:'国际服推荐美服Throne Peak（人口最多）或日服Sakura Realm（亚洲延迟最低）。亚服推荐Dragon Valley。' },
      { heading:'配置要求高吗？', content:'最低配置：i5-6600 + GTX960 + 16G内存。推荐配置：i7-10700 + RTX2060 + 32G内存。这游戏优化一般，人多的场景很吃CPU。' },
      { heading:'前期做什么？', content:'1-50级做主线任务，50级后开始刷副本提升装备。优先完成"世界树的引导"任务线，可以拿到整套过渡装备。' },
    ]
  },
  {
    id:'leveling-guide', slug:'leveling-guide',
    title:'王权与自由练级路线 — 1-50级速成攻略',
    summary:'从建立角色到50级满级的最快练级路线，包含任务顺序、地图选择和练级技巧。',
    sections:[
      { heading:'1-30级：主线为主', content:'进游戏后只做主线任务，支线任务可以全部忽略。主线任务给的经验和装备是性价比最高的。大约4-6小时可以到30级。' },
      { heading:'30-40级：主线+地区任务', content:'30级后会遇到第一个经验瓶颈。此时除了主线，建议在每个地图接地区任务（Contract），紫色和蓝色任务优先做。每天有10个Contract上限。' },
      { heading:'40-45级：刷副本', content:'40级可以排普通副本。建议反复刷副本，既能升级又能攒装备。这个阶段大概需要2-3小时。' },
      { heading:'45-50级：冲刺阶段', content:'45级后的最后5级最慢。建议做每日任务+刷野外精英怪。如果有朋友带副本，这是最快的方式。大概需要3-4小时。' },
      { heading:'总时间', content:'熟练玩家大约12-15小时可以满级。第一次玩可能需要20-25小时。建议分2-3天完成，不要强求一天满级。' },
      { heading:'练级小技巧', content:'1）法杖+魔杖练级最快，AOE清怪效率最高；2）每天记得领免费的经验加成buff；3）组队练级效率提高30%；4）世界boss每天打一次，经验很多。' },
    ]
  },
  {
    id:'t2-gear-guide', slug:'t2-gear-guide',
    title:'王权与自由T2装备获取指南 — 2026最新版',
    summary:'T2装备的获取途径、掉落副本、制作方法和属性选择。从入门到毕业的全流程攻略。',
    sections:[
      { heading:'什么是T2装备？', content:'T2装备是50级后的进阶装备，基础属性比T1高30-50%。目前T2装备主要通过副本掉落、制作和拍卖行获得。' },
      { heading:'T2副本掉落', content:'2星次元阵（Dungeon）：掉落T2武器和防具碎片，每天有奖励次数限制。3星次元阵（高难）：掉落完整T2装备，但需要较高装备分才能进。' },
      { heading:'T2制作方法', content:'收集副本掉落的T2材料后，在主城的铁匠处制作。需要：T2碎片×20 + 材料精华×10 + 金币50000。制作出来的装备属性随机，可以重铸。' },
      { heading:'拍卖行购买', content:'不想刷副本可以直接在拍卖行买。价格根据部位和属性在5000-50000不等。推荐优先买武器，提升最大。' },
      { heading:'属性选择建议', content:'DPS职业：暴击>穿透>攻击力。坦克：生命值>减CD>防御。治疗：治疗量>冷却缩减>魔法攻击。' },
      { heading:'T2毕业路线', content:'1）先刷2星次元阵凑齐一套T2碎片→2）制作武器和核心防具→3）通过重铸优化属性→4）挑战3星副本获取毕业装→5）拍卖行补充缺失的极品部位' },
    ]
  },
  {
    id:'fishing-guide', slug:'fishing-guide',
    title:'王权与自由钓鱼全攻略 — 图鉴收集与收益最大化',
    summary:'钓鱼系统的完整攻略，包含全图鉴收集路线、钓鱼地点推荐、鱼饵选择和收益分析。',
    sections:[
      { heading:'钓鱼怎么解锁？', content:'完成主线任务到达野外地图后，找钓鱼NPC接取钓鱼任务，获得钓鱼竿和基础鱼饵。之后就可以在任何水域钓鱼。' },
      { heading:'各大地图钓鱼点推荐', content:'1）起始地图：适合新手练钓鱼等级，鱼种简单。2）沙漠地图：稀有鱼种多，收益最高的钓鱼点。3）雪地地图：寒冷天气特有鱼种，图鉴收集必去。' },
      { heading:'鱼饵选择', content:'普通鱼饵：钓普通鱼，成本低。高级鱼饵：钓稀有鱼，收益高但成本也高。特制鱼饵：图鉴专用，钓特定鱼种。建议日常用普通鱼饵，做图鉴时用特制鱼饵。' },
      { heading:'钓鱼收益', content:'钓鱼的主要收益：1）鱼可以卖钱，稀有鱼价格不菲。2）钓鱼代币可以兑换装备材料。3）全图鉴收集奖励稀有称号和外观。4）部分鱼可以做成料理buff。' },
      { heading:'全图鉴收集技巧', content:'全图鉴共220种鱼。建议按地图分区收集，每个图鉴只需要钓到一次。使用特制鱼饵可以增加稀有鱼上钩率。钓鱼等级越高，出现稀有鱼的概率越大。' },
      { heading:'时间效率建议', content:'钓鱼不是最快的赚钱方式，但胜在轻松。建议每天挂机钓鱼1小时，配合其他日常任务一起做。前期优先升级钓鱼等级到10级，解锁高级钓鱼点。' },
    ]
  },
];

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
  module.exports = { WEAPONS, BUILDS, GUIDES, WEATHER_TYPES, WEATHER_CN, WEATHER_EMOJI, WEATHER_DESC, getWeather, slugify };
}
