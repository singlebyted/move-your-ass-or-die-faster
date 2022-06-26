# 坐的越久，死的越快

简体中文 | [English](./README.en-US.md)

为了提醒您不要坐太久，这个程序每个工作日下午生成一幅带分享次数的警告图片。

灵感来自于一张网络截图。:)

<p align="center">
  <img src="./assets/origin.png">
</p>

## Usage

1. 添加 shell 脚本

```sh
cd <home_dir>
touch ass-reminder.sh
chmod +x ass-reminder.sh
```

2. 编辑脚本

```sh
cd <project_dir>
npm run start
```

3. 添加 crontab 任务

```sh
# crontab -e
# run at 15:45 every day
45 15 * * * <home_dir>/ass-reminder.sh
```
