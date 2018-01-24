//@ts-check

// import storj from 'storj';
const Environment = require("storj").Environment;
const readline = require("readline");
const Writable = require("stream").Writable;

function promptWithoutFeedback(promptText) {
  const mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
      if (!this.muted) process.stdout.write(chunk, encoding);
      callback();
    }
  });
  mutableStdout.muted = false;

  const rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
  });

  return new Promise(resolve => {
    rl.question(promptText, password => {
      rl.close();
      resolve(password);
    });
    mutableStdout.muted = true;
  });
}

(async () => {
  const password = await promptWithoutFeedback("Storj password: ");
  const storj = new Environment({
    bridgeUrl: "https://api.storj.io",
    bridgeUser: "daniel.d.steren@gmail.com",
    bridgePass: password,
    encryptionKey: "fashionable governor boar genetic roast grabbing futuristic dismember immunity orphan compulsion atmosphere",
    logLevel: 0
  });

  const bucketId = '2fbd92ffd17b6dcc1f6df581';

  // //Upload File
  // const uploadFilePath = './storj-test-upload.data';
  // const fileName = uploadFilePath;
  // storj.storeFile(bucketId, uploadFilePath, {
  //   filename: fileName,
  //   progressCallback: (progress, uploadedBytes, totalBytes) => {
  //     console.log('Progress: %d, uploadedBytes: %d, totalBytes: %d',
  //                 progress, uploadedBytes, totalBytes);
  //   },
  //   finishedCallback: (err, fileId) => {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log('File upload complete:', fileId);
  //     storj.destroy();
  //   }
  // });

  // Download file
  // const fileId = '872d49e30bb061acb15869ec';
  // const downloadFilePath = './storj-test-download.data';
  // storj.resolveFile(bucketId, fileId, downloadFilePath, {
  //   progressCallback: function(progress, downloadedBytes, totalBytes) {
  //     console.log('Progress: %d, downloadedBytes: %d, totalBytes: %d',
  //                 progress, downloadedBytes, totalBytes);
  //   },
  //   finishedCallback: function(err) {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     console.log('File download complete');
  //     storj.destroy();
  //   }
  // });

  // // Cancel Download
  // storj.resolveFileCancel(state);

  // // View Files
  // storj.listFiles(bucketId, (error, result) => {
  //   console.log('result:', result);
  //   storj.destroy();
  // });

  // // Delete File
  // const fileId = '872d49e30bb061acb15869ec';
  // storj.deleteFile(bucketId, fileId, (err) => {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log('File deleted!');
  //   storj.destroy();
  // });

  // // List Files
  // storj.listFiles(bucketId, (error, files) => {
  //   console.log(files);
  // })

  // List Buckets
  storj.getBuckets((error, buckets) => {
    console.log(buckets);
  })

})();
