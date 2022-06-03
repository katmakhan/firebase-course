1. CREATE Private KEY

Firebase > Project Settings > Service accounts > Fierbase ADMIN SDK, "Generate new private key" for node.js

(As the cloud function we are writing is in node)


2. AFTER WRITING THE package name in "package.json" with latest modules

go to npm, and change to latest modules

cd > Functions > npm install

------------------------------------------
BODY REQUEST SHOULD BE SET AS "form-data"
------------------------------------------

After that run "firebase deploy" in the home directory in terminal