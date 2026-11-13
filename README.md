# 📚 单词助手 (Word Assistant) - 你的私人词汇管家

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**单词助手** 是一款基于 Web 的全功能英语单词学习与管理工具。它采用现代化的极简设计，结合科学的记忆算法，帮助用户高效地积累词汇量。

---

## ✨ 核心特性

- 🎨 **极简美学设计**：采用 Glassmorphism（毛玻璃）风格，支持平滑的**深色模式**切换。
- 🔐 **完整用户系统**：支持账号注册与登录，本地数据分账号独立存储。
- 🧠 **科学记忆挑战**：
  - **英译汉**：四选一强化释义记忆。
  - **汉译英**：拼写练习巩固书写能力。
- 📆 **每日复习计划**：基于错题逻辑的复习系统，智能安排每日学习任务。
- 🔊 **标准真人发音**：支持音标及语音播放。
- 📑 **深度词义解析**：不仅有释义，还包含例句。
- 📥 **一键导出**：支持将你的专属词库导出为格式精美的 **Microsoft Word (.doc)** 文档。

## 🚀 快速开始

本项目是一个纯前端驱动的应用（搭配可选本地服务端），您可以直接在浏览器中运行。

### 1. 获取项目
```bash
git clone https://github.com/shi-tou1234/word.git
```

### 2. 运行项目
- **方式一（简易模式）**：直接双击打开 `单词记录.html` 即可开始使用。此时查词使用浏览器可访问的备用在线词典；若需要本地服务端提供的深度释义与例句，请使用方式二。
- **方式二（本地服务端）**：启动本地服务后可获得 Bing 词典深度释义、例句，以及记忆挑战的干扰项。
  - 确保电脑已安装 [Node.js](https://nodejs.org/)（建议 16 及以上）。
  - 服务端源码已随仓库提供在 `server/` 目录（含 `index.js`、`package.json`），无需再解压任何压缩包。
  - 首次使用请在 `server/` 目录执行 `npm install` 安装依赖（即 `cd server && npm install`）。
  - 双击 `启动单词助手.cmd`（或 `start.bat`）启动：脚本会先 `cd server` 运行 `node index.js`，再打开 `单词记录.html`。

> 说明：旧版入口 `词库管理.html` 仅存在于历史归档 `老版本.zip` 中，当前版本请使用 `单词记录.html`；仓库中不存在 `server.zip`。

## 📂 项目结构
- `单词记录.html`: 应用主入口界面（当前版本）。
- `词库管理.css`: 样式文件，包含毛玻璃特效与响应式布局。
- `server/`: Node.js 服务端目录，含 `index.js`、`package.json`、`package-lock.json`（依赖随 `npm install` 安装）。
- `启动单词助手.cmd` / `start.bat`: Windows 一键启动脚本。
- `老版本.zip`: 历史版本归档，内含旧入口 `词库管理.html` 等，仅供参考。

## 🛠️ 技术栈
- **前端**：HTML5, JavaScript (ES6+), [Tailwind CSS](https://tailwindcss.com/)
- **图标/字体**：Plus Jakarta Sans, SVG Icons
- **存储**：浏览器 LocalStorage（全部用户数据）；本地服务端仅作查询代理，不落库
- **发音**：Web Speech API

## 数据存储与同步说明
- 账号、词库、单词、复习进度等全部保存在**当前浏览器的 LocalStorage** 中，按账号分键隔离；账号系统也是本机浏览器内的本地分档，不涉及服务器账号。
- 本地服务端（`server/`）仅提供两个查询接口：`/api/translate`（抓取 Bing 词典的释义、音标、例句）与 `/api/distractors`（生成记忆挑战干扰项），**不存储、不转发任何用户数据**。
- 因此当前版本**不具备多设备 / 跨浏览器自动同步能力**：更换设备、浏览器或清理浏览器数据后，原有数据不会自动出现，也不保证保留。
- 如需迁移，可通过页面工具栏的「导出」生成 Word 词库，再到目标设备用「导入」手动重建；重要数据请自行备份。

## 📖 使用指南
1. **录入新词**：输入单词，系统将自动检索权威词库，补全音标、释义及例句。
2. **词库浏览**：通过精美的卡片形式查看已收藏的单词。
3. **开始挑战**：在“记忆挑战”模块选择模式，测试你的记忆效果。
4. **导出复习**：在“我的”页面导出 Word 文档，方便打印或离线复习。

## 数据恢复保护与开发测试

词库索引损坏时先保留原值。若备份写入失败，本次会话使用内存默认视图并锁定索引写入，创建/删除词库也会被阻止；请先保存原始数据再处理存储空间。不要把内存视图中的修改当成已持久化。

查词的本地请求（4秒）与备用词典（8秒）均覆盖响应体读取；新查询会取消旧查询，输入已改变时旧结果也会被丢弃。

在项目根目录运行（Node.js 18+，无需安装依赖）：

```bash
node --test tests/recovery-requests.test.cjs
```

测试只使用内存存储、DOM与网络桩，覆盖配额不足、保护锁、响应体超时和连续查询竞争。

## 🤝 贡献
如果你有任何改进建议或发现了 Bug，欢迎提交 Issue 或 Pull Request！

---
