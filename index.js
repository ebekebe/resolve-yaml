const fs = require('fs')
const path = require('path')
const process = require('process')
const yaml = require('js-yaml')
const merge = require('lodash.merge')


function main (args) {
  if (args < 1) {
    console.error(`Usage: resolve-yaml file1.yaml [file2.yaml ...]`)
  }
  else {
    process.stdout.write(yaml.safeDump(mergeFiles(args)))
  }
}


function mergeFiles (fileNames) {
  return fileNames
    .map(name => [
      name,
      yaml.safeLoad(fs.readFileSync(name, 'utf8'))
    ])
    .map(([name, content]) => resolvePaths(name, content))
    .reduce(merge, {})
}


function resolvePaths (filePath, content) {
  const workingDir = path.resolve('.')

  return traverse(content, (key, value) => {
    if (typeof value === 'string' && value.startsWith('./')) {
      return './' + path.relative(
        workingDir,
        path.resolve(filePath, '..', value)
      )
    }
    return value
  })
}


function traverse (object, func) {
  return JSON.parse(JSON.stringify(object, func))
}


module.exports = {main, mergeFiles, resolvePaths}
