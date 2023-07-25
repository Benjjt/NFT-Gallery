#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
VERCELFOLDER=../vercel/pawnhub_viewer/$BRANCH

mkdir -p $VERCELFOLDER
rsync -avz --exclude-from=./canverseDeploy/exclude.txt ./ $VERCELFOLDER