describe("MicroEvent", function() {
	var micro_event;

	beforeEach(function() {
		micro_event = new MicroEvent(); 
	});

	it("can bind a single function to an event", function() {
		var event_funcs = {
			foo: function() { return }
		};

		spyOn(event_funcs, 'foo');

		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);
	});

});

