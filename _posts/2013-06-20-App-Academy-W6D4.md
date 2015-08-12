---
title: AJAX
layout: default
---

# AJAX
We had our first go at Ajax today. If you pass an option to your form and set remote to true, this tells the form to make a request asynchronously and behind the scenes. We can then use jQuery to listen for this request and handle the response. This enables us to update a view without refreshing the entire page, which is pretty sexy. 

We also had our first experience with underscore’s templating technology. We solved the problem of the client not having access to our database by doing something called bootstrapping. With this technique, we write a script tag (that won’t be rendered, due to setting ambiguous type attribute) and render Json within it so that our “views” have access to data pulled from the db. We can also load up a template built with JavaScript, grab its contents with jQuery, and pass it to a templataing method provided by underscore, where we can also pass our resources (parsed from JSON). More on Friday!