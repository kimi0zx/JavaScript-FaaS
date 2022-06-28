import * as monaco from "monaco-editor"

const INIT_CODE = `// the function must named "func" and exported.
module.exports.func = async (ctx) => {
  // write your code here
  return ctx
}`;

let codeEditor = null

export const initializeCodeEditor = (dom, code) => {
  if (!codeEditor) {
    codeEditor = monaco.editor.create(dom, {
      language: "javascript",
      value: code ? code : INIT_CODE,
      automaticLayout: true,
    });
  }
}

export const getCodeEditor = () => {
  return codeEditor
}

export const destoryCodeEditor = () => {
  if (codeEditor) {
    codeEditor.dispose()
    codeEditor = null
  }
}