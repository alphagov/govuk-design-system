'use strict'
const fs = require('fs')

module.exports = {
  fileStorage: './.precachestate',
  /**
   * Write the precache data to file on disk
   * @param {string} precacheStats String of filecount and total byte data from workbox
   */
  writeFile: function (precacheStats) {
    // Write the current precache data to a file to "save state"
    fs.writeFile(this.fileStorage, precacheStats, function (err) {
      if (err) {
        return console.error(err)
      }
    })
  },
  /**
   * Check the number of files being precached and compare to previous value
   * @param {number} currentCount Number of files being precaced on the current build
   * @param {number} previousCount Number of files that were precaced on the previous build
   * @param {number} percentageIncreaseThreshold Set the percentage threshold for when a warning should show
   * @returns {(boolean|string)} Either returns the warning string or false for no warning
   */
  checkFileNumber: function (currentCount, previousCount, percentageIncreaseThreshold) {
    // set the cut-off warning at a 'percentageIncrease' file number increase
    let countWarningLimit = previousCount + (previousCount * (percentageIncreaseThreshold / 100))

    // if number of files grows by 'percentageIncrease', then there will be a warning
    if (currentCount > countWarningLimit) {
      return `* The number of files being precached has increased over the ${percentageIncreaseThreshold}% threshold\nfrom ${previousCount} to ${currentCount} (${(((currentCount - previousCount) / previousCount) * 100).toFixed(0)}%).`
    }

    return false
  },
  /**
   * Check the total filesize of the files to be precached and compare to previous value
   * @param {number} currentSize Total filesize being precaced on the current build
   * @param {number} previousSize Total filesize that were precaced on the previous build
   * @param {number} percentageIncreaseThreshold Set the percentage threshold for when a warning should show
   * @returns {(boolean|string)} Either returns the warning string or false for no warning
   */
  checkFileSize: function (currentSize, previousSize, percentageIncreaseThreshold) {
    // set the cut-off warning at a 'percentageIncrease' filesize increase
    let filesizeWarningLimit = previousSize + (previousSize * (percentageIncreaseThreshold / 100))

    // if number of files grows by 'percentageIncrease', then there will be a warning
    if (currentSize > filesizeWarningLimit) {
      return `* The total file size being precached has increased over the ${percentageIncreaseThreshold}% threshold\nfrom ${(previousSize / 1024 / 1024).toFixed(2)}MB to ${(currentSize / 1024 / 1024).toFixed(2)}MB (${(((currentSize - previousSize) / previousSize) * 100).toFixed(0)}%).`
    }

    return false
  },
  /**
   * Check to see if storage file exists and run the checks, or write a new storage file
   * @param {number} currentCount Number of files being precaced on the current build
   * @param {number} currentSize Total filesize being precaced on the current build
   */
  runChecks: function (currentCount, currentSize) {
    if (fs.existsSync(this.fileStorage)) {
      // read in the file, split into array
      let fileDataArray = fs.readFileSync(this.fileStorage, 'utf8').split('|')
      let previousCount = parseInt(fileDataArray[0], 10)
      let previousSize = parseInt(fileDataArray[1], 10)

      // check the number of files hasn't increased above the threshold percentage
      let fileNumberResult = this.checkFileNumber(currentCount, previousCount, 10)

      // check the total file size hasn't increased above the threshold percentage
      let filesizeResult = this.checkFileSize(currentSize, previousSize, 10)

      if (fileNumberResult || filesizeResult) {
        console.warn(`= Precache Warning =======================================================`)
        if (fileNumberResult) {
          console.warn(`${fileNumberResult}`)
        }
        if (filesizeResult) {
          console.warn(`${filesizeResult}`)
        }
        console.warn(`==========================================================================`)
      }
    } else {
      console.log(`${this.fileStorage} file doesn't exist so creating it now.`)
    }

    // write the current precache data to a file for future comparison
    this.writeFile(`${currentCount}|${currentSize}`)
  }
}
