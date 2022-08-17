# Firebase Secutiy Rules for REALTIME DB

### For User Specific Data Paths
```console
"rules": {
	"users": {
		"$uid": {
			".read": "auth != null && auth.uid == $uid",
			".write": "auth != null && auth.uid == $uid"
		}
	}
}
```

### For User Role Specific Data Paths
```console
"$pathname":{
	".read": "auth != null && root.child('/userdata/'+auth.uid+'/userRole').exists()",
	".write": "auth != null && root.child('/userdata/'+auth.uid+'/userRole').exists()"
}
```

### For Super Admin Roles
```console
"userdata": {
	"$userId": {
		".write": "$userId === auth.uid || root.child('/userdata/'+auth.uid+'/userRole').val()=== 'superadmin'"
	}
}
```

# Firebase Security Rules for STORAGE

### Limiting with Write only
So that anyone can read the images, but only write if they are authenticated
```console
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow  write: if request.auth != null;
      allow  read: if request.auth == null;
    }
  }
}
```

### Limiting with UID
```console
service firebase.storage {
  match /b/{bucket}/o {
    match /{environment}/{client_id}/{allPaths=**} {
      allow read: if request.auth.uid == client_id
    }
  }
}
```
OR
### Limiting with custom claims
```console
service firebase.storage {
  match /b/{bucket}/o {
    match /{environment}/{client_id}/{allPaths=**} {
      allow read: if request.auth.token.client_id == client_id
    }
  }
}
```

OR
### Functions inside Security Rules - Storage
```console
service firebase.storage {
  match /b/{bucket}/o {
    function isAuth() {
      return request.auth != null && request.auth.uid != null
    }
    function isAdmin() {
      return isAuth() &&
      request.auth.token.admin == true;
    }
    function clientMatch(clientId) { // expects users "client" field to be ID of client
      return isAuth() &&
      clientId == request.auth.token.clientId;
    }
    match /storage/path/{clientId}/{allPaths=**} {
        allow read, write: if isAdmin() || clientMatch(clientId)
    }
}
}
```