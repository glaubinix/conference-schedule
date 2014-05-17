# List of Question / Discussion points

## Inject way
Currently I inject via one inject method. Does it make more sense to provide an inject method for each property e.g. requireConfig(config) and check for each require method if the plugin provides such a method?

## View changes
I am not a big fan of our view helper. Do we have a different way to build the view? Maybe use a small template engine?
We could then overwrite sub templates and maybe compile most of it already during the build process?

## Loader plugins
Loader plugins kind of overwrite one functionality of the entire tool. How should we inject the loader plugin into the application?
Alternative would be a loader object which we would inject into the plugin and the plugin can inject functionality into the loader object.

## Plugin dependencies
It might be possible that one plugin depends on another. I do not really feel like resolving dependencies. Especially not at run time.
