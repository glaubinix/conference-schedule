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

	it("can bind a several functions to one event", function() {
		var event_funcs = {
			foo: function() {},
			bar: function() {},
			baz: function() {}
		};

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

