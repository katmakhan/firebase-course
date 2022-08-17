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
  projectId: "<project_id>",
//   Write the name of the file in the root director which contains the private key of firebase-admin-sdk
  keyFilename: "firebase-admin-sdk.json"
};

// const gcs = require("@google-cloud/storage")(gcconfig);
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage(gcconfig);

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
    
    //File parsing
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {

        // Firebase cloudfunction will have some tmpdirectory tmpdir
        // It will be cleaned up after execution
      console.log("File function reached ");

      console.log("Temp folder is "+os.tmpdir());
      console.log("File name is "+filename.filename);

      const filepath = path.join(os.tmpdir(),filename.filename);

      console.log("Location of file is "+filepath);
      uploadData = { file: filepath, type: mimetype };

      console.log("Writing to temp file storage");
      //Writing file to storage
      file.pipe(fs.createWriteStream(filepath));

      //Extra Details such as limit error
      file.on('limit', () => {
        console.log("Reached size limit");
        debugLog(options, `Size limit reached for ${field}->${filename.filename}, bytes:${getFilesizeInBytes(filename)}`);
      });
        file.on('end', () => {
        const size = getFilesizeInBytes(filename.filename);
        console.log("File size is "+size+" bytes");
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
        // gs://<project_id>.appspot.com
        // Remove the gs String

      console.log("Finished BusBoy");
      var your_project_id="<project_id>.appspot.com";

      const bucket = gcs.bucket(your_project_id);
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
          console.log("Uploaded Successfully");
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
            // Error
            console.log("Error while uploading");

          res.status(500).json({
            error: err
          });
        });
    });

    //End the parsing
    console.log("End Parsing");
    busboy.end(req.rawBody);

  });
});

//Finding the file size from the filename
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}
