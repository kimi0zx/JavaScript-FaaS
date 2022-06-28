const fs = require('fs-extra')

const filterTargetFuncDir = async (funcRootDirPath, funcInfo) => {
  const fileList = await fs.readdir(funcRootDirPath)
  return fileList.filter((item) => matchFileList(item, funcInfo))
}

const getFuncBasicInfo = (funcDir) => {
  const [id, author, namespace] = funcDir.split('-')
  return {
    id,
    author,
    namespace
  }
}

const matchFileList = (filePath, funcInfo) => {
  const { id: targetId, author: targetAuthor, namespace: targetNamespace } = funcInfo
  const { id: currentId, author: currentAuthor, namespace: currentNamespace } = getFuncBasicInfo(filePath)
  let idMatch = false
  let authorMatch = false
  let namespaceMatch = false

  if (!targetId && !targetAuthor && !targetNamespace) {
    return false
  }
  if (!targetId || targetId === currentId) {
    idMatch = true
  }
  if (!targetAuthor || targetAuthor === currentAuthor) {
    authorMatch = true
  }
  if (!targetNamespace || targetNamespace === currentNamespace) {
    namespaceMatch = true
  }
  return idMatch && authorMatch && namespaceMatch
}


module.exports = {
  filterTargetFuncDir,
  getFuncBasicInfo
}