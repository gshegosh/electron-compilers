'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compilerBase = require('../compiler-base');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const inputMimeTypes = ['text/riot'];
let riot = null;

const mimeTypeToSimpleType = {
  'text/coffeescript': 'coffee',
  'text/typescript': 'ts',
  'application/javascript': 'js',
  'text/jade': 'jade',
  'text/less': 'less',
  'text/sass': 'sass',
  'text/scss': 'scss',
  'text/stylus': 'stylus'
};

/**
 * @access private
 */
class RiotCompiler extends _compilerBase.CompilerBase {
  constructor(asyncCompilers, syncCompilers) {
    super();
    Object.assign(this, { asyncCompilers, syncCompilers });

    this.compilerOptions = {};
  }

  static createFromCompilers(compilersByMimeType) {
    let makeAsyncCompilers = () => Object.keys(compilersByMimeType).reduce((acc, mimeType) => {
      let compiler = compilersByMimeType[mimeType];

      acc[mimeType] = (() => {
        var _ref = _asyncToGenerator(function* (content, cb, riotCompiler, filePath) {
          let ctx = {};
          try {
            if (!(yield compiler.shouldCompileFile(filePath, ctx))) {
              cb(null, content);
              return;
            }

            let result = yield compiler.compile(content, filePath, ctx);
            cb(null, result.code);
            return;
          } catch (e) {
            cb(e);
          }
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      })();

      let st = mimeTypeToSimpleType[mimeType];
      if (st) acc[st] = acc[mimeType];

      return acc;
    }, {});

    let makeSyncCompilers = () => Object.keys(compilersByMimeType).reduce((acc, mimeType) => {
      let compiler = compilersByMimeType[mimeType];

      acc[mimeType] = (content, cb, riotCompiler, filePath) => {
        let ctx = {};
        try {
          if (!compiler.shouldCompileFileSync(filePath, ctx)) {
            cb(null, content);
            return;
          }

          let result = compiler.compileSync(content, filePath, ctx);
          cb(null, result.code);
          return;
        } catch (e) {
          cb(e);
        }
      };

      let st = mimeTypeToSimpleType[mimeType];
      if (st) acc[st] = acc[mimeType];

      return acc;
    }, {});

    // NB: This is super hacky but we have to defer building asyncCompilers
    // and syncCompilers until compilersByMimeType is filled out
    let ret = new RiotCompiler(null, null);

    let asyncCompilers, syncCompilers;
    Object.defineProperty(ret, 'asyncCompilers', {
      get: () => {
        asyncCompilers = asyncCompilers || makeAsyncCompilers();
        return asyncCompilers;
      }
    });

    Object.defineProperty(ret, 'syncCompilers', {
      get: () => {
        syncCompilers = syncCompilers || makeSyncCompilers();
        return syncCompilers;
      }
    });

    return ret;
  }

  static getInputMimeTypes() {
    return inputMimeTypes;
  }

  shouldCompileFile(fileName, compilerContext) {
    return _asyncToGenerator(function* () {
      // eslint-disable-line no-unused-vars
      return true;
    })();
  }

  determineDependentFiles(sourceCode, filePath, compilerContext) {
    return _asyncToGenerator(function* () {
      // eslint-disable-line no-unused-vars
      return [];
    })();
  }

  compile(sourceCode, filePath, compilerContext) {
    return _asyncToGenerator(function* () {
      // eslint-disable-line no-unused-vars
      riot = riot || require('riot');

      let code = riot.compile(sourceCode);

      return {
        code,
        mimeType: 'application/javascript'
      };
    })();
  }

  shouldCompileFileSync(fileName, compilerContext) {
    // eslint-disable-line no-unused-vars
    return true;
  }

  determineDependentFilesSync(sourceCode, filePath, compilerContext) {
    // eslint-disable-line no-unused-vars
    return [];
  }

  compileSync(sourceCode, filePath, compilerContext) {
    // eslint-disable-line no-unused-vars
    riot = riot || require('riot');

    let err, code;
    code = riot.compile(sourceCode);

    if (err) throw err;

    return {
      code,
      mimeType: 'application/javascript'
    };
  }

  getCompilerVersion() {
    // NB: See same issue with SASS and user-scoped modules as to why we hard-code this
    let thisVersion = '3.9.0';
    let compilers = this.allCompilers || [];
    let otherVersions = compilers.map(x => x.getCompilerVersion).join();

    return `${thisVersion},${otherVersions}`;
  }
}
exports.default = RiotCompiler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sL3Jpb3QuanMiXSwibmFtZXMiOlsiaW5wdXRNaW1lVHlwZXMiLCJyaW90IiwibWltZVR5cGVUb1NpbXBsZVR5cGUiLCJSaW90Q29tcGlsZXIiLCJjb25zdHJ1Y3RvciIsImFzeW5jQ29tcGlsZXJzIiwic3luY0NvbXBpbGVycyIsIk9iamVjdCIsImFzc2lnbiIsImNvbXBpbGVyT3B0aW9ucyIsImNyZWF0ZUZyb21Db21waWxlcnMiLCJjb21waWxlcnNCeU1pbWVUeXBlIiwibWFrZUFzeW5jQ29tcGlsZXJzIiwia2V5cyIsInJlZHVjZSIsImFjYyIsIm1pbWVUeXBlIiwiY29tcGlsZXIiLCJjb250ZW50IiwiY2IiLCJyaW90Q29tcGlsZXIiLCJmaWxlUGF0aCIsImN0eCIsInNob3VsZENvbXBpbGVGaWxlIiwicmVzdWx0IiwiY29tcGlsZSIsImNvZGUiLCJlIiwic3QiLCJtYWtlU3luY0NvbXBpbGVycyIsInNob3VsZENvbXBpbGVGaWxlU3luYyIsImNvbXBpbGVTeW5jIiwicmV0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJnZXRJbnB1dE1pbWVUeXBlcyIsImZpbGVOYW1lIiwiY29tcGlsZXJDb250ZXh0IiwiZGV0ZXJtaW5lRGVwZW5kZW50RmlsZXMiLCJzb3VyY2VDb2RlIiwicmVxdWlyZSIsImRldGVybWluZURlcGVuZGVudEZpbGVzU3luYyIsImVyciIsImdldENvbXBpbGVyVmVyc2lvbiIsInRoaXNWZXJzaW9uIiwiY29tcGlsZXJzIiwiYWxsQ29tcGlsZXJzIiwib3RoZXJWZXJzaW9ucyIsIm1hcCIsIngiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUVBLE1BQU1BLGlCQUFpQixDQUFDLFdBQUQsQ0FBdkI7QUFDQSxJQUFJQyxPQUFPLElBQVg7O0FBRUEsTUFBTUMsdUJBQXVCO0FBQzNCLHVCQUFxQixRQURNO0FBRTNCLHFCQUFtQixJQUZRO0FBRzNCLDRCQUEwQixJQUhDO0FBSTNCLGVBQWEsTUFK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LFFBQVEsTUFBUixDQUFmOztBQUVBLFFBQUlFLEdBQUosRUFBUWhCLElBQVI7QUFDQUEsV0FBT3pCLEtBQUt3QixPQUFMLENBQWFjLFVBQWIsQ0FBUDs7QUFFQSxRQUFJRyxHQUFKLEVBQVMsTUFBTUEsR0FBTjs7QUFFVCxXQUFPO0FBQ0xoQixVQURLO0FBRUxWLGdCQUFVO0FBRkwsS0FBUDtBQUlEOztBQUVEMkIsdUJBQXFCO0FBQ25CO0FBQ0EsUUFBSUMsY0FBYyxPQUFsQjtBQUNBLFFBQUlDLFlBQVksS0FBS0MsWUFBTCxJQUFxQixFQUFyQztBQUNBLFFBQUlDLGdCQUFnQkYsVUFBVUcsR0FBVixDQUFlQyxDQUFELElBQU9BLEVBQUVOLGtCQUF2QixFQUEyQ08sSUFBM0MsRUFBcEI7O0FBRUEsV0FBUSxHQUFFTixXQUFZLElBQUdHLGFBQWMsRUFBdkM7QUFDRDtBQXJJb0Q7a0JBQWxDNUMsWSIsImZpbGUiOiJyaW90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21waWxlckJhc2V9IGZyb20gJy4uL2NvbXBpbGVyLWJhc2UnO1xuXG5jb25zdCBpbnB1dE1pbWVUeXBlcyA9IFsndGV4dC9yaW90J107XG5sZXQgcmlvdCA9IG51bGw7XG5cbmNvbnN0IG1pbWVUeXBlVG9TaW1wbGVUeXBlID0ge1xuICAndGV4dC9jb2ZmZWVzY3JpcHQnOiAnY29mZmVlJyxcbiAgJ3RleHQvdHlwZXNjcmlwdCc6ICd0cycsXG4gICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JzogJ2pzJyxcbiAgJ3RleHQvamFkZSc6ICdqYWRlJyxcbiAgJ3RleHQvbGVzcyc6ICdsZXNzJyxcbiAgJ3RleHQvc2Fzcyc6ICdzYXNzJyxcbiAgJ3RleHQvc2Nzcyc6ICdzY3NzJyxcbiAgJ3RleHQvc3R5bHVzJzogJ3N0eWx1cycsXG59O1xuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaW90Q29tcGlsZXIgZXh0ZW5kcyBDb21waWxlckJhc2Uge1xuICBjb25zdHJ1Y3Rvcihhc3luY0NvbXBpbGVycywgc3luY0NvbXBpbGVycykge1xuICAgIHN1cGVyKCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IGFzeW5jQ29tcGlsZXJzLCBzeW5jQ29tcGlsZXJzIH0pO1xuXG4gICAgdGhpcy5jb21waWxlck9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGcm9tQ29tcGlsZXJzKGNvbXBpbGVyc0J5TWltZVR5cGUpIHtcbiAgICBsZXQgbWFrZUFzeW5jQ29tcGlsZXJzID0gKCkgPT4gT2JqZWN0LmtleXMoY29tcGlsZXJzQnlNaW1lVHlwZSkucmVkdWNlKChhY2MsIG1pbWVUeXBlKSA9PiB7XG4gICAgICBsZXQgY29tcGlsZXIgPSBjb21waWxlcnNCeU1pbWVUeXBlW21pbWVUeXBlXTtcblxuICAgICAgYWNjW21pbWVUeXBlXSA9IGFzeW5jIChjb250ZW50LCBjYiwgcmlvdENvbXBpbGVyLCBmaWxlUGF0aCkgPT4ge1xuICAgICAgICBsZXQgY3R4ID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFhd2FpdCBjb21waWxlci5zaG91bGRDb21waWxlRmlsZShmaWxlUGF0aCwgY3R4KSkge1xuICAgICAgICAgICAgY2IobnVsbCwgY29udGVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNvbXBpbGVyLmNvbXBpbGUoY29udGVudCwgZmlsZVBhdGgsIGN0eCk7XG4gICAgICAgICAgY2IobnVsbCwgcmVzdWx0LmNvZGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNiKGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgc3QgPSBtaW1lVHlwZVRvU2ltcGxlVHlwZVttaW1lVHlwZV07XG4gICAgICBpZiAoc3QpIGFjY1tzdF0gPSBhY2NbbWltZVR5cGVdO1xuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIGxldCBtYWtlU3luY0NvbXBpbGVycyA9ICgpID0+IE9iamVjdC5rZXlzKGNvbXBpbGVyc0J5TWltZVR5cGUpLnJlZHVjZSgoYWNjLCBtaW1lVHlwZSkgPT4ge1xuICAgICAgbGV0IGNvbXBpbGVyID0gY29tcGlsZXJzQnlNaW1lVHlwZVttaW1lVHlwZV07XG5cbiAgICAgIGFjY1ttaW1lVHlwZV0gPSAoY29udGVudCwgY2IsIHJpb3RDb21waWxlciwgZmlsZVBhdGgpID0+IHtcbiAgICAgICAgbGV0IGN0eCA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghY29tcGlsZXIuc2hvdWxkQ29tcGlsZUZpbGVTeW5jKGZpbGVQYXRoLCBjdHgpKSB7XG4gICAgICAgICAgICBjYihudWxsLCBjb250ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVzdWx0ID0gY29tcGlsZXIuY29tcGlsZVN5bmMoY29udGVudCwgZmlsZVBhdGgsIGN0eCk7XG4gICAgICAgICAgY2IobnVsbCwgcmVzdWx0LmNvZGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNiKGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBsZXQgc3QgPSBtaW1lVHlwZVRvU2ltcGxlVHlwZVttaW1lVHlwZV07XG4gICAgICBpZiAoc3QpIGFjY1tzdF0gPSBhY2NbbWltZVR5cGVdO1xuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIC8vIE5COiBUaGlzIGlzIHN1cGVyIGhhY2t5IGJ1dCB3ZSBoYXZlIHRvIGRlZmVyIGJ1aWxkaW5nIGFzeW5jQ29tcGlsZXJzXG4gICAgLy8gYW5kIHN5bmNDb21waWxlcnMgdW50aWwgY29tcGlsZXJzQnlNaW1lVHlwZSBpcyBmaWxsZWQgb3V0XG4gICAgbGV0IHJldCA9IG5ldyBSaW90Q29tcGlsZXIobnVsbCwgbnVsbCk7XG5cbiAgICBsZXQgYXN5bmNDb21waWxlcnMsIHN5bmNDb21waWxlcnM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJldCwgJ2FzeW5jQ29tcGlsZXJzJywge1xuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIGFzeW5jQ29tcGlsZXJzID0gYXN5bmNDb21waWxlcnMgfHwgbWFrZUFzeW5jQ29tcGlsZXJzKCk7XG4gICAgICAgIHJldHVybiBhc3luY0NvbXBpbGVycztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXQsICdzeW5jQ29tcGlsZXJzJywge1xuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHN5bmNDb21waWxlcnMgPSBzeW5jQ29tcGlsZXJzIHx8IG1ha2VTeW5jQ29tcGlsZXJzKCk7XG4gICAgICAgIHJldHVybiBzeW5jQ29tcGlsZXJzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbnB1dE1pbWVUeXBlcygpIHtcbiAgICByZXR1cm4gaW5wdXRNaW1lVHlwZXM7XG4gIH1cblxuICBhc3luYyBzaG91bGRDb21waWxlRmlsZShmaWxlTmFtZSwgY29tcGlsZXJDb250ZXh0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGRldGVybWluZURlcGVuZGVudEZpbGVzKHNvdXJjZUNvZGUsIGZpbGVQYXRoLCBjb21waWxlckNvbnRleHQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFzeW5jIGNvbXBpbGUoc291cmNlQ29kZSwgZmlsZVBhdGgsIGNvbXBpbGVyQ29udGV4dCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgcmlvdCA9IHJpb3QgfHwgcmVxdWlyZSgncmlvdCcpO1xuXG4gICAgbGV0IGNvZGUgPSByaW90LmNvbXBpbGUoc291cmNlQ29kZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29kZSxcbiAgICAgIG1pbWVUeXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCdcbiAgICB9O1xuICB9XG5cbiAgc2hvdWxkQ29tcGlsZUZpbGVTeW5jKGZpbGVOYW1lLCBjb21waWxlckNvbnRleHQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZGV0ZXJtaW5lRGVwZW5kZW50RmlsZXNTeW5jKHNvdXJjZUNvZGUsIGZpbGVQYXRoLCBjb21waWxlckNvbnRleHQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbXBpbGVTeW5jKHNvdXJjZUNvZGUsIGZpbGVQYXRoLCBjb21waWxlckNvbnRleHQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIHJpb3QgPSByaW90IHx8IHJlcXVpcmUoJ3Jpb3QnKTtcblxuICAgIGxldCBlcnIsY29kZTtcbiAgICBjb2RlID0gcmlvdC5jb21waWxlKHNvdXJjZUNvZGUpO1xuXG4gICAgaWYgKGVycikgdGhyb3cgZXJyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvZGUsXG4gICAgICBtaW1lVHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnXG4gICAgfTtcbiAgfVxuXG4gIGdldENvbXBpbGVyVmVyc2lvbigpIHtcbiAgICAvLyBOQjogU2VlIHNhbWUgaXNzdWUgd2l0aCBTQVNTIGFuZCB1c2VyLXNjb3BlZCBtb2R1bGVzIGFzIHRvIHdoeSB3ZSBoYXJkLWNvZGUgdGhpc1xuICAgIGxldCB0aGlzVmVyc2lvbiA9ICczLjkuMCc7XG4gICAgbGV0IGNvbXBpbGVycyA9IHRoaXMuYWxsQ29tcGlsZXJzIHx8IFtdO1xuICAgIGxldCBvdGhlclZlcnNpb25zID0gY29tcGlsZXJzLm1hcCgoeCkgPT4geC5nZXRDb21waWxlclZlcnNpb24pLmpvaW4oKTtcblxuICAgIHJldHVybiBgJHt0aGlzVmVyc2lvbn0sJHtvdGhlclZlcnNpb25zfWA7XG4gIH1cbn1cbiJdfQ==