describe("MicroEvent", function() {
	var micro_event;
	var event_funcs;

	beforeEach(function() {
		micro_event = new MicroEvent(); 

		event_funcs = {
			foo: function() {},
			bar: function() {},
			baz: function() {}
		};
		spyOn(event_funcs, 'foo');
		spyOn(event_funcs, 'bar');
		spyOn(event_funcs, 'baz');

	});

	it("binds a single function to an event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);
	});

	it("passes arguments to a bound function", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one', 1, 2);

		expect(event_funcs.foo).toHaveBeenCalledWith(1, 2);
	});

	it("binds several functions to one event", function() {
		micro_event.bind('event_one', event_funcs.foo);
		micro_event.bind('event_one', event_funcs.bar);
		micro_event.bind('event_one', event_funcs.baz);

		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);

		expect(event_funcs.bar).toHaveBeenCalled();
		expect(event_funcs.bar.calls.length).toEqual(1);

		expect(event_funcs.baz).toHaveBeenCalled();
		expect(event_funcs.baz.calls.length).toEqual(1);
	});

});

