# RPi Network Speed Tester

> Do a network speed test every 15 minutes and report it via email.

## Usage

```bash
# Install dependencies
sudo apt-get install -y git-core wget jq

# Install NodeJS and NPM
# Source https://github.com/nodesource/distributions/issues/44
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
