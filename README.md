# nerva-nodemap
Interactive map of NERVA full nodes.
Join us on discord: https://discord.gg/xBHxnGN

### crontab
```sh
*/15 * * * * /bin/bash /map-fetch.sh
0 0 1 * * /bin/bash /map-snapshot.sh
```
Adjust file paths as necessary.
