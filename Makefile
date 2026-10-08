DOCKER_EXE:=docker
DOCKER_BUILD_EXTRA_PARAMS:=
DOCKER_BUILD_PARAMS:=--secret id=npmrc,src=${HOME}/.npmrc ${DOCKER_BUILD_EXTRA_PARAMS}
TESTS_CONTAINER_NAME:=tests.fcl
# Optional suffix for the built image tag, e.g. `make container-images IMAGE_TAG_SUFFIX=-dev`
IMAGE_TAG_SUFFIX:=
CIMAGE_LATEST_TAG:=figshare/fcl:latest${IMAGE_TAG_SUFFIX}
CONFIGS_DIR:=./auto/configs
DOCKER_TESTS_PARAMS:=


install:
	npm install
.PHONY: install

svg_react:
  # svgr can be installed with npm install @svgr/cli (requires node 22.13.0)
	svgr --out-dir packages/ui/icons/react --ignore-existing -- packages/ui/icons/svg


build:
	npm run storybook:build
.PHONY: build


server:  ## Run the storybook dev server - for local development only, not what the deployed image runs (that's nginx serving `make build`'s static output, see Dockerfile)
	npm run storybook
.PHONY: server


container-images:
	${DOCKER_EXE} build ${DOCKER_BUILD_PARAMS} -t ${CIMAGE_LATEST_TAG} .
.PHONY: container-images


ci-tests:
	echo "No tests to run"
.PHONY: ci-tests


ci-analysis:
	echo "No analysis to run"
.PHONY: ci-analysis
