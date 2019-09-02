#!/bin/sh

{ echo "$NPM_USERNAME"; sleep 1; echo "$NPM_EMAIL"; } | yarn login &&
yarn config set //registry.npmjs.org/:_authToken "$NPM_TOKEN" &&
yarn workspaces run publish --access public --new-version "$CI_COMMIT_TAG" &&
yarn config delete //registry.npmjs.org/:_authToken