'use strict';

const glob = require('glob');
const { existsSync } = require('fs');
const { join, resolve, parse } = require('path');

/**
 * Handlebars Helper 전체 파일 모듈화
 *
 * @param {string} helperDir Handlebars Helper 디렉토리 경로
 * @param {Object} [options={}] 옵션
 * @return {Object} Helper 전체 파일 구조를 기반으로 Require된 modules 반환
 */
module.exports = (helperDir, options = {}) => {
  const defaults = {
    pattern: '**/*.js',
  };
  const opts = Object.assign({}, defaults, options);

  if (!existsSync(helperDir)) {
    throw new Error(`${helperDir} does not exist`);
  }

  // 기본 경로 하위 파일만 패턴 매칭
  return glob.sync(opts.pattern, { cwd: helperDir }).reduce((modules, file) => {
    const { dir, name } = parse(file);
    // modules['example/toLower'] = [Function: toLower]
    // modules['example/toUpper'] = [Function]
    modules[join(dir, name)] = require(resolve(helperDir, file));

    return modules;
  }, {});
};