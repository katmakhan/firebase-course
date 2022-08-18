# Firebase REALTIME DB Security Rules

- Limiting with UID
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

- Limiting with User Role EXISTS in DB
  ```console
  "$pathname":{
  	".read": "auth != null && root.child('/userdata/'+auth.uid+'/userRole').exists()",
  	".write": "auth != null && root.child('/userdata/'+auth.uid+'/userRole').exists()"
  }
  ```

- Limiting with User Role EQUALS in DB
  ```console
  "userdata": {
  	"$userId": {
  		".write": "$userId === auth.uid || root.child('/userdata/'+auth.uid+'/userRole').val()=== 'superadmin'"
  	}
  }
  ```

# Firebase STORAGE Security Rules
- Limiting with specific path
  ```console
  service firebase.storage {
    match /b/{bucket}/o {
      match /images/{imageId} {
        allow read, write: if <condition>;
      }

      // Explicitly define rules for the 'mp3s' pattern
      match /mp3s/{mp3Id} {
        allow read, write: if <condition>;
      }
    }
  }
  ```
- Limiting with public READ, but limited WRITES
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

- Limiting with UID
  ```console
  service firebase.storage {
    match /b/{bucket}/o {
      match /{environment}/{client_id}/{allPaths=**} {
        allow read: if request.auth.uid == client_id
      }
    }
  }
  ```
- Limiting with custom claims
  ```console
  service firebase.storage {
    match /b/{bucket}/o {
      match /{environment}/{client_id}/{allPaths=**} {
        allow read: if request.auth.token.client_id == client_id
      }
    }
  }
  ```
- Limiting with custom Functions
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

- Limiting with seperate rules for create,update and delete
  ```console
  service firebase.storage {
    match /b/{bucket}/o {
      // A read rule can be divided into read and list rules
      match /images/{imageId} {
        // Applies to single file read requests
        allow get: if <condition>;
        // Applies to list and listAll requests (Rules Version 2)
        allow list: if <condition>;

      // A write rule can be divided into create, update, and delete rules
      match /images/{imageId} {
        // Applies to writes to file contents
        allow create: if <condition>;

        // Applies to updates to (pre-existing) file metadata
        allow update: if <condition>;

        // Applies to delete operations
        allow delete: if <condition>;
      }
    }
   }
  }
  ```