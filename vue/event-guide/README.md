# Company XYZ Frontend Challenge

## Challenge Description

Yeah, we are so excited to have you here for this little coding challenge. And before you start getting worried, it's not called a *challenge* because it's difficult. We call it a challenge because we want to challenge you to provide a solution that you feel proud of and reflect the way that you like to develop.

All we want to achieve with this coding challenge is to provide a basis for our conversation with you and get an idea of what the things are that you care about as an engineer and how you approach solving problems.

### Objective

Company XYZ developers create solutions to handle and present large amounts of event data. Our API provides various JSON endpoints to support data I/O, which our management system digests to provide a robust UI to our clients and internal production teams.

We would like you to write a small application that presents a UI for navigating the data returned by the two endpoints we'll provide you and meets the following requirements:

* it should present the content in an understandable manner that the end user can easily navigate.
* it uses the _*Sessions list*_ endpoint to source a list of session objects and the _*Session details*_ endpoint to acquire additional information about a session.
* it must be an SPA using your Javascript library of choice, or vanilla Javascript if you prefer.

### Endpoints

* Use whichever parameters you feel appropriate for your usecase.
* Both endpoints will require you use the following query parameter: `?api=XXXXX`
* You'll need to use `jsonp` to make the requests, due to CORS.

#### Sessions list

`https://staging-webservice.COMPANY-XYZ.com/v4/admin/events/frontendwebtestproduct/sessions`

Available query params:

* `page` (integer): page of results to fetch.
* `per_page` (integer): number of records per page, maximum 100.
* `search` (string): filter results where title contains this string.
* `from` (date ISO-8601): filter results to only include sessions starting at or after this time.
* `until` (date ISO-8601): filter results to only include sessions ending at or before this time.

#### Session details

`https://staging-webservice.COMPANY-XYZ.com/v4/admin/events/frontendwebtestproduct/sessions/{id}`

### Additional information

* Please complete your work in roughly 2 hours, ideally no more than 4. We don't expect a production-ready result, rather, we hope to see your use of time and priorities based on the provided outline and time limitations. Focus on code development over visual design is preferred. If time, and your expertise, permits, feel free to show us both! When you're finished, please send your code back for review.
* Please commit all work to this repo in a way that represents how you would work on a normal task.
* Please fill out the questions below when you've finished.

### Post-work Questions

1. What was the biggest challenge?
2. What would you have done differently in retrospect?
3. What would you have continued to do if you had more time?
4. Describe some of the primary decisions you made in your implementation.
5. Any specific skills related to frontend development that you didn't get to demonstrate here?

## Completed Example

A completed working example is not available due to the API key being expired.

### Answers to Post-work Questions

> 1. What was the biggest challenge?

Determining what features to build given the limited timeframe and data provided from the API. Given these limitations I wanted to demonstrates as useful a user experience as possible.

> 2. What would you have done differently in retrospect?

I arbitrarily set a date of "today" in the app of July 7, 2014 to demonstrate the use case for the date filter. July 7 seemed to be around the mid-point in the sessions returned from the API. However, when filtering for "today's sessions" I noticed that some were being displayed as July 6 or 8. I realized this was because the times were being converted to Pacific Time zone. For the sake of demonstration I displayed all dates and times as GMT 0. Really, I should be pulling from the API with 'from' and 'until' values adjusted to GMT 0, first.

I thought of maybe adding some sort of calendar functionality to enable users to search by date. I decided not to as this may not be an ideal UX decision as the event is only about 2 weeks long.

> 3. What would you have continued to do if you had more time?

  1. Add loading graphics or a "loading" message.
  2. More refined pagination.
  3. If there are no past sessions (ie. on the first day of the event), don't display the "Past Sessions" filter option.
  4. If the event is over, don't display the "Upcoming Sessions" filter option.
  5. Add more filter options. Maybe "Tomorrow's Sessions", "Friday Night Sessions", "This Weekend", etc.

> 4. Describe some of the primary decisions you made in your implementation.

I added a search function in case a user were to think, "What was that event called?? *Breakfast something?*" So this would help him/her find it easily.

I thought it would be useful to the user experience to filter sessions by date. This information was available in the sessions list API so I added functionality to filter sessions by "Today's Sessions", "Upcoming Sessions", and "Past Sessions".

Because display wasn't a primary concern for the purposes of this exercise I elected to display the sessions in a plain HTML table, which is a bit uninspiring. I think I personally would like to have seen things in a bit more fun/interactive arrangement like tiles. That's something I'd enjoy collaborating on with UI/UX designers.

> 5. Any specific skills related to frontend development that you didn't get to demonstrate here?

Working together with UX/UI designers, product managers, and backend developers to create with an optimized solution.
