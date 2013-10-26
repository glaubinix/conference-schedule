[![Build Status](https://secure.travis-ci.org/glaubinix/conference-schedule.png?branch=master)](http://travis-ci.org/glaubinix/conference-schedule)

## Conference Schedule

### Launching the app
In order to view the schedule locally, you have to launch a local web server.
Under Linux with Python >= 2.4 available you can do so with:

```
cd /path/to/conference-schedule
python -m SimpleHTTPServer 8000
```

With PHP >= 5.4 you can do so with:

```
cd /path/to/conference-schedule
php -S localhost:8000
```

Using both Python and PHP you can now launch your favorite browser, go to http://localhost:8000 and see the currently configured schedule.

### Customization
To use this app for your own conference you need to change the following points:

* Create your own favicon and apple-touch-icon
* Adjust the config file (Always everything can be configured this way. Only new functionality needs to be added separately).
* Adjust the css to your liking (or simply use a theme)
* Create a schedule.json with the conference schedule
* If you add custom css / js file, make sure to add them to the conference.appcache file for offline mode (WIP)

### Features
* Load a schedule via json
* Plugin System
* Current date tab will be preselected (if not applicable the first day will be selected)
* Reminder/Start system to mark talks (to see them later or use it for whatever you think might be usefull) (WIP)
* Offline available using local storage and app cache (WIP)

### Plugin System
We started implementing an event based plugin system. The idea behind it is that one does not have to change the core to add new functionality (apart from a couple of event trigger).
If you would like to see some new functionality then simply create a plugin. The plugin needs to implement exactly one method "registerPlugin". To be able to use it, you have to add it to the plugin factory and afterwards it can be turned on via config file.

### Loading Google Spreadsheets
A lot of conferences I have seen so far use public spreadsheets to store their conference schedule which on the one hand is cool because you can access the data easily but on the other hand every spreadsheet looks a bit different and therefore needs to be parsed different.
This is the main reason why we do not provide any drop-in solution that works for every conference. But we do provide an abstraction layer.
Meaning: if you attend a conference or if you're a curator feel free to add your conversion script to this repository. Maybe someone else uses a similar structure and can therefore reuse your code. By default zou can find a script which supports spreadsheets which look like the ones from jsconf.eu.

### How Can I Contribute?
Fork and Pull Request, what else?
This project should stay as simple as possible. We would like to avoid having any dependencies likes jQuery or similar.
Though feel free to add some eye candy, like themes or other improvements.

### Tests
Thanks to @kitec we got some nice tests. To run them:
```
npm install -g grunt-cli
npm install
npm test
```
or open the SpecRunner.html in your browser after npm install

### Special thanks to ...
This project is highly inspired by the jsconf.eu 2013 offline schedule app by @philnash!
