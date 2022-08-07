# Firebase Secutiy Rules

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