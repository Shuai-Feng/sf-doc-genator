# sf-doc-generator

申通前端组件文档的 Claude Code Skill 包。安装后自动注入 `/doc-generator` 命令，支持**文档生成**和**文档评分**两种模式。

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

根据组件名和简短描述，生成符合申通文档规范的完整 Markdown 模板。

**语法**

```
/doc-generator generate <中文名> <英文名> [描述]
/doc-generator generate <中文名> <英文名> --type second-party
```

**示例**

```
/doc-generator generate 信息提示 CnMessage 用于页面顶部的全局提示
```

```
/doc-generator generate 文件上传 CnUpload --type second-party
```

`--type second-party` 表示独立二方包，生成的文档会包含 `## 安装` 章节及 npm/snpm/yarn 三种安装命令。不加此标志默认为 CnUI 内置组件。

**生成内容**

输出的文档包含以下章节，所有 `{花括号}` 占位符需作者替换：

```
# {中文名} {英文名}
## 何时使用
## 安装          ← 仅 second-party 时生成
## Demo 演示     ← 含基础 / 高级 / 业务三类分组
## API           ← 含完整 props 表格
## 对接人        ← 钉钉跳转链接格式
## FAQ           ← 含症状型问题示例
```

---

### 评分文档

按申通组件文档评分标准 v1.8 对现有文档打分，输出结构化评审报告。

**方式一：粘贴文档内容**

```
/doc-generator score
```

输入命令后，将文档 Markdown 内容粘贴到下一条消息，Claude 立即评分。

**方式二：指定文件路径**

```
/doc-generator score ./docs/CnMessage.md
```

**评审报告包含**

| 章节 | 内容 |
|------|------|
| 📋 前置确认 | FAQ 是否存在、对接人位置、使用的权重方案 |
| 📊 总分表 | 各 PART 满分 / 保底分 / 冲刺得分 / 扣分 / 实得 |
| ✅ 做得好的地方 | 至少 3 条具体说明 |
| 🚀 冲刺建议 | 按改动成本排序，标注每条可得分数 |
| 🔴 扣分项 | 触发则列出，未触发则 🎉 |
| 📝 改写示例 | 改动成本最低一条的修改前→后对比 |
| ✅ CheckList | 全部保底项 + 冲刺项的完整核查清单 |

**评分模型说明**

- 总分 100 分，保底 75 分
- FAQ 可选，缺失时分值自动分摊到其余三个模块
- 各模块：PART1 标题与基础介绍 / PART2 Demo 演示 / PART3 API 文档 / PART4 FAQ

---

## CLI 命令

除了在 Claude Code 内使用，也可以直接用命令行管理 skill 文件。

```bash
# 将 skill 文件复制到当前项目的 .claude/commands/
npx sf-doc-gen install

# 列出包内所有可用 skill
npx sf-doc-gen list
```

---

## 扩展：添加新 Skill

将新的 `.md` 文件放入包的 `skills/` 目录，重新运行 `npx sf-doc-gen install`，即可在 Claude Code 中使用新命令。

```
skills/
├── doc-generator.md     # /doc-generator
└── your-new-skill.md   # /your-new-skill
```

Skill 文件格式参考 [Claude Code 自定义命令文档](https://docs.anthropic.com/zh-CN/docs/claude-code/slash-commands)。

---

## 评分标准版本

当前内置：**申通组件文档评分 v1.8**

| 版本 | 核心变更 |
|------|---------|
| v1.8 | 「对接人」升级为独立 `##` 二级标题，位于 API 之后、FAQ 之前 |
| v1.7 | 移除 Release Notes 模块；对接人升级为钉钉跳转链接格式 |
| v1.6 | 明确 API 表格拆分原则 |
| v1.5 | 完整对齐标准：安装命令、Demo 目录、反引号高亮、types/index.ts |
