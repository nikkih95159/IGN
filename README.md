## Video Player Project
A video player web page that loads videos from the IGN API and contains stylized video controls. 

## View
https://nikkih95159.github.io/IGN/
**Note you have to turn on CORS to view the website

## Prerequisites

You need Node.js and npm installed on your computer. This project was built against the following versions:

- Node v12.6.0
- npm v6.9.0

## Get started

`cd` into the project directory <br />
`npm install` <br />
`npm start`

If the videos do not load, you may need to turn off CORS through a Google Extension to get the videos to load. I used the Google extension, Moesif CORS.

## Credit
To get started, I used this tutorial: https://freshman.tech/custom-html5-video/ <br />
Starter code: https://github.com/Freshman-tech/custom-htm5-video-starter-files

## Introduction
`IGN.pdf`

## Link's Quests
The main code is in `Scheduler.java`

## Answer to Link's Quests problem:
Optimal quests Link should take:
 - Link's Optimal Quests:
   - Robbie's Research, 1, 3, 750
   - Sunken Treasure, 5, 1, 200
   - Riddles of Hyrule, 7, 2, 1200
   - Rushroom Rush!, 9, 1, 460
   - Frog Catching, 10, 4, 900
   - Medicinal Molduga, 14, 4, 600
   - The Jewel Trade, 19, 2, 165
   - A Freezing Rod, 25, 4, 1120
   - The maximum amount of rupees Link can earn: 5395

I implemented this solution using the greedy scheduling algorithm. The algorithm sorts the array based on finish time order, and then greedily chooses the earliest finish time as long as the next start time doesn't overlap with the previous finish time and subsequently chooses the next quest based on the next earliest finish time. My solution would be successful with other quest boards if the other are the quest boards are in the same format: quests, start data, duration, and reward. My solution could be improved as I realized it would be nicer to read a board automatically instead of inputting it manually. It runs in O(n log n) time where n are Link's tasks. I believe my solution is efficient because sorting the quests based on finish time is more optimal than choosing quests based on reward or earliest start time as high rewards may have longer durations and an early start time does not guarentee a short quest.
