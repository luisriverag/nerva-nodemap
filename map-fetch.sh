#!/bin/bash
wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=7" -O /tmp/wget && mv /tmp/wget /www/data/connections_7d.txt
wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=14" -O /tmp/wget && mv /tmp/wget /www/data/connections_14d.txt
wget "https://xnv1.getnerva.org/api/fetchanalytics.php?limit=30" -O /tmp/wget && mv /tmp/wget /www/data/connections_30d.txt
