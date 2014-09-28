# Code for Freedom

![Code for Freedom Logo](gfx/codeforfreedom-logo.png "Code for Freedom Logo")

This map shows where all the smart people come from who attended the [Code for Freedom](http://www.codeforfreedom.org) event.

## How to get on the map?

To get onto the map you need to fill out a block of information.
Please feel free to choose the information which you want to share publically.

Please find coordinates of your town and district to avoid overlapping markers on the map.

```json
{
    "geometry": {
        "coordinates": [
            0,
            0
        ],
        "type": "Point"
    },
    "properties": {
        "data": {
            "name": "YOUR NAME HERE",
            "location": "YOUR CITY HERE",
            "twitter" : "YOUR TWITTER HANDLE HERE (optional)",
            "github" : "YOUR GITHUB HANDLE HERE (optional)",
            "facebook" : "YOUR FACEBOOK HANDLE HERE (optional)",
            "email" : "YOUR EMAIL ADDRESS HERE (optional)",
            "urls": [
                {
                    "name" : "TITLE HERE",
                    "url" : "http://"
                }
            ]
        },
        "description": "",
        "href": "",
        "id": "",
        "title": ""
    },
    "type": "Feature"
},
```

## Authors

* Tobias Preuss
* Knut Hühne
