---
title: The "C" in MVC
layout: default 
---

# The "C" in MVC

The big thing today was understanding routes, controllers and sessions. We use a session to track who is logged into our application. It has no model, but rails gives us a special hash called session that persists for the span of a browser use session. We randomly generate a session token and save it into the users table, and we reset this every time we create a session. We save the session token into the session hash so that we can find the user across all controllers, And we destroy it on logout.

In our routes file, we use the resources method and pass in a table name as a symbol. This will create 7 routes using each of the 4 http methods.

An http request-response life cycle begins with the request issued by the client. This request contains the http method and a path. The router takes this request and matches it with the methods and paths that it has and finds the corresponding controller and method. It then instantiates an instance of that controller class and calls the action/method. In that controller method, we can do a number of things, but there is a good practice, following rest. Some of these requests contain URL parameters, like ones corresponding to show or edit because we need a specific resource to show. This Id can be accessed with the params method in the controller. When we are posting (creating) or putting (updating) a resource, we generally will have a form, each input field corresponding to an attribute we wish to define. We can access these parameters in the controller using the params method as well.

We can then use a model class method to create or update a resource, passing in these attributes via params. In these cases, we usually have a condition where after we create a new model object, we save it, and if it saves we redirect to a view that shows the resource, else we add an error to that resource, and we can render this error on a view that we redirect to on save failure.

These. Views that we are rendering are the bodies of each http response. We can set instance variables in our controllers to then have them rendered in our views - it’s kind if a wonky thing, but its the rails way (global variables instead? Maybe too dangerous? Idk).

Ill revisit sessions/authentication in the morning (hopefully). Cheers!