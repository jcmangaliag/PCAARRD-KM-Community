# PCAARRD KM Community
A web application that allows members to post a question, news, report, event, advertisement, media or others in their virtual spaces or groups. In addition, members can also comment and choose reactions on the existing posts.

## Prerequisites
1. Node.js v7. Follow the installation steps for your operating system: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
2. MongoDB. Download link: https://www.mongodb.com/download-center#community. Installation instructions for Ubuntu users: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## Installation instructions
1. Fork and clone the repository.
2. Open a terminal and go to the PCAARRD-KM-Community directory.
3. Type these commands (in order):

```bash
git fetch origin
git checkout development
npm install
```

## Running instructions
1. Open another terminal and run MongoDB using:

```bash
sudo service mongod start
```
2. In another terminal (in PCAARRD-KM-Community directory), run the web application using:

```bash
npm run dev
```
3. Open a web browser and go to:

```bash
localhost:8080
```
