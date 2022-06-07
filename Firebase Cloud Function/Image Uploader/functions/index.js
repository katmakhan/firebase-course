const functions = require("firebase-functions");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;

//To enable Cross AXIS 
//Change to False to avoid DDOS
const cors = require("cors")({ origin: true });

//Parse Files
const Busboy = require("busboy");

//Files System
const fs = require("fs");

var gcconfig = {
    // Get the project ID from firebaserc
  projectId: "b-community-7862a",
//   Write the name of the file in the root director which contains the private key of firebase-admin-sdk
  keyFilename: "firebase-admin-sdk.json"
};

// const gcs = require("@google-cloud/storage")(gcconfig);
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage(gcconfig);


// exports.onFileChange = functions.storage.object().onChange(event => {
//   const object = event.data;
//   const bucket = object.bucket;
//   const contentType = object.contentType;
//   const filePath = object.name;
//   console.log("File change detected, function execution started");

//   if (object.resourceState === "not_exists") {
//     console.log("We deleted a file, exit...");
//     return;
//   }

//   if (path.basename(filePath).startsWith("resized-")) {
//     console.log("We already renamed that file!");
//     return;
//   }

//   const destBucket = gcs.bucket(bucket);
//   const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
//   const metadata = { contentType: contentType };
//   return destBucket
//     .file(filePath)
//     .download({
//       destination: tmpFilePath
//     })
//     .then(() => {
//       return spawn("convert", [tmpFilePath, "-resize", "500x500", tmpFilePath]);
//     })
//     .then(() => {
//       return destBucket.upload(tmpFilePath, {
//         destination: "resized-" + path.basename(filePath),
//         metadata: metadata
//       });
//     });
// });

exports.uploadFile = functions.https.onRequest((req, res) => {
    //Allowing CROSS SITE
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    console.log("Starting BusBOY");

    const busboy = Busboy({ headers: req.headers});
    let uploadData = null;

    console.log("Starting Parsing Image");
    
    //File parsing
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        // Firebase cloudfunction will have some tmpdirectory tmpdir
        // It will be cleaned up after execution
      const filepath = path.join(os.tmpdir(), filename);

      console.log("Location of file is "+filepath);
      uploadData = { file: filepath, type: mimetype };

      console.log("Writing to temp file storage");
      //Writing file to storage
      file.pipe(fs.createWriteStream(filepath));

      file.on('limit', () => {
        console.log("Reached size limit");
        debugLog(options, `Size limit reached for ${field}->${filename}, bytes:${getFileSize()}`);
      });
        file.on('end', () => {
        console.log("File size is");
        const size = getFileSize();
       });
       file.on('error', (err) => {
        console.log("File format error");
       });
    });

    //For Form data Listener
    // busboy.on("field",()=>{

    // });


    
    // Finishes the whole process, only upload after that
    busboy.on("finish", () => {

        // Firebase storage, Inside the console itself
        // Copy the folder location
        // gs://b-community-7862a.appspot.com
        // Remove the gs String

        console.log("Finished BusBoy");

      const bucket = gcs.bucket("b-community-7862a.appspot.com");
      console.log("Uploading Image to firebase");
      
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
            // Success
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
            // Error
          res.status(500).json({
            error: err
          });
        });
    });

    //End the parsing
    busboy.end(req.rawBody);
  });


});