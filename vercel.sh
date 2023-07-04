#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then
  echo "This is our main branch"
  npm run env-production
else
  echo "This is not our main branch"
  npm run env-development
fi
