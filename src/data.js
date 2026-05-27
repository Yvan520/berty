const WEAPONS = [
  { id:'greatsword', name:'大剑', nameEn:'Greatsword', icon:'⚔️', role:'近战DPS', desc:'挥出毁灭性的重击，横扫多个敌人，眩晕并击倒对手。大剑是战场上的恐怖存在。', color:'#c0392b', tierPvE:'S', tierPvP:'A', bestWith:['dagger','sword-shield'] },
  { id:'sword-shield', name:'剑与盾', nameEn:'Sword & Shield', icon:'🛡️', role:'坦克', desc:'格挡攻击、坚守阵地保护队友，拉近或击飞敌人掌控战局。', color:'#2980b9', tierPvE:'A', tierPvP:'S', bestWith:['greatsword','wand'] },
  { id:'dagger', name:'匕首', nameEn:'Dagger', icon:'🗡️', role:'爆发DPS', desc:'以致命精准和极速出击，双持淬毒匕首打出毁灭性的连击。', color:'#8e44ad', tierPvE:'A', tierPvP:'S', bestWith:['greatsword','longbow','staff'] },
  { id:'longbow', name:'长弓', nameEn:'Long Bow', icon:'🏹', role:'远程DPS', desc:'远距离精准射击，钉住敌人造成毁灭性伤害，并为队友提供战术支援。', color:'#27ae60', tierPvE:'S', tierPvP:'B', bestWith:['wand','dagger','crossbow'] },
  { id:'crossbow', name:'十字弓', nameEn:'Crossbow', icon:'🎯', role:'中程DPS', desc:'双持十字弓倾泻弹幕，压制远距离敌人并持续控制战场。', color:'#e67e22', tierPvE:'B', tierPvP:'A', bestWith:['longbow','dagger'] },
  { id:'staff', name:'法杖', nameEn:'Staff', icon:'🪄', role:'法系DPS', desc:'驾驭自然之力召唤闪电或烈焰，利用天气系统打出毁灭性的元素攻击。', color:'#3498db', tierPvE:'A', tierPvP:'S', bestWith:['dagger','wand','longbow'] },
  { id:'wand', name:'魔杖与法典', nameEn:'Wand & Tome', icon:'✨', role:'治疗/辅助', desc:'使用黑暗魔法诅咒削弱敌人，同时用强大的治疗魔法支援队友。', color:'#f39c12', tierPvE:'S', tierPvP:'A', bestWith:['staff','longbow','sword-shield'] },
  { id:'gauntlets', name:'铁爪', nameEn:'Gauntlets', icon:'👊', role:'近战DPS', desc:'以尖刺拳套撕裂敌人，留下无法愈合的伤口。连招打崩防线，贴身压制。', color:'#e74c3c', tierPvE:'A', tierPvP:'S', bestWith:['dagger','greatsword'] },
  { id:'orb', name:'宝珠', nameEn:'Orb', icon:'🔮', role:'辅助/控制', desc:'保护队友、阻挡敌人、创造战术优势。掌握法球放置与远程引爆的艺术。', color:'#9b59b6', tierPvE:'A', tierPvP:'A', bestWith:['wand','staff'] },
  { id:'spear', name:'长枪', nameEn:'Spear', icon:'🔱', role:'近战DPS', desc:'以长枪统治战场，完美应对多个敌人并击穿他们的防线。', color:'#1abc9c', tierPvE:'A', tierPvP:'A', bestWith:['sword-shield','greatsword'] },
];

