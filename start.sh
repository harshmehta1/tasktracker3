#!/bin/bash

export PORT=5150

cd ~/www/tasktracker3
./bin/tasktracker stop || true
./bin/tasktracker start
