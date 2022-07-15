# Firebase Cloud Functions

### Initialise
- Make a directory "some-function"
- Initialise the firebase in local directory

	``` console
	firebase init
	```

- Choosing Firebase Function from feature set
	- Type `y` to proceed
	- Choose the feature, by using `up and down arrow`
	- select the required feature in this case
	- select `Functions`
	- Click on `space bar` to `select` the required feature
	- Then click `enter`

- Choosing the project
	- `Use an existing project`
	- `Create new project`

- Choosing the language
	Here we choose `javascript`, If you are comfortable with typescript choose that
	- `Javascript`
	- `Typescript'

- Choosing `Enforced Style`
	- Choose `N` for not using `ESLint` for initial time being

- Choosing `Installing Dependencies`
	- Choose `Y` to `Install` all the necessary `dependencies`
	
---
### After completion you will see this message in the command prompt
```console
+  Firebase initialization complete!
```

---
### Intialise Emulators for testing

```console
firebase emulators init
```
```console
firebase emulators:start
```

### get url for the http endpoint at

```console
+functions[us-central1-getmemberdetails]: http function initialized (http://localhost:5001/b-community-7862a/us-central1/getmemberdetails).
```
---

### Change the rules of Firebase Storage

- FROM
	```console
	allow read, write: if false;
	```
- TO
	```console
	allow read, write: if request.auth != null;
	```