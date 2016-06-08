#!/bin/bash

cat output.log | jq -r 'select(.type == "data") | (.time + " " + (.speeds.download | tostring) + " " + (.speeds.upload | tostring))'
