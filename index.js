'use strict'
const fs = require('fs')
const path = require('path')
const toposort = require('toposort')

function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}

class HtmlPlugin {
  constructor(options) {
    this.options = Object.assign({
      inject: true,
      filename: '',
      template: '',
      publicPath: '',
      hash: false,
      chunkPipe: undefined
    }, options)

    if (fsExistsSync(this.options.filename)) {
      fs.unlink(this.options.filename, (err) => {
        if (err) {
          throw err
        }
      })
    }

    fs.readFile(this.options.template, 'utf8', (err, data) => {
      if (err) {
        throw err
      }
      this.html = data
    })

    this.createFolder(this.options.filename)
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, next) => {
      let allChunks = compilation.getStats().toJson().chunks

      let chunks = this.dependency(allChunks).reverse()

      chunks.forEach((chunk) => {
        let chunkHash = chunk.hash

        let chunkFiles = [].concat(chunk.files).map((chunkFile) => {
          return chunkFile
        })

        chunkFiles = chunkFiles.map((chunkFile) => {
          if (typeof this.options.publicPath === 'string') {
            chunkFile = this.options.publicPath + chunkFile
          }

          if (this.options.hash) {
            chunkFile = this.appendHash(chunkFile, chunkHash)
          }

          if (typeof this.options.chunkPipe === 'function') {
            chunkFile = this.options.chunkPipe(chunkFile)
          }

          return chunkFile
        })

        if (this.options.inject) {
          this.appendToHtml(chunkFiles)
        }
      })

      fs.writeFileSync(this.options.filename, this.html, (err, data) => {
        if (err) {
          throw err
        }
      })
      next()
    })
  }

  appendToHtml(chunkFiles) {
    chunkFiles.forEach((chunkFile) => {
      if (chunkFile.indexOf('.js') !== -1 && chunkFile.indexOf('.map') === -1) {
        let str = `<script src="${chunkFile}"></script>`
        this.html = this.html.replace(/<\/body>/, `$&${str}`)
      }
      if (chunkFile.indexOf('.css') !== -1 && chunkFile.indexOf('.map') === -1) {
        let str = `<link rel="stylesheet" href="${chunkFile}" />`
        this.html = this.html.replace(/<\/head>/, `${str}$&`)
      }
    })
  }

  appendHash(url, hash) {
    if (!url) {
      return url
    }
    return url + (url.indexOf('?') === -1 ? '?' : '&') + hash
  }

  dependency (chunks) {
    if (!chunks) {
      return chunks
    }

    let nodeMap = {}

    chunks.forEach((chunk) => {
      nodeMap[chunk.id] = chunk
    })

    let edges = []

    chunks.forEach(chunk => {
      if (chunk.parents) {
        chunk.parents.forEach((parentId) => {
          let parentChunk = typeof (parentId) === 'object' ? parentId : nodeMap[parentId]
          if (parentChunk) {
            edges.push([parentChunk, chunk])
          }
        })
      }
    })
    return toposort.array(chunks, edges)
  }

  createFolder(to) {
    let sep = path.sep
    let folders = path.dirname(to).split(sep)
    let p = ''
    while (folders.length) {
      p += folders.shift() + sep
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
      }
    }
  };
}

module.exports = HtmlPlugin
