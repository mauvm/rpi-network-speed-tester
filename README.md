# RPi Network Speed Tester

> Do a network speed test every 20 minutes and report it via email.

## How it works

This tool uses the Node `speedtest-net` library to do a network speed test every 20 minutes.
You install it, hook the RPi up to your router (with a network cable), and you'll receive an email update every morning at 09:00.
It looks something like this:

```
My dearest human,

Here are the results:

2016-06-14T15:48:09.833Z        34.504  6.26
2016-06-14T15:28:22.045Z        32.427  6.146
2016-06-14T15:07:53.950Z        33.546  50.7
2016-06-14T14:48:02.690Z        34.307  6.124
2016-06-14T14:28:06.417Z        29.997  50.653
2016-06-14T14:08:09.482Z        35.086  6.275
...
2016-06-13T20:28:27.644Z        29.602  6.01
2016-06-13T20:08:29.474Z        28.257  6.091
2016-06-13T19:48:22.018Z        28.199  49.377
2016-06-13T19:29:07.975Z        22.809  5.961
2016-06-13T19:08:26.193Z        32.361  5.856
2016-06-13T18:48:24.230Z        30.221  6.03

With love, RPi
```

Side note: Yes I know, my internet isn't great.
I'm paying for 50 MBit (best available in my neighbourhood \*sigh\*).
I can use this as proof when contacting my ISP.

## Usage

```bash
# Install dependencies
sudo apt-get install -y git-core wget jq

# Install NodeJS and NPM
# Source https://github.com/nodesource/distributions/issues/44
# Installing with apt-get results in `Segmentation Fault`
wget http://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz
cd usr/local
sudo tar xzvf ~/node-v4.2.4-linux-armv6l.tar.gz --strip=1

# Setup tester
git clone https://github.com/mauvm/rpi-network-speed-tester.git
sudo mv rpi-network-speed-tester /var/
cd /var/rpi-network-speed-tester
cp .env.example .env
chmod 600 .env
# > Edit .env
npm install
# > Edit cron/ files to suit your testing/reporting (or change the script paths)
sudo cp cron/* /etc/cron.d/
sudo service cron restart

# List all measured speeds
./bin/list.sh
```
