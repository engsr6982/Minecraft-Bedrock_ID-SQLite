# Minecraft-ID-SQLite 数据库JSON更新程序
本程序用于更新 Minecraft-ID-SQLite 数据库的源 JSON 文件，以便更新path数据。本程序基于 Node.js 编写。

### 安装

1. 首先确保您已经安装了 Node.js 和 npm。

2. 下载本程序代码，并将其解压到您想要的位置。

3. 在命令行中进入程序目录，并执行 `npm install` 命令以安装依赖。

### 使用
程序支持以下命令行参数：


- -i, --input：待更新JSON文件路径，旧版 Minecraft-ID-SQLite 数据库的源 JSON 文件。

- -m, --mapping：目标JSON文件路径。

- -o, --output：输出文件路径，新版 Minecraft-ID-SQLite 数据库的源 JSON 文件。

```cmd
npm run start -- -i old.json -m mapping.json -o new.json
```

### 注意事项

程序仅支持将旧版 Minecraft-ID-SQLite 数据库的源 JSON 文件转换为新版数据库的源 JSON 文件，不支持将新版数据库的源 JSON 文件转换为旧版数据库的源 JSON 文件。