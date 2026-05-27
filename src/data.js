const WEAPONS = [
  { id:'greatsword', name:'双手剑', nameEn:'Greatsword', nick:'大剑', icon:'⚔️', role:'近战DPS', desc:'爆发型近战武器，挥出毁灭性的重击横扫多个敌人。拥有眩晕、击倒等强力控制技能，配合匕首的爆发伤害是目前PVP主流组合之一。', color:'#c0392b', tierPvE:'S', tierPvP:'A', bestWith:['dagger','sword-shield'] },
  { id:'sword-shield', name:'长剑', nameEn:'Sword & Shield', nick:'剑盾', icon:'🛡️', role:'坦克', desc:'坦克核心武器，格挡攻击坚守阵地保护队友。拥有嘲讽、拉近和击飞敌人的能力。团本必备，PVP中配合大剑或长矛也有强势表现。', color:'#2980b9', tierPvE:'A', tierPvP:'S', bestWith:['greatsword','wand','spear'] },
  { id:'dagger', name:'短剑', nameEn:'Dagger', nick:'匕首', icon:'🗡️', role:'爆发DPS', desc:'以致命精准和极速出击著称，双持淬毒匕首打出毁灭性连击。爆发伤害全武器最高，配合大剑/长弓/法杖都有出色表现。', color:'#8e44ad', tierPvE:'A', tierPvP:'S', bestWith:['greatsword','longbow','staff'] },
  { id:'longbow', name:'长弓', nameEn:'Long Bow', nick:'弓', icon:'🏹', role:'远程DPS', desc:'远距离精准射击，钉住敌人造成毁灭性伤害。PVE清怪效率极高，PVP中配合魔杖作为补师是最佳辅助组合之一。', color:'#27ae60', tierPvE:'S', tierPvP:'B', bestWith:['wand','dagger','crossbow'] },
  { id:'crossbow', name:'弩弓', nameEn:'Crossbow', nick:'弩', icon:'🎯', role:'中程DPS', desc:'双持弩弓倾泻弹幕，攻速快、机动性高。配合短剑的毒伤叠加，在PVP小规模战斗中极为强势。', color:'#e67e22', tierPvE:'B', tierPvP:'A', bestWith:['longbow','dagger'] },
  { id:'staff', name:'魔杖', nameEn:'Staff', nick:'法师', icon:'🪄', role:'法系DPS', desc:'驾驭自然之力召唤闪电或烈焰，利用天气系统打出毁灭性元素攻击。雨天增强闪电伤害，风天扩大火焰范围。', color:'#3498db', tierPvE:'A', tierPvP:'S', bestWith:['dagger','wand','longbow'] },
  { id:'wand', name:'魔法棒', nameEn:'Wand & Tome', nick:'法书/补师', icon:'✨', role:'治疗/辅助', desc:'使用黑暗魔法诅咒削弱敌人，同时用强大的治疗魔法支援队友。副本中最重要的角色，几乎所有队伍都需要补师。', color:'#f39c12', tierPvE:'S', tierPvP:'A', bestWith:['staff','longbow','sword-shield'] },
  { id:'gauntlets', name:'鐵爪', nameEn:'Gauntlets', nick:'拳套', icon:'👊', role:'近战DPS', desc:'以尖刺拳套撕裂敌人，造成无法愈合的伤口。连招打崩防线，贴身压制能力极强。当前版本PVP中的强势选择。', color:'#e74c3c', tierPvE:'A', tierPvP:'S', bestWith:['dagger','greatsword'] },
  { id:'orb', name:'魔力球', nameEn:'Orb', nick:'球', icon:'🔮', role:'辅助/控制', desc:'保护队友、阻挡敌人、创造战术优势的辅助武器。魔力球+弩弓(球弩)是新版本远程输出热门搭配之一。', color:'#9b59b6', tierPvE:'A', tierPvP:'A', bestWith:['wand','staff','crossbow'] },
  { id:'spear', name:'长矛', nameEn:'Spear', nick:'枪', icon:'🔱', role:'近战DPS', desc:'以长矛统治战场，群伤能力出色、可击穿敌人防线。PVE清怪和PVP阵地战都有良好表现。配合剑盾(盾矛)是坦克型输出组合。', color:'#1abc9c', tierPvE:'A', tierPvP:'A', bestWith:['sword-shield','greatsword'] },
];