const SECTIONS = {
  beginner: {
    title:'新手入门指南', slug:'beginner', summary:'从零开始的王权与自由冒险，6步带你快速上手索利西姆世界。',
    items:[
      { step:1, title:'选择武器组合', icon:'⚔️', desc:'游戏没有固定职业，通过武器搭配定义角色定位。新手推荐长弓+十字弓（远程输出）或大剑+剑盾（坦克）。' },
      { step:2, title:'完成主线任务', icon:'📜', desc:'紫色主线任务是最快升级方式，跟随主线到达满级约需10-15小时，过程中解锁核心玩法、变形系统和副本。' },
      { step:3, title:'掌握委托系统', icon:'📋', desc:'10级开启委托任务，是获取材料、经验、委托币的核心日常。每天优先完成高价值委托。' },
      { step:4, title:'加入公会', icon:'🏰', desc:'公会是游戏最重要的社交单位，解锁公会副本、攻城战、领地争夺等核心玩法，建议尽早加入活跃公会。' },
      { step:5, title:'日常+副本循环', icon:'🔄', desc:'满级后每天约1-2小时完成日常与副本。组固定队效率最高，收益最稳定。' },
      { step:6, title:'掌握天气系统', icon:'⛈️', desc:'雨天增强闪电伤害，风天增强火焰范围。昼夜更替影响怪物种类，利用环境获得战术优势。' },
    ]
  },
  dungeons:{
    title:'副本攻略', slug:'dungeons', summary:'从精英副本到12人公会团本，每种挑战都有独特的机制和奖励。',
    items:[
      { name:'死亡之翼巢穴', type:'精英副本', difficulty:'普通', players:'1-4人', level:'Lv.30+', rewards:['绿色装备','委托币','技能书材料'], tip:'注意Boss的AOE范围技能，坦克保持嘲讽。', boss:'死亡之翼', icon:'🐉', color:'#27ae60' },
      { name:'深渊裂隙', type:'英雄副本', difficulty:'困难', players:'4-8人', level:'Lv.45+', rewards:['蓝色装备','神器强化石','稀有技能书'], tip:'第二Boss有分散机制，需要快速移动到指定位置。', boss:'虚空领主', icon:'🌀', color:'#8e44ad' },
      { name:'大君主讨伐', type:'世界Boss', difficulty:'地狱', players:'开放世界', level:'Lv.50+', rewards:['橙色神器装备','稀有图纸','大量Lucent'], tip:'关注世界Boss刷新时间，提前集合公会成员。', boss:'大君主', icon:'👑', color:'#e74c3c' },
      { name:'单人突破副本', type:'单人副本', difficulty:'动态', players:'1人', level:'Lv.50+', rewards:['专属成长材料','特殊符文','限定外观'], tip:'难度随等级动态调整，是单人玩家的核心成长途径。', boss:'影子幻象', icon:'⚡', color:'#f39c12' },
      { name:'公会团本', type:'终局副本', difficulty:'终局', players:'12人', level:'Lv.55', rewards:['T3顶级装备','公会荣誉','限定外观'], tip:'需要固定12人队伍，各职责分工明确。', boss:'天地意志', icon:'🔱', color:'#c0392b' },
    ]
  },
  pvp:{
    title:'PVP攻略', slug:'pvp', summary:'从3v3竞技场到大规模攻城战，掌握各类PVP玩法的制胜策略。',
    items:[
      { title:'星云岛开放战场', subtitle:'24小时开放', type:'大型公会战', icon:'🌌', desc:'索利西姆最大规模的PVP战场，多公会争夺核心节点。占领成功可获得全服增益效果。', tips:['优先占领资源点而非追杀','公会成员集中行动','利用天气配合法系技能','守方利用地形布置防线'] },
      { title:'3v3竞技场', subtitle:'精英对决', type:'竞技排名赛', icon:'⚔️', desc:'三人小队的技巧性战斗，考验个人操作与团队配合。', tips:['携带控制+爆发组合','集火最脆弱的治疗目标','提前排练技能连携','利用地图角落限制走位'] },
      { title:'攻城战', subtitle:'公会领地争夺', type:'公会战', icon:'🏰', desc:'以公会为单位争夺祈愿石与次元石，数百人同屏激战。', tips:['攻方使用变身翻越城墙','守方集中在城池核心防守','攻城高仑可投掷队友入城','提前侦察地形制定路线'] },
    ]
  },
  morph:{
    title:'变形系统', slug:'morph', summary:'掌握变形艺术，在陆地、空中与水域自由穿梭。',
    items:[
      { name:'飞鸟形态', icon:'🦅', effect:'雨天解锁，可在空中滑翔飞行', type:'机动' },
      { name:'狼形态', icon:'🐺', effect:'提升冲刺速度，快速移动', type:'移动' },
      { name:'鱼形态', icon:'🐟', effect:'水中快速游泳，探索水下区域', type:'探索' },
      { name:'攻城高仑', icon:'🗿', effect:'变身可投掷队友翻越城墙', type:'攻城' },
    ]
  },
  economy:{
    title:'经济系统', slug:'economy', summary:'了解游戏中的货币体系与交易系统，高效管理你的资产。',
    items:[
      { name:'Lucent', icon:'💎', desc:'高级游戏货币，可在拍卖行与商店使用，支持玩家间自由交易。', obtain:'副本奖励 / 充值 / 拍卖行交易', color:'#9b59b6' },
      { name:'委托币', icon:'🪙', desc:'完成委托任务获得，用于购买特殊材料与图纸。', obtain:'每日委托任务奖励', color:'#f39c12' },
      { name:'公会荣誉', icon:'🏅', desc:'公会活动专属货币，兑换公会专属装备与外观。', obtain:'公会副本 / 攻城战 / 公会任务', color:'#2ecc71' },
    ]
  },
  features:{
    title:'游戏特色系统', slug:'features', summary:'王权与自由独有的核心系统，造就了这款与众不同的MMORPG。',
    items:[
      { title:'天气与昼夜系统', icon:'🌤️', desc:'天气变化影响技能效果和怪物行为。雨天增强闪电伤害，夜晚出现更强敌人。天气还会解锁隐藏区域和特殊事件。' },
      { title:'武器精通系统', icon:'⚔️', desc:'武器随使用次数变强。通过节点选择改变技能效果，不同武器组合解锁专属技能。' },
      { title:'变形与变身', icon:'🦅', desc:'变形为各种生物快速移动，变身伪装潜入或获得特殊能力。城主战败后其力量可作为守护者技能使用。' },
      { title:'住房系统', icon:'🏠', desc:'在索利西姆购买和定制房屋，展示自制家具，从普通住宅升级到精英社区。' },
      { title:'公会领地争夺', icon:'🏰', desc:'争夺Boonstone和Riftstone控制权。占领后全公会获得强力Buff和专属Boss挑战。' },
      { title:'钓鱼与采集', icon:'🎣', desc:'在各地水域钓鱼获取食材，采集草药矿石用于制作。生活技能是稳定收入来源。' },
    ]
  }
};

