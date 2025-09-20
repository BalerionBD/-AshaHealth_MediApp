# Asha Health: AI-Powered Symptom Checker

Asha Health is an intelligent, multilingual health application designed to provide preliminary health analysis based on user-described symptoms. It serves as a first point of contact, offering educational guidance and an urgency assessment to help users decide on the next steps for their health concerns.

## ✨ Core Features

- **AI-Powered Symptom Analysis**: Utilizes cutting-edge generative AI to summarize symptoms, provide educational guidance, assess urgency, and generate a visual flowchart of potential symptom progression.
- **Secure User Authentication**: Features a complete user authentication system with registration, login, and a secure "Forgot Password" flow.
- **Personalized Experience**: Registered users are greeted by name, creating a more welcoming user journey.
- **Multilingual Support**: Includes support for English and all major Indian languages to ensure broad accessibility.
- **Voice Input**: Allows users to describe their symptoms using speech-to-text, making it accessible for users with low literacy or those who prefer voice commands.
- **Downloadable Health Reports**: Users can download a comprehensive PDF summary of their health analysis to share with healthcare providers.
- **Robust Error Handling**: The application is designed to be resilient, gracefully handling potential API failures without crashing.
- **Symptom History**: A placeholder feature allows for future implementation of symptom logging and tracking over time.
- **Responsive Design**: Built with a mobile-first approach to ensure a seamless experience on any device.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Gemini API key. You can obtain a key from [Google AI Studio](https://aistudio.google.com/).
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    This command starts the Next.js application.
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the app.

5.  **Run the Genkit Developer UI (Optional):**
    To inspect and test the AI flows, run the Genkit developer UI in a separate terminal.
    ```bash
    npm run genkit:dev
    ```
    Open [http://localhost:4000](http://localhost:4000) to access the Genkit UI.

## 🧪 Sample Test Cases

You can use the following symptom descriptions to test the AI's analysis capabilities:

- **Possible Migraine:**
  > "I have a throbbing headache on one side of my head, and I feel nauseous and sensitive to light. The pain gets worse when I move around."

- **Common Cold:**
  > "For the last two days, I've had a runny nose, a sore throat, and I've been sneezing a lot. I don't have a fever, but I feel a bit tired."

- **Possible Flu/COVID-19:**
  > "I suddenly started feeling very sick with a high fever, a dry cough, and intense body aches. I'm extremely tired and it feels hard to breathe sometimes."

- **Allergic Reaction:**
  > "After eating peanuts, my lips started swelling, and I developed an itchy rash all over my body. I'm also feeling a bit dizzy."