const SECTIONS = {
  beginner: {
    title:'新手入门指南', slug:'beginner', summary:'从零开始的王权与自由冒险，涵盖服务器选择、基础设置和成长路线。',
    items:[
      { step:1, title:'选择服务器', icon:'🌏', desc:'亚服推荐「葛瑞达」，使用NC Purple平台。国际服推荐日本太平洋区「Prophecy」，Steam平台直接下载。亚服有专属快速成长箱福利，新手和回归玩家可免费获得整套英雄装备。' },
      { step:2, title:'环境设定', icon:'⚙️', desc:'打开认知强化模式→总是使用(显示血条)；关闭自动选择目标第2顺位(防止打完怪自动跑向附近怪)；攻击设置中勾选"快速使用方向/位置指定技能"和"对目标使用方向/位置指定技能"。' },
      { step:3, title:'完成主线任务', icon:'📜', desc:'主线任务(冒险)是最快升级方式，跟随紫色主线到达55级约需10-15小时。升至55级后务必完成外传「我的快乐小屋」和「希拉贝斯的双翼(上)(下)」，解锁房屋和12人突袭副本。' },
      { step:4, title:'世界树引导', icon:'🌳', desc:'在2025年9月前最高战力5000以下的玩家，可通过世界树的引导获得整套已升级装备(高级→稀有→英雄1→英雄2)。这是新手快速追赶战力的核心途径。' },
      { step:5, title:'委托与每周任务', icon:'📋', desc:'每天10个委托任务获取委托铸币，推荐选奖励有高贵磨练结晶的委托。主第10幕解锁每周任务，完成指定分数获重要物品。委托领取券上限60个，每天早上自动补充10个。' },
      { step:6, title:'公会加入', icon:'🏰', desc:'公会是游戏最重要的社交系统。加入后解锁公会突袭(每周最多7只野外首领，必掉英雄以上装备)、祈愿石/次元石争夺、攻城战。公会等级越高全成员能力值加成越多。' },
    ]
  },
  dungeons:{
    title:'副本攻略', slug:'dungeons', summary:'从5星普通副本到3星英雄次元阵，再到12人团本，掌握每个副本的机制和打法。',
    items:[
      { name:'死神深渊', type:'5星副本', difficulty:'普通', players:'4人', level:'Lv.55 战1600+', rewards:['装备','料理材料','技能成长书'], tip:'入门副本，熟悉基本机制即可通关。', boss:'死神监视者', icon:'💀', color:'#95a5a6' },
      { name:'恐怖之岛', type:'4星副本', difficulty:'普通', players:'4人', level:'Lv.55 战2500+', rewards:['装备','冒险铸币','武器专家印章'], tip:'凯尔塔基：清雾喷泉→变老鼠钻地吃花→十字天火→坦克开减伤吃火球。精英怪发狂爬虫注意火圈。', boss:'凯尔塔基', icon:'🏝️', color:'#8e44ad' },
      { name:'空虚荒原', type:'4星副本', difficulty:'普通', players:'4人', level:'Lv.55 战2500+', rewards:['装备','冒险铸币','符文'], tip:'沙卡鲁克斯：紫线必须格挡否则灭团；红球→引力阵；黄眼珠坦克面向Boss喷柱子；全体黄眼珠贴Boss。', boss:'沙卡鲁克斯', icon:'🏜️', color:'#e67e22' },
      { name:'怨恨之森', type:'3星纪录', difficulty:'精銳', players:'4人', level:'Lv.55 战3500+', rewards:['英雄2段装备','高贵磨练结晶','混沌符文'], tip:'坎札伊金王：火圈点名陨石(补师+1人分担)→四连炸(内/中/外环)→灭火机制→红眼点名跳下平台。改版后红眼需按顺序排球不能跳。', boss:'坎札伊金王', icon:'🌲', color:'#27ae60' },
      { name:'悲剧大宅邸', type:'3星纪录', difficulty:'精銳', players:'4人', level:'Lv.55 战3500+', rewards:['英雄2段装备','高贵磨练结晶','符文'], tip:'莉慕妮:荆棘外突(红圈诅咒3+分担)→荆棘禁锢(绿圈放毒地板)→木化诅咒(坦克面向石化队友,BOSS斜劈解除)。建议双补。', boss:'莉慕妮·贝尔坎特', icon:'🏚️', color:'#9b59b6' },
      { name:'狂气教堂', type:'3星纪录', difficulty:'精銳', players:'4人', level:'Lv.55 战3700+', rewards:['英雄2段装备','高贵磨练结晶','符文选择箱'], tip:'格赖埃:飞天三段炸(内-外-内或外-内-外)→蓝眼恐惧(非蓝眼玩家背对Boss)→扫描僵尸(1-4号灭杀)→层数叠加增伤。每死一人恶性循环，低战不建议。', boss:'格赖埃', icon:'⛪', color:'#e74c3c' },
      { name:'扭曲执著密室', type:'2星精锐', difficulty:'精銳', players:'4人', level:'Lv.55 战4000+', rewards:['英雄2段装备','高级材料','士兵娃娃'], tip:'精锐副本需要契约凭证:次元1才能开箱。坦克需要会拉怪跳怪，补师注意拉怪期间不要补坦克以免OT。', boss:'扭曲执行者', icon:'🌀', color:'#2c3e50' },
      { name:'终炎寺院', type:'1星英雄', difficulty:'英雄', players:'4人', level:'Lv.55 战5500+', rewards:['英雄3段装备','高贵磨练结晶','人工製品'], tip:'英雄副本需要契约凭证:次元2。推荐使用队伍配对的随机英雄模式快速匹配。', boss:'炎之守护者', icon:'🔥', color:'#c0392b' },
      { name:'永恒地下洞穴', type:'1星英雄', difficulty:'英雄', players:'4人', level:'Lv.55 战5500+', rewards:['英雄3段装备','高级人工製品','符文'], tip:'英雄难度战斗力和机制要求更高。建议先熟悉普通/精锐模式再挑战。', boss:'永恒之影', icon:'🕳️', color:'#8e44ad' },
      { name:'混沌魔女祭坛', type:'12人突袭', difficulty:'普通/熟练/极限', players:'12人', level:'普通5000+ 熟练6000+ 极限7000+', rewards:['独~特~装备','混沌灵魂石','最高级符文'], tip:'前置需完成外传「希拉贝斯的双翼」。3个区域3只首领，第3首领掉落独特装备。每周每种难度第3首领可得1件独特装备。', boss:'混沌魔女', icon:'👑', color:'#c0392b' },
    ]
  },
  pvp:{
    title:'PVP攻略', slug:'pvp', summary:'从星云岛到竞技场，再到万人攻城战，掌握所有PVP模式的核心玩法。',
    items:[
      { title:'星云岛激战场', subtitle:'跨服PVE/PVP混合', type:'大型战场', icon:'🌌', desc:'跨服务器共同游玩，每周基本5小时(可用星云充能石增加)。中立区(抵抗军探查基地)、PVE区(迷雾森林)、PVP区(亚奇恩驻地/兽人部落/牺牲寺院/被封印圣所)。获得星云石、符文、人工製品和星云饰品。', tips:['每地区不定时整点出野外首领','每天1场活动+1场星云岛首领','周日2场首领，皆为公会模式','PVP区注意敌对公会偷袭'] },
      { title:'3v3竞技场', subtitle:'竞技排名赛', type:'竞技场', icon:'⚔️', desc:'三人小队技巧性战斗。配对时需选择坦/打/补角色，每个角色限定可用武器。考验个人操作与团队配合。', tips:['携带控制+爆发组合','集火最脆弱目标(优先补师)','提前排练技能连携','利用地图角落限制走位','紫色暴怒攻击按Q格挡','菱形盛怒攻击按方向+Q闪避'] },
      { title:'公会据点争夺', subtitle:'祈愿石/次元石/深渊石', type:'公会战', icon:'🏰', desc:'祈愿石(争周一/五22:00)每个野外地区1个→跨服公会战。次元石(争周二/六22:00)每个野外首领1个→每天可打首领。深渊石在非保护时间随时争夺。占点期间可用传送功能。', tips:['宣战在争夺前一天早至当天早','攻方使用变身翻越城墙','守方集中在核心防守','攻城高仑可投掷队友入城','提前侦察地形制定路线'] },
      { title:'攻城战', subtitle:'岩石镇/跨服攻城', type:'大规模公会战', icon:'🗡️', desc:'亚服隔周日20:00攻城战，先护税19:30后攻城。跨服攻城战在岩石镇攻城后一周进行。百人同屏、公会排名战。', tips:['守方提前布置公会用品商人','攻方多线突破分散防守','特殊变身扭转战局','配合天气使用范围技能'] },
      { title:'战场系统', subtitle:'周1-5 17-24点 / 周末12-24点', type:'占领战', icon:'⚡', desc:'两队争夺多个据点，达到特定条件可操作战场高仑或特殊变身。胜利80铸币/和局60/失败40，每场额外贡献最多20铸币，周上限800。', tips:['优先占领据点多于击杀','破坏箱子获得增益','注意高仑刷新时机','组满3人队提高胜率'] },
    ]
  },
  morph:{
    title:'变形与变身', slug:'morph', summary:'掌握变形(野性)与变身(特殊)系统，在索利西姆世界自由穿梭。',
    items:[
      { name:'疾驰(狼)', icon:'🐺', effect:'提高地面移动速度，快速穿越野外区域', type:'野性·移动' },
      { name:'滑翔(鸟)', icon:'🦅', effect:'可在空中滑翔飞行，雨天解锁更多区域', type:'野性·机动' },
      { name:'游泳(鱼)', icon:'🐟', effect:'水中快速游泳，探索水下区域和岛屿', type:'野性·探索' },
      { name:'攻城高仑', icon:'🗿', effect:'变身可投掷队友翻越城墙，攻城战专用', type:'特殊·攻城' },
      { name:'伪装变身', icon:'🎭', effect:'伪装的特殊变身，主线和支线任务获得', type:'特殊·潜入' },
      { name:'士兵娃娃', icon:'🧸', effect:'召唤协助拾取物品恢复生命，其他派远征', type:'收集·养成' },
    ]
  },
  economy:{
    title:'货币与经济', slug:'economy', summary:'了解游戏中的货币体系，高效管理你的资产和资源。',
    items:[
      { name:'辉币', icon:'💎', desc:'交易所指定货币，用于购买玩家上架的物品。背包扩至150格以上也需要辉币。在交易所上架装备/萃取物/家具/食物/材料/灵石(需大成功)卖出获得。', obtain:'充值 / 交易所卖装备材料', color:'#9b59b6' },
      { name:'索兰特币', icon:'🪙', desc:'基础游戏货币，用于制作、强化、购买NPC物品。深渊打怪、任务、出售物品获得。背包150格以内用索兰特币扩充。', obtain:'打怪掉落 / 任务奖励 / 出售物品', color:'#f39c12' },
      { name:'委托铸币', icon:'📋', desc:'完成委托任务获得的核心日常货币。用于购买萃取石、配方:珍貴恢复灵石、神秘钥匙、武器选择箱等。', obtain:'每日委托 / 料理委托 / 深渊选择箱', color:'#2ecc71' },
      { name:'公会铸币', icon:'🏅', desc:'公会活动专属货币，兑换稀有恢复灵石、高贵磨练结晶、转换石、解锁石、元素力再生药水等。', obtain:'公会捐赠 / 公会委托 / 公会地区活动', color:'#e74c3c' },
      { name:'战场铸币', icon:'⚔️', desc:'PVP专属货币，兑换战斗相关材料和装备。', obtain:'战场 / 竞技场 / 跨服公会战 / 攻城战', color:'#3498db' },
      { name:'冒险铸币:不屈', icon:'⚜️', desc:'副本专用货币，向万物工坊换取装备和素材。', obtain:'次元阵副本 / 挑战次元阵', color:'#1abc9c' },
    ]
  },
  features:{
    title:'核心系统', slug:'features', summary:'王权与自由独有的特色系统，让这款MMORPG与众不同。',
    items:[
      { title:'天气与昼夜', icon:'🌤️', desc:'天气影响技能效果和怪物行为。雨天增强闪电伤害(法杖)，夜晚出现更强敌人。天气解锁隐藏区域和特殊事件。奇坎特里泰(鲸鱼)每天8次起飞，背上可挖矿。空中岛上有高级采集物。' },
      { title:'武器精通', icon:'⚔️', desc:'每把武器最高200级。使用获得经验，内有4领域(辅助/攻击/防御/战术)节点。消耗专业点数解锁。综合专业等级决定可启用技能数量，最多4种综合专业技能。特殊商店可买武器专业转换书。' },
      { title:'技能特化', icon:'✨', desc:'每种武器有独立技能树，技能可升级(高→稀→英)改变效果。主副武器共100点特化点数分配。部分武器特殊效果和技能特化不能同时触发，需谨慎选择。' },
      { title:'装备特性', icon:'🛡️', desc:'每件装备3特性+1共鸣。特性可强化(同部位同特性装备)、解锁(解锁石)、转换(转换石)。全满后可开启共鸣。萃取特性可将装备变成可交易萃取物。英雄3段以上装备值得萃取。' },
      { title:'人工制品与符文', icon:'🔮', desc:'护身符1-4+太阳石+月亮石可组合套装效果(2/4/6件)。用文物分析水晶体成长属性。符文分攻击/防御/支援/混沌，装武器和饰品上。混沌符文有正面+负面效果，最多存100个。' },
      { title:'公会领地', icon:'🏰', desc:'祈愿石(每周一/五)：占据期间全公会加成。次元石(每周二/六)：每天可进首领空间打野外首领，必掉英雄以上装备。深淵石：非保护时间随时争夺。攻城战(隔周日)：占领岩石镇城堡。' },
      { title:'变形与变身', icon:'🦅', desc:'野性变形：疾驰(陆地)/滑翔(空中)/游泳(水域)。特殊变身：伪装潜入/攻城高仑。城主力量可做守护者技能。士兵娃娃可召唤协助或派远征搜集材料。' },
      { title:'住房与钓鱼', icon:'🏠', desc:'在索利西姆购买房屋展示自制家具。生活技能包括钓鱼(全图鉴220种)、采集(伐木/采矿/皮草/手艺)、烹饪。料理是重要Buff来源。远征可派出士兵娃娃自动收集材料。' },
    ]
  }
};

