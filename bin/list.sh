#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cat "$DIR/../output.log" \
	| jq -r 'select(.type == "data") | (.time + "\t" + (.speeds.download | tostring) + "\t" + (.speeds.upload | tostring))' \
	| sort -r
