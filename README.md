# 📚 单词助手 (Word Assistant) - 你的私人词汇管家

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**单词助手** 是一款基于 Web 的全功能英语单词学习与管理工具。它采用现代化的极简设计，结合科学的记忆算法，帮助用户高效地积累词汇量。

## ✨ 核心特性

- 🎨 **极简美学设计**：采用 Glassmorphism（毛玻璃）风格，支持平滑的**深色模式**切换。
- 🔐 **完整用户系统**：支持账号注册与登录，本地数据分账号独立存储，支持多设备同步。
- 🧠 **科学记忆挑战**：
  - **英译汉**：四选一强化释义记忆。
  - **汉译英**：拼写练习巩固书写能力。
- 📆 **每日复习计划**：基于错题逻辑的复习系统，智能安排每日学习任务。
- 🔊 **标准真人发音**：支持音标及语音播放。
- 📑 **深度词义解析**：不仅有释义，还包含例句。
- 📥 **一键导出**：支持将你的专属词库导出为格式精美的 **Microsoft Word (.doc)** 文档。

## 🚀 快速开始

本项目是一个纯前端驱动的应用（搭配可选服务端），您可以直接在浏览器中运行。

1. **克隆仓库**：
   ```bash
   git clone https://github.com/shi-tou1234/word.git
   ```
2. **运行项目**：
   - 直接双击打开 `单词记录.html` 即可开始使用。（非常简陋的翻译，且没有例句)
   - 建议在本地部署 `server.zip` 中的服务端程序以获得完整翻译和同步体验。需要启动server,需要在电脑上安装nodejs且配置好环境，具体教程可以自行查询，配置完成后在cmd输入以下命令：
cd /d "%~dp0server"
start node index.js
cd /d "%~dp0"
start 单词记录.html
exit
## 🛠️ 技术栈

- **前端**：HTML5, JavaScript (ES6+), [Tailwind CSS](https://tailwindcss.com/)
- **图标/字体**：Plus Jakarta Sans, SVG Icons
- **存储**：Browser LocalStorage / 自定义后端 API
- **发音**：Web Speech API

## 📖 使用指南

1. **录入新词**：输入单词，系统将自动检索权威词库，补全音标、释义及例句。
2. **词库浏览**：通过精美的卡片形式查看已收藏的单词。
3. **开始挑战**：在“记忆挑战”模块选择模式，测试你的记忆效果。
4. **导出复习**：在“我的”页面导出 Word 文档，方便打印或离线复习。

## 🤝 贡献

如果你有任何改进建议或发现了 Bug，欢迎提交 Issue 或 Pull Request！

---
