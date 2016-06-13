#!/bin/bash

cat output.log | jq -r 'select(.type == "data") | (.time + "\t" + (.speeds.download | tostring) + "\t" + (.speeds.upload | tostring))' | sort -r
