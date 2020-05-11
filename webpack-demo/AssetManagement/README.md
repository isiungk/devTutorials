# webpack Guides - Getting Started

1. 初始化项目 
   Initialize the project.

```bash
yarn init
```

2. NPM/Yarn 默认安装的版本，似乎有些问题，所以我们得手动制定 webpack 和 webpack-cli 的安装版本。
   选择当前稳定版本，最为稳妥。

   There's something wrong with default version, so we have to claim a certain version of webpack and webpack-cli.
   We use current stable version of them。

```bash
yarn add webpack@4.43.0 webpack-cli@3.3.11 --dev
```

3. 安装本章节介绍的插件。
   Install the library locally accrod the Guides.

```bash
yarn add style-loader css-loader file-loader csv-loader xml-loader --dev
```

4. 运行最终得成果。
   Run the following command and see if our script alias works。

```
yar run build
```

