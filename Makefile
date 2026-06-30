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
	npm install --no-save --force eslint@7.32.0 stylelint@14.3.0 eslint-plugin-css-modules@2.11.0\
		 eslint-plugin-import@2.25.2 eslint-plugin-jest@26.0.0 eslint-plugin-jsx-a11y@6.5.1\
		 eslint-plugin-react@7.28.0 @babel/core@7.26.0 @babel/eslint-parser@7.26.5\
		 @babel/eslint-plugin@7.25.9 stylelint-a11y@1.2.3 stylelint-config-css-modules@2.3.0\
		 stylelint-config-standard@24.0.0 stylelint-order@5.0.0
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
