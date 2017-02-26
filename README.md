#PCAARRD KM Community
An application that allows members to post a question, news, report, event, advertisement, media or others in their virtual spaces or groups. In addition, members can also comment and choose reactions on the existing posts.

#Installation instructions:
1. Fork and clone the repository.
2. Acquire MongoDB if you don't have yet. You can download here: https://www.mongodb.com/download-center#community
Installation instructions for Ubuntu users: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
3. Open a terminal and go to the PCAARRD-KM-Community directory.
4. Type these commands (in order):
  1. "git fetch origin"
  2. "git checkout development"
  3. "sudo npm install"

#Running instructions:
1. Open another terminal tab and run MongoDB by typing "sudo service mongod start". Leave it there open.
2. In the previous terminal tab (in PCAARRD-KM-Community directory), run the web application using "npm run dev".