const BUILDS = [
  { name:'大剑 + 匕首', slug:'greatsword-dagger', tier:'S', role:'近战爆发', desc:'小规模PVP之王，爆发伤害极高。大剑AOE控场，匕首收割残血。' },
  { name:'长弓 + 魔杖', slug:'longbow-wand', tier:'S', role:'远程治疗', desc:'最佳辅助治疗，副本必备。远程安全输出+强力治疗。' },
  { name:'法杖 + 匕首', slug:'staff-dagger', tier:'S', role:'法系刺客', desc:'魔法刺客，超强AOE与单体爆发。法杖元素伤害配合匕首贴身爆发。' },
  { name:'十字弓 + 匕首', slug:'crossbow-dagger', tier:'A', role:'中程DPS', desc:'机动性强，PVP小规模战斗优秀。毒伤叠加爆发。' },
  { name:'剑盾 + 大剑', slug:'sword-greatsword', tier:'A', role:'坦克DPS', desc:'最强坦克组合，团队副本核心。能抗能打。' },
  { name:'法杖 + 魔杖', slug:'staff-wand', tier:'A', role:'治疗DPS', desc:'攻守兼备，大规模PVP价值极高。元素伤害+治疗兼顾。' },
  { name:'铁爪 + 匕首', slug:'gauntlets-dagger', tier:'S', role:'近战压制', desc:'新版本最强近战组合。铁爪破防+匕首爆发，连招碾压。' },
  { name:'宝珠 + 魔杖', slug:'orb-wand', tier:'A', role:'战术辅助', desc:'宝珠控制+魔杖治疗，团队战术核心。' },
  { name:'长枪 + 剑盾', slug:'spear-shield', tier:'A', role:'阵地战', desc:'长枪群伤+剑盾防御，前线压制力极强。' },
  { name:'长弓 + 十字弓', slug:'longbow-crossbow', tier:'B', role:'双远程', desc:'PVE清怪优秀，远程火力压制。PVP生存性差。' },
];

const TIERS = [
  { tier:'S', color:'#ff4757', bg:'rgba(255,71,87,0.15)', builds:['greatsword-dagger','longbow-wand','staff-dagger','gauntlets-dagger'] },
  { tier:'A', color:'#ffa502', bg:'rgba(255,165,2,0.15)', builds:['crossbow-dagger','sword-greatsword','staff-wand','orb-wand','spear-shield'] },
  { tier:'B', color:'#2ed573', bg:'rgba(46,213,115,0.15)', builds:['longbow-crossbow'] },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WEAPONS, SECTIONS, BUILDS, TIERS };
}