const BUILDS = [
  { name:'长剑+双手剑', slug:'sword-greatsword', tier:'A', role:'坦/近战', desc:'盾剑组合，最强坦克搭配。团本必备的T位，能抗能打。仇恨稳定，生存能力极强。' },
  { name:'长剑+长矛', slug:'sword-spear', tier:'A', role:'坦/近战', desc:'盾矛组合，坦克分支。长矛群伤弥补剑盾单体输出不足，阵地战压制力强。' },
  { name:'长剑+魔法棒', slug:'sword-wand', tier:'B', role:'坦/辅助', desc:'盾书组合，坦克+自疗。生存力极高但输出较低，适合新手坦克熟悉机制。' },
  { name:'双手剑+短剑', slug:'greatsword-dagger', tier:'S', role:'近战爆发', desc:'剑匕组合，小规模PVP之王。大剑AOE控场+眩晕，匕首贴身爆发收割，是目前最热门的近战组合。' },
  { name:'长矛+短剑', slug:'spear-dagger', tier:'A', role:'近战/游击', desc:'枪匕组合，高机动近战。长矛范围压制+匕首单点爆发，PVP突后排能力强。' },
  { name:'弩弓+短剑', slug:'crossbow-dagger', tier:'S', role:'中程爆发', desc:'弩匕组合，机动性极强的远程爆发。毒伤叠加+弩弓弹幕，PVP小规模战斗表现优秀。' },
  { name:'长弓+魔法棒', slug:'longbow-wand', tier:'S', role:'远程/治疗', desc:'弓书组合，最佳副本辅助治疗。远程安全输出+强力治疗，PVE必备补师组合。' },
  { name:'魔杖+魔法棒', slug:'staff-wand', tier:'A', role:'法系/治疗', desc:'法书组合，攻守兼备。元素伤害+治疗兼顾，大规模PVP价值极高。法系玩家的首选补师组合。' },
  { name:'长弓+弩弓', slug:'longbow-crossbow', tier:'B', role:'双远程', desc:'弓弩组合，PVE清怪效率最高的组合。远程火力压制，但PVP自保能力弱，适合新手打怪升级。' },
  { name:'魔杖+短剑', slug:'staff-dagger', tier:'S', role:'法系刺客', desc:'法匕组合，魔法刺客。法杖元素AOE配合匕首贴身爆发，PVP中一套连招带走脆皮。操作要求高但上限极高。' },
  { name:'魔力球+弩弓', slug:'orb-crossbow', tier:'A', role:'远程输出/辅助', desc:'球弩组合，新版本热门。魔力球辅助控制+弩弓持续输出，PVE和PVP都有不俗表现。' },
  { name:'魔力球+魔法棒', slug:'orb-wand', tier:'A', role:'辅助/治疗', desc:'球书组合，战术辅助核心。魔力球屏障保护+魔法棒治疗，团队生存能力最大化。' },
  { name:'铁爪+短剑', slug:'gauntlets-dagger', tier:'S', role:'近战压制', desc:'爪匕组合，新版本最强近战压制流。铁爪破防撕裂+匕首爆发终结技，连招碾压一切。' },
  { name:'长弓+魔杖', slug:'longbow-staff', tier:'A', role:'远程/法系', desc:'弓法组合，远程火力压制。长弓精准+法杖AOE，PVE刷怪效率高，远程安全输出。' },
];

const TIERS = [
  { tier:'S', color:'#ff4757', bg:'rgba(255,71,87,0.15)', builds:['greatsword-dagger','crossbow-dagger','staff-dagger','longbow-wand','gauntlets-dagger'] },
  { tier:'A', color:'#ffa502', bg:'rgba(255,165,2,0.15)', builds:['sword-greatsword','sword-spear','spear-dagger','staff-wand','orb-crossbow','orb-wand','longbow-staff'] },
  { tier:'B', color:'#2ed573', bg:'rgba(46,213,115,0.15)', builds:['sword-wand','longbow-crossbow'] },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WEAPONS, SECTIONS, BUILDS, TIERS };
}
