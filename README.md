# Firebase Syllabus

- [Realtime Database](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Realtime%20Database)
  - Billed based on data transfer rather than document numbers
  - Can do simples queries
  - Good for real time data storage and retrival
  - Ideal for stock trading data and real time monitoring systems for IOT
- [Cloud Firestore](https://github.com/katmakhan/firebase-course/tree/master/FIrebase%20Cloud%20Firestore) (Billed based on number of documents
  - Billed based on number of documents
  - Can do complex queries
  - Good for storing relational database
  - Ideal for storing review informations, complex data models
- [Firebase Hosting](https://github.com/katmakhan/firebase-course/tree/master/FIrebase%20Hosting)
  - Completely free for medium level traffic
  - Easy setup with github actions
- [Remote Configs](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Remote%20Config)
  - Change configs for the mobile apps without any updates
  - Not ideal for initial settingup
  - Takes time to effect 100% of rollout
- [Cloud Functions](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Cloud%20Function)
  - Compression of image
  - Automatic Backups
  - Automatic summation
- [Push Messages](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Push%20Notification)
  - To send notification to web and mobile platforms
  - With Image headers
  - With Unique notification sound
  - With click actions
- [In-App Messages](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20In-APP%20Message)
  - For in app popup for user engagement
  - Ideal for promotional or new feature updates
- [Dynamic Links](https://github.com/katmakhan/firebase-course/tree/master/FIrebase%20Dynamic%20Links)
  - For using for referal links
  - Opening dedicated pages or posts from app
- [Security Rules](https://github.com/katmakhan/firebase-course/tree/master/Firebase%20Security%20Rules)
  - To secure the database
  - Rules to secure data using admin roles
  - Rules to minimise data extraction

 ---
 ### Installing Firebase CLI in Windows or MAC
 ```bash
 curl -sL https://firebase.tools | bash
 ```
- Then initialise by `firebase login` and add your service account
```bash
firebase login
```
- Then initialise the project by going inside the project folder and typing
```bash
firebase init
```


 ### Installing Firebase-Admin in Python

 ```bash
 pip install firebase-admin
 ```
 
 ---
 
 ### Debugging the installation error
 
 If there is error like when installing any other dependencies
 ```console
 File "C:\Users\<NAME>\Anaconda3\lib\site-packages\firebase_admin\_http_client.py", line 34, in <module>
    raise_on_status=False, backoff_factor=0.5, **_ANY_METHOD)
    TypeError: __init__() got an unexpected keyword argument 'status'
 ```
 
Just do the following steps
- Go the following path
  ```console
  C:\Users\<NAME>\Anaconda3\lib\site-packages\firebase_admin_http_client.py
  ```
- Comment the following lines from firebase_admin_http_client.py:
  ```console
   #from requests.packages.urllib3.util import retry
   #DEFAULT_RETRY_CONFIG = retry.Retry(
   #connect=1, read=1, status=4, status_forcelist=[500, 503],
   #raise_on_status=False, backoff_factor=0.5)
  ```
- Also Change the init parameter as follows
```console
def __init__(
  self, credential=None, session=None, base_url='', headers=None,
  retries=1,timeout=120):
```
---
OR
Change the `requests` version to 
```console
2.11.1
```

```bash
pip uninstall requests
```

```bash
pip install requests
```
Trying Co-Author Badge


