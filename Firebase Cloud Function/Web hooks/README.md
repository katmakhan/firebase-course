# Firebase Web Hooks

### Initialise Firebase using 
``` console
firebase init
```

### Intitalise the Emulators using
```console
firebase init emulators
```

### Start the emulators using
```console
firebase emulators:start
```

### To Deploy
- Cd functions - To get inside the functions folder
- `npm install` - To install the dependencies
- `cd..` - To get back to main folder
- `firebase deploy` - To deploy the function to firebase

### To note while deploying new cloud function
- Type `no` to install as new, Or it will delete the existing functions, when you are uploading functions seperately, with existing cloud functions.
```shell
If you are renaming a function or changing its region, it is recommended that you create the new function first before deleting the old one to prevent event loss. For more info, visit https://firebase.google.com/docs/functions/manage-functions#modify

? Would you like to proceed with deletion? Selecting no will continue the rest 
of the deployments. No
i  functions: creating Node.js 18 (1st Gen) function <your_function_name>(us-central1)...
✔  functions[<your_function_name>(us-central1)] Successful create operation.
Function URL (<your_function_name>(us-central1)): https://<realtimelocation>.cloudfunctions.net/<your_function_name>
i  functions: cleaning up build files...

✔  Deploy complete!

```
