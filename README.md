# SentiSquare Dashboard

A React + Vite SPA for extracting named entities via TextRazor.

## Features

- Upload a `.txt` file; each line is sent to TextRazor API
- Highlights entities in each sentence
- Displays entity-type frequency charts (bar, pie, radar)

## Getting Started

1. **Clone repo**

   ```bash
   git clone https://github.com/your-org/sentisquare-dashboard.git
   cd sentisquare-dashboard
   ```

2. **Fill your API key**

   - Create a file named `.env` in the project root
   - Add:
     ```env
     VITE_TEXTRAZOR_API_KEY=YOUR_FREE_API_KEY_HERE
     ```
   - You can sign up for a free key at [https://www.textrazor.com/](https://www.textrazor.com/)

3. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run in development**

   ```bash
   npm run dev
   ```

5. **Run tests** This project uses Jest for unit tests.

   ```bash
   npm run test
   ```

---


## License

MIT

