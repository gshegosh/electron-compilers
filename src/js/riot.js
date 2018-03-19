import {SimpleCompilerBase} from '../compiler-base';

const inputMimeTypes = ['text/riot'];
let riot = null;

export default class RiotCompiler extends SimpleCompilerBase {
  constructor() {
    super();
  }

  static getInputMimeTypes() {
    return inputMimeTypes;
  }

  compileSync(sourceCode) {
    riot = riot || require('riot');

    const js = riot.compile(sourceCode, true);

    return {
      code: js,
      mimeType: 'application/javascript'
    };
  }

  getCompilerVersion() {
    return require('riot/package.json').version;
  }
}
