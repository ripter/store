.PHONY: all test test.nyan test.only test.blink1 lint docs clean build
NPM_BIN=$(shell npm bin)

all: test docs

node_modules/: package.json
	npm install

test: lint
	$(NPM_BIN)/mocha --opts mocha.opts src/\**/*.test.js

test.only: node_modules/
	$(NPM_BIN)/mocha --opts mocha.opts src/\**/*.test.js

test.nyan: node_modules/
	$(NPM_BIN)/mocha --opts mocha.opts -R nyan src/\**/*.test.js

test.blink1: node_modules/
	watch $(NPM_BIN)/mocha --opts mocha.opts -R @ripter/mocha-reporter-blink1 src/\**/*.test.js

lint: node_modules/
	$(NPM_BIN)/eslint test/ src/


docs: node_modules/
	$(NPM_BIN)/jsdoc2md --files src/**/*.js > docs/README.md

clean:
	-rm -r ./node_modules
	-npm cache verify

build: node_modules/
	$(NPM_BIN)/webpack
