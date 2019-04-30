.PHONY: all test test.only lint clean build

all: build test docs

node_modules/: package.json
	npm install

test: lint
	npx mocha --opts mocha.opts src/\**/*.test.js

test.only: node_modules/
	npx mocha --opts mocha.opts src/\**/*.test.js

lint: node_modules/
	npx eslint test/ src/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

build: node_modules/
	npx rollup -c ./rollup.config.js
