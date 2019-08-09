#!/bin/bash

wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=7" -O tmp
if [ `cat tmp | wc -l` != 0 ]
 then
        mv tmp /var/www/map.nerva.tools/data/connections_7d.txt
        wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=14" -O tmp && mv tmp /var/www/map.nerva.tools/data/connections_14d.txt
        wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=30" -O tmp && mv tmp /var/www/map.nerva.tools/data/connections_30d.txt
fi
else rm tmp
