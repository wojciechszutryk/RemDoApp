backend:
go to /prod branch
merge it with master
go to google cloud console
Cloud Build -> Triggers -> Create Trigger OR Run Trigger
Cloud Run -> Select Service -> Edit and Deploy New Revision

```

frontend:
set proper variables in .env file
set proper homepage in package.json
run `npm run deploy`


```
