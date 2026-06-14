# sf-doc-generator

前端组件文档的 Claude Code Skill 包。安装后自动注入 `/doc-generator` 命令，支持**文档生成**和**文档评分**两种模式，适用于任意组件库。

## 安装

```bash
npm install sf-doc-generator --save-dev
```

安装完成后，`postinstall` 脚本会自动将 skill 文件复制到当前项目的 `.claude/commands/` 目录。打开 Claude Code，`/doc-generator` 命令即刻可用。

> 如果自动复制未生效，手动执行：
> ```bash
> npx sf-doc-gen install
> ```

---

## 使用

### 生成文档

根据组件名和简短描述，生成符合规范的完整 Markdown 文档模板。

**语法**

```
/doc-generator generate <组件名> [描述]
/doc-generator generate <组件名> --type standalone
```

**示例**

```
/doc-generator generate Button 通用按钮组件
/doc-generator generate DatePicker --type standalone
```

`--type standalone` 表示独立发布的包，生成的文档会包含 `## 安装` 章节及 npm/pnpm/yarn 三种安装命令。不加此标志默认为组件库内置组件。

**生成的文档结构**

```
# {组件名}
## 何时使用
## 安装          ← 仅 --type standalone 时生成
## Demo 演示     ← 含基础 / 高级 / 业务三类分组
## API           ← 含完整 props 表格
## 维护者        ← 组件负责人联系方式
## FAQ           ← 含症状型问题示例
```

所有 `{花括号}` 占位符需作者替换后使用。

---

### 评分文档

按内置评分规则对现有文档打分，输出结构化评审报告。

**方式一：粘贴文档内容**

```
/doc-generator score
```

输入命令后，将文档 Markdown 内容粘贴到下一条消息，Claude 立即评分。

**方式二：指定文件路径**

```
/doc-generator score ./docs/Button.md
```

**评审报告包含**

| 章节 | 内容 |
|------|------|
| 📋 前置确认 | FAQ 是否存在、维护者位置、使用的权重方案 |
| 📊 总分表 | 各 PART 满分 / 保底分 / 冲刺得分 / 扣分 / 实得 |
| ✅ 做得好的地方 | 至少 3 条具体说明 |
| 🚀 冲刺建议 | 按改动成本排序，标注每条可得分数 |
| 🔴 扣分项 | 触发则列出，未触发则 🎉 |
| 📝 改写示例 | 改动成本最低一条的修改前 → 后对比 |
| ✅ CheckList | 全部保底项 + 冲刺项的完整核查清单 |

**评分模型**

- 总分 100 分，保底 75 分（认真写了就有）
- 冲刺 25 分（做到优秀才得）
- FAQ 可选，缺失时分值自动分摊到其余三个模块

| 模块 | 含 FAQ | 缺 FAQ |
|------|--------|--------|
| PART1 标题与基础介绍 | 18 | 24 |
| PART2 Demo 演示 | 29 | 38 |
| PART3 API 文档 | 29 | 38 |
| PART4 FAQ | 24 | — |

---

## CLI 命令

```bash
# 将 skill 文件复制到当前项目的 .claude/commands/
npx sf-doc-gen install

# 列出包内所有可用 skill
npx sf-doc-gen list
```

---

## 扩展：添加新 Skill

在 `skills/` 目录下新增 `.md` 文件，重新运行 `npx sf-doc-gen install` 即可在 Claude Code 中使用新命令。

```
skills/
├── doc-generator.md     # /doc-generator（内置）
└── your-new-skill.md   # /your-new-skill
```

Skill 文件格式参考 [Claude Code 自定义命令文档](https://docs.anthropic.com/zh-CN/docs/claude-code/slash-commands)。
