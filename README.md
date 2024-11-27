# Profile Data App

This application allows users to create a comprehensive profile by filling out a form. The application integrates with the Gravatar API to fetch user information and displays it in a clean, modern profile card UI. If the Gravatar data is unavailable, the form input data is used instead.

## Features
- **Extensive Profile Form**: Collects user details including email, full name, username, phone number, location, website/social link, and bio.
- **Gravatar Integration**: Automatically fetches user details and profile image from Gravatar using the provided email address.
- **Dynamic Profile Card**: Displays profile details in a card-style UI with the following sections:
  - Profile Image: Gravatar image (if available) or a default placeholder.
  - Personal Details: Full Name, Username, and Location.
  - Contact Details: Email and Phone Number.
  - Bio: User's short description.
  - Website/Social Link: Clickable link to the user's website or profile.
- **Fallback Mechanism**: Uses user-provided data when Gravatar details are unavailable.

## Tech Stack
- **Frontend**: React.js with functional components and hooks.
- **Styling**: CSS (customizable via `ProfileForm.css`).
- **Gravatar Integration**: Gravatar API and MD5 hashing.
- **Package Management**: npm.

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16+ recommended)
- npm (v7+ recommended)

# Running the the app

git clone the repository or download it as a zip file then open in a editor

```bash
npm install
npm start
```

# Demo Video

Link - https://drive.google.com/file/d/1F5T-VhBTCO4HIcoH4YfADmk9yz1HlZNg/view?usp=sharing