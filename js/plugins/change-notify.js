function ChangeNotify(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

ChangeNotify.prototype.registerPlugin = function() {
	var self = this;
	// set up some sort of layer
	var element = document.createElement('div');
	element.setAttribute('class', 'change-notify');
	document.getElementsByTagName('body')[0].appendChild(element);

	var current = null;
	this.emitter.bind('schedule-data-ready', function(conference_data) {
		if (null === current || conference_data === current) {
			current = conference_data;
			return; // fetching data from local storage or no local storage
		}

		// compare talks -> Note: this might get really tricky
		var currentData = JSON.parse(current),
			newData = JSON.parse(conference_data);

		diff(currentData, newData, ["talk", "talks", "slot", "day", "schedule"]);

		// decide on output format
		element.innerHTML = "different";
		current = conference_data;
	});
};

var propertyLength = 0,
	propertyDiff = 1;

function objectKeys(obj) {
	if (typeof Object.keys === 'function') {
		return Object.keys(obj);
	}

	var keys = [];
	for (var key in obj) keys.push(key);
	return keys;
}

function diff(a, b, types) {
	types = JSON.parse(JSON.stringify(types))
	try {
		var type = types.pop(),
			ka = objectKeys(a),
			kb = objectKeys(b),
			key, i;
	} catch (e) {//happens when one is a string literal and the other isn't
		return; // this should never happen :)
	}

	// having the same number of owned properties (keys incorporates
	// hasOwnProperty)
	if (ka.length != kb.length)
		return notify(a, b, type, propertyLength);
	//the same set of keys (although not necessarily the same order),
	ka.sort();
	kb.sort();

	//equivalent values for every corresponding key, and
	//~~~possibly expensive deep test
	for (i = ka.length - 1; i >= 0; i--) {
		key = ka[i];
		if (typeof a[key] === 'object') {
			diff(a[key], b[key], types);
		} else if (a[key] != b[key]) {
			notify(a, b, type, propertyDiff);
		}
	}
}


// somehow
function notify(a, b, type, typeDiff) {
	if ('talks' === type) {
		if (propertyLength === typeDiff) {
			console.log("new talk added @todo figure out which one")
		} else {
			console.log("ignore, some sort of structure change")
		}
	} else if ('talk' === type) {
		if (propertyDiff === typeDiff) {
			console.log("existing talk was adjusted @todo figure out which one and check if maybe two where switched")
		} else {
			console.log("check what was done, maybe properties where added for empty talk")
		}
	}
	console.log(a, b, type, typeDiff)
}
