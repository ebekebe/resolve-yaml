const assert = require('assert')
const {mergeFiles, resolvePaths} = require('./index.js')

const result = mergeFiles([
  './fixtures/dir1/docker-compose.yaml',
  './fixtures/dir2/docker-compose.yaml',
])

assert.deepEqual(result, {
  version: '3',
  services: {
    serviceA: {
      build: './fixtures/dir1',
      image: 'just-a-string',
    },
    serviceB: {
      build: './fixtures/dir2/subdir',
    },
  },
})
