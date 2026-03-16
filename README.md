## TL;DR

I created this app to learn basics of GraphQL and refresh my memory with Next.JS.

Next.js application that shows data about countries. App also includes mini-game where user guesses countries by their flags on selected continent.

### Used libraries

- GraphQL
- Leaflet
- Next.js
- React
- TailwindCSS

### Used API's and sources

- https://countries.trevorblades.com/ - Data about countries
- https://flagcdn.com/ - SVG flags

## Application

Application is available [HERE](https://nextjs-graphql-countries.vercel.app/)

If you want to run application locally run these steps:

### Prerequsities

- NodeJS: version 24+

### Installation

```bash
# Install dependencies
npm i

# Run project
npm run dev
```

## App Description

App includes navbar with basic navigation and generic SearchBar component for searching various countries.  
This component takes any dataset, you just specify keys by which the data are filtered and displayed in the results.  
Searchbar has also configurable debounce delay and itemCount which specified the amount of results after input.  
Searchbar also comes with keyboard navigation

- `arrows` to focus on specific result
- `enter` key for running action

**SearchBar usage example**

![alt text](image-1.png)

After selection the user is redirected to `/country/[code]`.  
Where code is code of a selected country.  
Other way of redirecting to this page is after clicking on specific country svg path on main page.

This page shows various data about selected country on the left panel.  
Because API that I used doesn't contain much data, the rest of the page is filled
with a map focused on selected country.  
Map is rendered via leaflet.

Another aspect of the app is a minigame accessed at the bottom of the main page.
There, the user can select continent whose countries flags they want to guess.

This selection is also build upon generic component. Just specify the dataset and keys.  
Further specification of datasets must be implemented on `game/[type]/[code]` page.  
This is a page where the user is redirected to after selection.

On this page user can select multiple options which changes how the game is played.  
Current options are

- **nextQuestionOnWrongAnswer** - if user answer is wrong, move to the next question.
- **removeOnWrongAnswer** - if the user answer is wrong remove the question from question pool.

After clicking on Start Game the game begins.
User can see the amount of answered questions and a timer that counts how fast can the user complete specific question set.  
Question is shown to the user (in our case the flag of a country).  
User guesses the right answer if it's wrong user gets penalization (add 1s to timer).  
If user answer is right he moves to the next question.  
Another step is based on game configuration.

After answering all the questions the final screen pops up.  
There user can see statistics like

- Number of wrong answers
- Number of right answers
- Completion time

Completion time is saved to localStorage and then shown at the main page below game selection.

**Game usage example**

![alt text](image-2.png)
