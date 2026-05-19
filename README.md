# TL Nexus — 王权与自由 战术枢纽

**上线前看一眼，选对天气再开打。**

选服务器 → 看天气 → 知道今天该玩什么 Build。

## 三秒启动

```bash
# 进项目目录
cd tl-nexus

# 方案一：Python 3（应该都有了）
python3 -m http.server 3000

# 方案二：Node.js
npx serve . -p 3000

# 打开浏览器访问
open http://localhost:3000
```

## 立即部署到线上（免费，给朋友看）

### Vercel（推荐，最快）
```bash
# 安装 Vercel CLI（如果没有）
npm install -g vercel

# 一键部署
cd tl-nexus
vercel --prod
```
3 分钟后得到一个 https://xxx.vercel.app 链接，发给你朋友就能看。

### Cloudflare Pages
1. 打开 https://pages.cloudflare.com
2. 点 "Create a project" → "Upload assets"
3. 上传整个 `tl-nexus/` 文件夹
4. 部署完成

## 项目结构

```
tl-nexus/
├── index.html            # 入口（56 行，干净）
├── package.json          # npm serve 用
├── README.md             # 本文件
├── css/
│   └── main.css          # 设计系统 + 全部样式（~480 行）
└── js/
    ├── app.js            # 初始化，注册视图
    ├── data.js           # 武器、Build、服务器数据
    ├── weather-engine.js # 天气计算（纯前端，零依赖）
    ├── router.js         # SPA 路由 + 页面清理
    ├── ui.js             # 可复用 UI 组件
    └── views/
        ├── home.js       # 首页：天气 + 推荐 Build + 倒计时
        ├── lab.js        # 战术实验室：交互式武器选择 + 方案匹配
        ├── weather.js    # 气象中心：7 服实时天气总览
        └── build-detail.js # Build 详情（弹窗 + 独立页面）
```

## 三个页面

| 页面 | 功能 |
|------|------|
| **首页** `#/` | 选服务器 → 看天气 → 匹配的 Build 推荐，倒计时实时更新 |
| **战术实验室** `#/lab` | 交互式选择武器/天气/场景，从 10 个已验证 Build 中匹配最优方案 |
| **气象中心** `#/weather` | 7 个服务器实时天气一览 + 8 小时轮播预测 |
| **Build 详情** `#/build?id=X` | 可分享的 Build 独立页面，在浏览器地址栏直接打开 |

## 核心逻辑

TL 的天气是固定 **8 小时轮播**（雷暴→暴雨→浓雾→晴天，每种 2 小时）。

不同服务器起始时间偏移不同。前端 JS 根据服务器时区和轮播起始时间现场计算当前天气，**零后端，零 API 调用**。

```js
// 核心算法（weather-engine.js）
const elapsed = (Date.now() - cycleStart) / 60000;
const position = elapsed % (4 * cycleDuration);
const index = Math.floor(position / cycleDuration);
const remaining = cycleDuration - (position % cycleDuration);
```

## 给你的朋友看什么

1. **打开浏览器** — `open http://localhost:3000`
2. **首页** — 选个服务器，看天气倒计时 + Build 推荐实时变化
3. **战术实验室** — 点几个武器，点匹配方案，出结果
4. **右键查看代码** — 12 个文件，干净的项目结构
5. **部署** — `vercel --prod` 3 分钟上线，把链接发给他们

## 数据来源

当前所有 Build 由社区玩家验证贡献。数据存储在 `js/data.js` 中，添加新 Build 只需在数组中加一条记录。

## License

MIT — 随便用，随便改。
