const generateCode = (scriptPath) => {
  let correctScriptPath = scriptPath.replaceAll("\\", "/");
  return `
    (async () => {
      const { func } = require ('${correctScriptPath}')
      return await func(this.ctx)
    })()
  `
}

module.exports = { 
  generateCode 
}
