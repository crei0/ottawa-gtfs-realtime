# Links

- https://nextrip-public-api.developer.azure-api.net/
- https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/
- [RSS feed (English)](https://www.octranspo.com/feeds/updates-en/)

## Other

- https://www.npmjs.com/package/vite-plugin-node
- https://www.npmjs.com/package/gtfs
- https://oct-gtfs-emasagcnfmcgeham.z01.azurefd.net/public-access/GTFSExport.zip


# TODO:

- CRON to daily download GTFS Schedule
'''
in https://nextrip-public-api.developer.azure-api.net/
OC Transpo strongly recommends the download of GTFS Schedule file on a daily basis to ensure the GTFS-RT feed is compatible.
The preferred time to download the compressed zip file would be between mid-night and 2 am EST, just before the start of service day.

- https://oct-gtfs-emasagcnfmcgeham.z01.azurefd.net/public-access/GTFSExport.zip
- https://www.npmjs.com/package/node-cron
'''

# Endpoints

- http://localhost:3000/gtfs/import-static-data