# SAT Vocabulary Flashcards

This is an interactive web application to help students learn the 1000 most common SAT words.

## Features

-   **Flashcards**: Learn words with definitions and examples.
-   **AI-Generated Examples**: Get new, unique example sentences using the Google Gemini API.
-   **Mini-Tests**: Test your knowledge after every 20 words.
-   **Mock Tests**: A larger test after every 50 words to reinforce learning.
-   **Summary**: Review all the words you answered incorrectly at the end.

## How to Run Locally

This project is built with Vite and React.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (version 18 or newer recommended)
-   npm (comes with Node.js)

### 1. Set Up Your API Key

The application uses the Google Gemini API to generate new example sentences.

1.  Rename the file `.env.example` to `.env`.
2.  Open the new `.env` file.
3.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4.  Replace `"YOUR_API_KEY_HERE"` with your actual API key.

```
VITE_API_KEY="your-real-api-key-goes-here"
```

### 2. Install Dependencies

Open your terminal in the project's root directory and run the following command to install all the necessary packages:

```bash
npm install
```

### 3. Start the Development Server

Once the installation is complete, run this command:

```bash
npm run dev
```

This will start the local development server. You can now open your web browser and go to the URL provided in the terminal (usually `http://localhost:5173`) to see your application running!
