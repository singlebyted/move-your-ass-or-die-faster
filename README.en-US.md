# Move your ass or die faster

[简体中文](./README.md) | English

In order to remind you not to sit for a long time, this program generates a warning picture with the number of sharing and send it to chat in the afternoon of each working day, the number will be increased by one for each generated.

Inspired by an internet picture. :)

<p align="center">
  <img src="./assets/origin_en.png">
</p>

## Usage

1. create the initial number of sharing and env files

```sh
cd <project>
touch .number-of-sharing .env
# 967 is the initial sharing number on original picture
echo 967 > .number-of-sharing
# only support wechat bot now
echo WECOM_BOT_KEY=XXX > .env
```

2. create a script

```sh
cd <home_dir>
touch ass-reminder.sh
chmod +x ass-reminder.sh
```

3. edit the script

```sh
cd <project_dir>
npm run start
```

4. add a crontab job

```sh
# crontab -e
# run at 15:45 every day
45 15 * * * <home_dir>/ass-reminder.sh
```
