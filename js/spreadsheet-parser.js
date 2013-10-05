function SpreadsheetParser () {

}

/**
 * @see http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
 */
SpreadsheetParser.prototype.convertCsvToJson = function(csv_data, callback) {
	var str_delimiter = ",";

	// Create a regular expression to parse the CSV values.
	var objPattern = new RegExp(
		(
			// Delimiters.
			"(\\" + str_delimiter + "|\\r?\\n|\\r|^)" +
				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
				// Standard fields.
				"([^\"\\" + str_delimiter + "\\r\\n]*))"
			),
		"gi"
	);

	// Create an array to hold our data. Give the array
	// a default empty first row.
	var arr_data = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	var arr_matches = null;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arr_matches = objPattern.exec(csv_data)) {
		// Get the delimiter that was found.
		var str_matched_delimiter = arr_matches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (str_matched_delimiter.length &&	(str_matched_delimiter != str_delimiter)) {
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arr_data.push( [] );
		}

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arr_matches[ 2 ]){
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			var str_matched_value = arr_matches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
			);
		} else {
			// We found a non-quoted value.
			var str_matched_value = arr_matches[ 3 ];

		}

		// Now that we have our value string, let's add
		// it to the data array.
		arr_data[ arr_data.length - 1 ].push( str_matched_value );
	}

	callback( arr_data );
};

function JsconfLikeSpreadsheetParser() {

};

JsconfLikeSpreadsheetParser.prototype = new SpreadsheetParser();
JsconfLikeSpreadsheetParser.prototype.constructor = JsconfLikeSpreadsheetParser;

JsconfLikeSpreadsheetParser.prototype.buildSchedule = function(json_array, callback) {
	var schedule = {};

	var day;
	var day_identifier;
	var slot;

	var locations = [
		json_array[0][3],
		json_array[0][10]
	];

	for (var i in json_array) {
		var row_data = json_array[i];

		if (row_data[0].indexOf('Day') !== -1) {
			if (typeof day !== 'undefined') {
				schedule[day_identifier] = day;
			}

			day_identifier = row_data[0].replace(/([\r\n])/, "").replace(/(\s)/, "");
			day = [];
		}

		// maybe we have a new time slot
		var matches = row_data[0].match(/([0-9]+).([0-9]+)/);
		if (null != matches) {
			if (isNaN(row_data[1]) || row_data[1].length == 0) {
				var end_string = 'Open End';
			} else {
				var end = matches[1] * 60 + parseInt(matches[2]) + parseInt(row_data[1]);
				var end_string = Math.floor(end / 60).toString() + ':' + ((end % 60).toString() == 0 ? '00' : (end % 60).toString());
			}

			slot = {
				time: {
					start: matches[1] + ':' + matches[2],
					end: end_string
				},
				talks: []
			};

			if (row_data[5] == '') {
				slot.talks.push({
					speaker: 'all',
					topic:  row_data[4],
					location: locations[0]
				});
			} else {
				slot.talks.push({
					speaker: row_data[4],
					topic:  row_data[5],
					location: locations[0]
				});
			}

			// There are two talks
			if (row_data[0] === row_data[7] && row_data[7] !== '' && row_data[12] !== '') {
				slot.talks.push({
					speaker: row_data[11],
					topic:  row_data[12],
					location: locations[1]
				});
			}
		}

		if (typeof slot != 'undefined') {
			day.push(slot);
		}

		slot = undefined;

	}

	callback(schedule);
};
