# 游戏仓素材许可审计 · 2026-11-26

## 结论

- 游戏代码：**119 款，全部按 MIT 发布**；仓库根 `LICENSE` 已写明。
- 文本与设计：**CC BY 4.0**；转载需署名“密码学探索馆 · 游戏仓”并链接 `https://poyi.net`。
- 字体：2 款，均带 SIL Open Font License 1.1 原文。
- 站内图片：`assets/icons/` 与 `assets/screenshots/`，均为本站自有图标/截图；未发现 `assets/img/` 或按游戏分发的第三方图片目录。
- 结论：**未发现阻塞再分发的第三方素材**。新增游戏若引入外部图片、音效或字体，必须在本文件追加来源与许可。

## 逐项证据

| 项目 | 数量/路径 | 许可 | 证据 |
| --- | --- | --- | --- |
| 游戏入口 | 119 个 `games/<slug>/index.html` | MIT（代码） | `games-manifest.json` `count: 119`；`LICENSE` 第 2 节 |
| 站点脚本 | `assets/js/**`、`assets/play.js` | MIT | `LICENSE` 第 2 节 |
| 字体 Fusion Pixel | `assets/fonts/fusion-pixel-site.woff2` | SIL OFL 1.1 | `assets/fonts/FUSION-PIXEL-OFL.txt`；版权 2022 TakWolf |
| 字体 Press Start 2P | `assets/fonts/press-start-2p.woff2` | SIL OFL 1.1 | `assets/fonts/PRESS-START-2P-OFL.txt`；版权 2012 Cody “CodeMan38” Boisclair |
| 图标 | `assets/icons/*.png` | 本站自有 | 无第三方署名；用于 PWA 图标 |
| 截图 | `assets/screenshots/*.png` | 本站自有 | 站点首页截图，用于 README/社交预览 |
| 外部图片目录 | `assets/img/` | 不存在 | Glob 扫描为空 |

## 复核命令

```bash
# 119 个游戏页
find games -maxdepth 2 -name index.html | wc -l

# 外部图片目录（应无输出）
find assets -type d -name img

# 字体许可原文
head -12 assets/fonts/FUSION-PIXEL-OFL.txt
head -12 assets/fonts/PRESS-START-2P-OFL.txt
```

## 发布前仍需人工确认

1. 若以后把游戏作为独立 npm 包或应用商店包分发，确认 `LICENSE` 与字体 OFL 原文随包分发。
2. 任何新增的关卡图片、音效、UI 素材都要在 `ATTRIBUTION.md` 追加“文件名 / 来源 / 作者 / 许可 / 修改说明”。
3. GitHub Pages 只分发静态文件；不要提交未获授权的扫描图、教材插图或商业字体。
