DOCKER_EXE:=docker
DOCKER_BUILD_EXTRA_PARAMS:=
DOCKER_BUILD_PARAMS:=--secret id=npmrc,src=${HOME}/.npmrc --ssh default ${DOCKER_BUILD_EXTRA_PARAMS}
TESTS_CONTAINER_NAME:=tests.fcl
CIMAGE_DEPLOYMENT_TAG:=figshare/fcl:deployment
CIMAGE_LATEST_TAG:=figshare/fcl:latest
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


container-images:
	${DOCKER_EXE} build ${DOCKER_BUILD_PARAMS} -t ${CIMAGE_DEPLOYMENT_TAG} --target deployment .
	${DOCKER_EXE} build ${DOCKER_BUILD_PARAMS} -t ${CIMAGE_LATEST_TAG} --target development .
.PHONY: container-images


ci-tests:
	echo "No tests to run"
.PHONY: ci-tests


ci-analysis:
	echo "No analysis to run"
.PHONY: ci-analysis
