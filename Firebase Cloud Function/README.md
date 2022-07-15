CD into required folder

-----
STEP:
-----

firebase init
firebase emulators init
firebase emulators:start

---------------------------------
get url for the http endpoint at
---------------------------------
+functions[us-central1-getmemberdetails]: http function initialized (http://localhost:5001/b-community-7862a/us-central1/getmemberdetails).

--------------------------------
Change the rules of storage 
--------------------------------
FROM
 allow read, write: if false;
TO
 allow read, write: if request.auth != null;