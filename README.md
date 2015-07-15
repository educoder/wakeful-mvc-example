# wakeful-example
Wakeful example using the Faye enhanced backbone.js library

Prerequisits
============
- Local DrowsyDromedary (see https://github.com/educoder/DrowsyDromedary)
- Local WakefulWeasel server (see https://github.com/educoder/WakefulWeasel)
- Local MongoDB (needed for Drowsy and Wakeful)
- git
- node.js and npm
- bower  ```npm install -g bower```
- grunt-cli (if you want to use grunt) ```npm install -g grunt-cli```
- http-server to serve the website locally ```npm install http-server -g``` (see https://www.npmjs.com/package/http-server)

Installation
============
Clone this repo with: ```git clone https://github.com/educoder/wakeful-mvc-example.git```

Then ```cd``` into the new folder and install the dependencies (npm and bower):

```
npm install
bower install
```

Before you can get started you need to ensure that you have a ```config.json``` file filled with the necessary information about Wakeful and Drowsy servers. Copy ```config.example.json``` and modify it to fit your local installation (port numbers!!!). Also ensure that you create the database specified in the config.json in the MongoDB used by you DrowsyDromedary instance.

Running the example
===================
You can use Apache or nginx and point it at the directory of the example but for local testing the easiest solution is http-server. Make sure you have it installed, if not run ```npm install -g http-server``` (make sure to set the -g flag for global install and have it available everywhere). Now start the server in the folder of this example with: ```http-server```

Now open this URL in your browser ```http://localhost:8080``` (this is the default port for http-server)
