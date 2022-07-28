This is a tech test involving the below:

- Display a list of 5 random cats from the API https://cataas.com/
- Allow refreshing the cats
- Allow the user to favourite a cat and view a list of favourites
- Store the favourited cats in local storage

I have developed this using NextJS and Typescript. I have split out the code into relevant folders:

- `/components/*` - General components used to render things
- `/context/*` - Global / sharable state
- `/hooks/*` - Reusable functions with state
- `/pages/*` - The pages for the app
- `/assets/*` - The assets inside of the app e.g. animations

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
