const functions = require("firebase-functions");
const admin = require('firebase-admin');

// Run time Options
const runtimeOpts = {
    timeoutSeconds: 5,
    memory: '128MB',
    maxInstances: 5,

  }

// Fetch the service account key JSON file contents
//var serviceAccount = require("./serviceAccountKey.json");

const dbref="https://<Project-id>-<db-name>.firebaseio.com/";

//admin.initializeApp();

admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
  databaseURL: dbref,
  // databaseAuthVariableOverride: {
  //   uid: "my-service-worker"
  // }
});

// Variable for Fyers Redirection
// s=ok
// code=200
// auth_code="what we need"
// state=key

exports.fyers_api = functions.runWith(runtimeOpts).https.onRequest(async (request, response) => {

    const requestBody=request.query;
    const s_code=requestBody.code;
    const status=requestBody.s;
    console.log("Request Body",requestBody);

    if(s_code==200)
    {
        //Fetch necessary Data
        const auth_code=requestBody.auth_code;

        // Updating the RTD
        const dataref=admin.database().ref('FEYRS-API');
        const writeData = await dataref.child("api-key").set(auth_code);

        response.send("Updated Sucessfully");
    }
    else
    {
        response.send("Error "+status);
    }
    
});