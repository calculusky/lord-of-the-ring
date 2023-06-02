## The Lord Of the Rings SDK

This is an SDK for the Lord of the Rings

## Installation

```shell
pnpm install lord-of-the-ring-sdk
#or
npm installlord-of-the-ring-sdk
#or
yarn add lord-of-the-ring-sdk
```

## Usage

First, obtain your Access token by Signing Up on the platform.

#### Examples

**CommonJS Usage**

Note: In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS, use require().default as seen below:

```js
const LordOfTheRings = require("lord-of-the-ring-sdk").default;
```

**ES8 Usage**

```ts
import LordOfTheRings from "lord-of-the-ring-sdk";

const lordOfTheRings = new LordOfTheRings({
    accessToken: "Your Access Token",
});

//Get List of Movies
const movies = await lordOfTheRings.getManyMovies({
    page: 1,
    limit: 5,
    sort: {
        runtimeInMinutes: "desc",
    },
    filter: {
        budgetInMillions: { $gt: 200 },
    },
});

//Get movie details
const movieDetail = await lordOfTheRings.getSingleMovie(
    "5cd95395de30eff6ebccde88"
);

//Get List of Quotes
const quotes = await lordOfTheRings.getManyQuotes({
    page: 2,
    limit: 5,
    offset: 3,
    sort: {
        dialog: "asc",
    },
});

//Get Single Quote Detail
const quoteDetails = await lordOfTheRings.getSingleQuote(
    "5cd95395de30eff6ebccde88"
);
```

**ES6 Usage**

```ts
//Get List of a Movie Quotes
lordOfTheRings
    .getQuotesByMovieId("5cd95395de30eff6ebccde88", {
        page: 3,
        limit: 5,
        offset: 10,
        sort: {
            dialog: "asc",
        },
    })
    .then((quote) => {
        console.log(quote);
    })
    .catch((err) => {
        console.log(err);
    });
```
