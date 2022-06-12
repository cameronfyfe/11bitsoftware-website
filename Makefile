.PHONY: default
default: build

IPFS_GATEWAY ?= localhost:8080
BROWSER ?= firefox

node_modules: package.json
	npm install
	touch $@

npmScripts := \
build start fmt fmt-check lint svelte-check bundle-analyzer
.PHONY: $(npmScripts)
$(npmScripts): node_modules
	npm run $@

.PHONY: ipfs-deploy
ipfs-deploy:
	ipfs add --cid-version 1 -r ./public

.PHONY: ipfs-view
ipfs-view:
	CID=$$( \
		$(MAKE) ipfs-deploy \
		| grep '\ public$$' \
		| awk -F ' ' '{print $$2}' \
	) && \
	$(BROWSER) http://$$CID.ipfs.$(IPFS_GATEWAY)/ &

npm.%:
	npm $*

.PHONY: ci-build
ci-build: | fmt-check lint svelte-check build npm.audit

.PHONY: gcroot-dev
gcroot-dev:
	nix build .#dev -o .dev

.PHONY: clean
clean:
	rm -rf node_modules build
