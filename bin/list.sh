#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

tac "$DIR/../output.log" \
	| jq -r 'select(.type == "data") | (.time + "\t" + (.speeds.download | tostring) + "\t" + (.speeds.upload | tostring))'
