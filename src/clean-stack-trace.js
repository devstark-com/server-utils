function cleanStackTrace (reason) {
  require('stack-chain').format.replace(function (error, frames) {
    var lines = []

    lines.push(error.toString())

    frames.forEach(frame => {
      if (frame.toString().includes('src')) lines.push('    at ' + frame.toString())
      else lines.push(`    at ${frame.toString()}`.gray)
    })

    return lines.join('\n')
  })
}

module.exports = cleanStackTrace
