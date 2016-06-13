# RPi Network Speed Test

> Do a network speed test every 15 minutes and report it via email.

## Usage

```bash
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
