### Create `Private KEY`

- Firebase > Project Settings > Service accounts > Fierbase ADMIN SDK
- Then click on `Generate new private key` for node.js
- Because the cloud function we are writing is in javascript


### Copy the `package names`
- Copy the `package.json` with latest modules
- If its not working, Kindly update them with latest modules
- go to npm website to find the latest vesrions of the modules

### Open the Terminal
- Traverse to the installed directory of cloud function
```console
cd > Cloud_function
```
### Install npm and Node Modules 
- Run the following command in terminal
- Make sure you are in `cloud_function` directory

```console
npm run
```

### Copy the `Index.js` file
This contains the code for uploading to firestorage buckets
- Copy the code and change your `Index.js` file with the code in the repo
- dont forget to Change the projectname
- Paste the private key in the required folder

### Deploying to Firebase
For more details about running firebase cloud functions initialisation and deployment check
[Firebase cloud function tutorial github](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Cloud%20Function)

```console
firebase deploy --only functions
```
After deploying you will get the `http endpoint` from the firebase console

### Testing
Check this free opensource api testing tool to test the api endpoint.
https://hoppscotch.io

- `Method` as `POST`
- `BODY REQUEST` should be set as `form-data`
---
