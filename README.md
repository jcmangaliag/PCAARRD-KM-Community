# PCAARRD KM Community
A web community that allows its users to see, create, and join virtual spaces / groups related to PCAARRD's commodities. These groups are classified by industry, sector, ISP, and specific commodity. Once a user becomes part of a group, he or she can participate in the group's discussions by posting, commenting, and reacting. Every group must have at least one group administrator, the one who can perform group administrative privileges. These privileges are editing group information, changing membership type, and etc.

Categorized posting is implemented in this website. It is a feature that allows members to post a question, news, report, event, advertisement, media, or others in their groups. When viewing posts, they can choose to view posts in all categories or they can only view posts in one chosen category.

In addition, there is also community feed for all site members to see at the Community homepage when they are logged in. Community feed contains latest posts in the groups that users joined. This feature always gets users updated to the latest happenings in his or her groups. 

This site contains even more features for regular users including view all posts by user, filter posts and groups by text, set posts invisible to non-member of the group, edit user information, and more. For site administrators, they have access to administrative features, namely manage group classifications and community dashboard.

## Prerequisites
1. Node.js v6. Follow the installation steps for your operating system: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
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

4. Create .env file in the PCAARRD-KM-Community directory containing secret keys. Contact me to obtain the secret hash and salt.

## Running instructions
1. Open another terminal and run MongoDB using:

```bash
sudo service mongod start
```
2. In another terminal (in PCAARRD-KM-Community directory), run the web application using:

  * On development
```bash
npm run dev-client (when working with client files)
or
npm run dev-server (when working with server files)
```

   * On production
```bash
npm run build (transpile and minify server codes and create client bundle)
and 
npm start (run the built server and client codes)
```
3. Open a web browser and go to:

```bash
localhost:8080 on development
```

```bash
localhost:3000 on production
```
