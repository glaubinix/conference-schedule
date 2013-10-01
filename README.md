## Conference Schedule

### Usage
To use this app for your own conference you need to change the following points:

* Create your own favicon and apple-touch-icon
* Adjust the css to your liking (or simply use a theme)
* Create a schedule.json with the conference schedule
* If you add custom css / js file, make sure to add them to the conference.appcache file for offline mode

### Features
* Load a schedule via json
* Current date tab will be preselected (if not applicable the first day will be selected)
* Offline available using local storage and app cache

### Loading Google Spreadsheets
A lot of conferences I have seen so far use public spreadsheets to store their conference schedule which on the one hand is cool because you can access the data easily but on the other hand every spreadsheet looks a bit different and therefore needs to be parsed different.
This is the main reason why we do not provide any drop-in solution that works for every conference. But we do provide an abstraction layer.
Meaning: if you attend a conference or if you're a curator feel free to add your conversion script to this repository. Maybe someone else uses a similar structure and can therefore reuse your code. By default zou can find a script which supports spreadsheets which look like the ones from jsconf.eu.

### How Can I Contribute?
Fork and Pull Request, what else?
This project should stay as simple as possible. We would like to avoid having any dependencies likes jQuery or similar.
Though feel free to add some eye candy, like themes or other improvements.

### Special thanks to ...
This project is highly inspired by the jsconf.eu 2013 offline schedule app by @philnash!
