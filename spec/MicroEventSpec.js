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
	});

	it("can bind a single function to an event", function() {
		spyOn(event_funcs, 'foo');

		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one');

		expect(event_funcs.foo).toHaveBeenCalled();
		expect(event_funcs.foo.calls.length).toEqual(1);
	});

	it("can pass arguments to a bound function", function() {
		spyOn(event_funcs, 'foo');

		micro_event.bind('event_one', event_funcs.foo);
		micro_event.trigger('event_one', 1, 2);

		expect(event_funcs.foo).toHaveBeenCalledWith(1, 2);
	});

	it("can bind a several functions to one event", function() {
		spyOn(event_funcs, 'foo');
		spyOn(event_funcs, 'bar');
		spyOn(event_funcs, 'baz');

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

