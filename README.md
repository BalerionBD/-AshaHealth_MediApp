# Asha Health: AI-Powered Symptom Checker

Asha Health is a web application designed to serve as a personal AI health assistant. It empowers users to input their health symptoms and receive an initial analysis, educational guidance, and an assessment of urgency. The app leverages the power of Google's Gemini AI to provide intelligent, helpful, and easy-to-understand health information.

**Disclaimer:** This application is for informational purposes only and does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## ✨ Features

- **AI-Powered Symptom Analysis**: Enter your symptoms in natural language, and the AI provides a concise summary.
- **Voice-to-Text Input**: Use the microphone to dictate your symptoms for a hands-free experience.
- **Multi-Language Support**: Input symptoms in various languages, including Hindi, Bengali, Tamil, and more.
- **Urgency Assessment**: The AI triages the described symptoms into three urgency levels (Low, Medium, High) and provides a reason for its assessment.
- **Educational Guidance**: Receive information about possible causes, home-care tips, and "red flag" signs that indicate when to see a doctor.
- **Symptom Progression Flowchart**: A dynamic, AI-generated flowchart (using Mermaid.js) visually represents the potential progression of symptoms.
- **Downloadable PDF Report**: Users can download a comprehensive PDF of their health analysis to share or keep for their records.
- **User Authentication**: A simple login and registration system to manage user sessions.

## 🚀 Tech Stack

This project is built on a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/Generative**: [Google AI (Gemini)](https://ai.google/discover/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: Configured for [Netlify](https://www.netlify.com/)

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- `npm`, `yarn`, or `pnpm`
- A **Google AI API Key**. You can obtain one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

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
    Create a file named `.env` in the root of your project and add your Google AI API key:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🧪 How to Use and Test the Application

You can test the application's functionality by following these steps:

1.  **Navigate to the Home Page**: This is where the Symptom Checker is located.

2.  **Enter Symptoms**:
    - **Test Case 1 (Simple):** Type `"I have had a slight headache and a runny nose for two days."` and click "Analyze Symptoms".
    - **Test Case 2 (Complex):** Type `"For the past week, I've had a sharp, stabbing pain in my right side, accompanied by a fever that comes and goes. I also feel very tired and have no appetite."` and click "Analyze Symptoms".
    - **Test Case 3 (Voice):** Click the microphone icon and speak your symptoms. Ensure the text appears correctly in the text area.

3.  **Review the Analysis**:
    - Check the **Urgency Display**. Does the color (Green, Yellow, Red) and reasoning seem appropriate for the symptoms?
    - Read the **Symptom Summary**. Is it an accurate and concise summary of what you entered?
    - Expand the **Educational Guidance** accordions. Are the possible causes, home care tips, and red flags relevant?
    - View the **Symptom Progression Flowchart**. Does it render correctly and provide a logical visual path?

4.  **Download Report**:
    - Click the "Download Report" button. A PDF file containing the full analysis should be generated and downloaded. Open it to verify its contents.

5.  **Test Authentication**:
    - Click "Register" in the header, create an account, and verify that you are logged in.
    - Log out from the user dropdown menu.
    - Click "Log In" and sign in with the credentials you just created.
