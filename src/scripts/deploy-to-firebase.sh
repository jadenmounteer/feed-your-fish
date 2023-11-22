# This script deploys the app to firebase.
# It assumes you are already authenticated. If you get an auth error, run firebase login --reauth
# It also assumes you have initialized the app running firebase init. Make sure the public folder is dist/feed-your-fish.
# Also make sure to say no to replacing index.html.
# If you get the white screen of death and you see n.auth() is not a function in the console, downgrade to the latest stable version of node: https://codeforgeek.com/update-node-using-npm/
ng build --configuration production
firebase deploy
