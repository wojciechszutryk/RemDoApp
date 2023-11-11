# Description

Application is deployed on Google Cloud Platform. Both frontend and backend are served using backend application. Fronted is build and copied to backend's public folder. For more details see Dockerfile.

# Deploy to production

go to /prod branch
merge it with master
set proper env variables in /frontend/.env
go to google cloud console
Cloud Build -> Triggers -> Create Trigger OR Run Trigger
Cloud Run -> Select Service -> Edit and Deploy New Revision
