function ChangeNotify(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;

	this.view = new NotifyView(this.view_helper);
}

ChangeNotify.prototype.registerPlugin = function() {
	var self = this;

	var current = null;
	this.emitter.bind('schedule-data-ready', function(conference_data) {
		if (null === current || conference_data === current) {
			current = conference_data;
			return; // fetching data from local storage or no local storage
		}

		// compare talks -> Note: this might get really tricky
		var newTalks = self.prepareSchedule(JSON.parse(conference_data)),
			currentTalks = self.prepareSchedule(JSON.parse(current)),
			oldDiffs = [],
			newDiffs = [],
			i,
			talk;

		for (i in newTalks) {
			if (typeof currentTalks[i] === "undefined") {
				newDiffs.push(newTalks[i]);
			} else {
				delete newTalks[i];
				delete currentTalks[i];
			}
		}

		for (i in currentTalks) {
			oldDiffs.push(currentTalks[i]);
		}

		while (newDiffs.length > 0) {
			oldDiffs = self.calcDiff(newDiffs.pop(), oldDiffs);
		}

		while (oldDiffs.length > 0) {
			if (talk = oldDiffs.pop()) {
				self.view.removedTalk(talk);
			}
		}

		current = conference_data;
	});
};

ChangeNotify.prototype.prepareSchedule = function(rawData) {
	var talks = [],
		day,
		i,
		j,
		slot,
		talk,
		time;
	for (day in rawData) {
		for (i in rawData[day]) {
			slot = rawData[day][i];
			time = slot.time;
			for (j in slot.talks) {
				talk = slot.talks[j];
				talk.day = day;
				talk.time = time;

				talks[JSON.stringify(talk)] = talk;
			}
		}
	}

	return talks;
};

ChangeNotify.prototype.calcDiff = function(talk, talks) {
	if (0 === talks.length) {
		this.view.newTalk(talk);
		return [];
	}

	var i,
		compare;
	for (i in talks) {
		compare = talks[i];
		if (compare.speaker === talk.speaker
			&& compare.topic === talk.topic) {

			if (compare.description !== talk.description) {
				this.view.descriptionTalk(talk);
			}

			if (compare.day === talk.day
				&& compare.time.start === talk.time.start
				&& compare.time.end === talk.time.end
				&& compare.location !== talk.location) {
				this.view.locationMovedTalk(talk);
			} else if ((compare.day !== talk.day
				|| compare.time.start !== talk.time.start
				|| compare.time.end !== talk.time.end)
				&& compare.location === talk.location) {
				this.view.timeMovedTalk(talk);
			} else if (compare.day !== talk.day
				|| compare.time.start !== talk.time.start
				|| compare.time.end !== talk.time.end
				|| compare.location !== talk.location) {
				this.view.movedTalk(talk);
			}

			delete talks[i];
			return talks;
		}

		if (compare.day === talk.day
			&& compare.time.start === talk.time.start
			&& compare.time.end === talk.time.end
			&& compare.location === talk.location) {
			if (compare.speaker === talk.speaker
				&& compare.topic !== talk.topic) {
				delete talks[i];
				this.view.topicTalk(talk)
				return talks;
			} else if (compare.speaker !== talk.speaker
				&& compare.topic === talk.topic) {
				delete talks[i];
				this.view.speakerTalk(talk)
				return talks;
			}
		}
	}

	self.view.newTalk(talk);
	return talks;
};

function NotifyView(view_helper) {
	this.view_helper = view_helper;

	this.changeCounter = 0;
	this.element = document.createElement('div');
	this.element.setAttribute('class', 'change-notify');
	document.getElementsByTagName('body')[0].appendChild(this.element);
}

NotifyView.prototype.newTalk = function(talk) {
	this.addChange("New talk added to the schedule: " + talk.topic + " by " + talk.speaker + " at " + talk.day + " " + talk.time.start + " - " + talk.time.end);
};

NotifyView.prototype.removedTalk = function(talk) {
	this.addChange("Talk removed from schedule: " + talk.topic + " by " + talk.speaker + " at " + talk.day + " " + talk.time.start + " - " + talk.time.end);
};

NotifyView.prototype.locationMovedTalk = function(talk) {
	this.addChange("New location for talk: " + talk.topic + " by " + talk.speaker + " will now be in " + talk.location);
};

NotifyView.prototype.timeMovedTalk = function(talk) {
	this.addChange("New slot for talk: " + talk.topic + " by " + talk.speaker + " will now be at " + talk.day + " " + talk.time.start + " - " + talk.time.end);
};

NotifyView.prototype.movedTalk = function(talk) {
	this.addChange("New slot for talk: " + talk.topic + " by " + talk.speaker + " will now be at " + talk.day + " " + talk.time.start + " - " + talk.time.end + " in " + talk.location);
};

NotifyView.prototype.descriptionTalk = function(talk) {
	this.addChange("The Talk: " + talk.topic + " by " + talk.speaker + " got an updated description!")
};

NotifyView.prototype.topicTalk = function(talk) {
	this.addChange("Topic update for talk by " + talk.speaker + " at " + talk.day + " " + talk.time.start + " - " + talk.time.end)
};

NotifyView.prototype.speakerTalk = function(talk) {
	this.addChange("Speaker update for talk " + talk.topic + " at " + talk.day + " " + talk.time.start + " - " + talk.time.end)
};

NotifyView.prototype.addChange = function(change) {
	var div = document.createElement('div'),
		a = document.createElement('a');

	div.setAttribute('class', 'change-notify-entry');
	div.innerText = change;
	a.setAttribute('class', 'change-notify-close');
	a.id = "change" + (this.changeCounter++);
	a.innerText = 'X';
	a.href = "#";
	div.appendChild(a);
	this.element.appendChild(div);

	//this.element.innerHTML = this.element.innerHTML + '<div class="change-notify-entry">' + change + '<a id="' + changeId + '" class="change-notify-close" href=""#" >X</a></div>';
	var self = this;
	div.addEventListener('click', function(event) {
		self.element.removeChild(div);
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	}, false);
};
