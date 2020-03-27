## Video Player Project
A video player web page that loads videos from the IGN API and contains stylized video controls. 

## Prerequisites

You need Node.js and npm installed on your computer. This project was built against the following versions:

- Node v12.6.0
- npm v6.9.0

## Get started

`cd` into the project directory
`npm install`
`npm start`

If the videos do not load, you may need to turn off CORS through a Google Extension to get the videos to load. I used the Google extension, Moesif CORS.

## Credit
To get started, I used this tutorial: https://freshman.tech/custom-html5-video/
Starter code: https://github.com/Freshman-tech/custom-htm5-video-starter-files

## Link's Quests
The main code is in `Scheudler.java`.

## Answer to Link's Quests problem:
I implemented this solution using the greedy scheduling algorithm. The algorithm sorts the array based on finish time order, and then greedily chooses the earliest finish time as long as the next start time doesn't overlap with the previous finish time and subsequently chooses the next quest based on the next earliest finish time. My solution would be successful with other quest boards if the other are the quest boards are in the same format: quests, start data, duration, and reward. My solution could be improved as I realized it would be nicer to read a board automatically instead of inputting it manually. It runs in O(n log n) time where n are Link's tasks. I believe my solution is efficient because sorting the quests based on finish time is more optimal than choosing quests based on reward or earliest start time as high rewards may have longer durations and an early start time does not guarentee a short quest.
