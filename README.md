# MINDGUARD

## Description
The project aimed to develop a comprehensive Mental Health Monitoring and Control Application designed to provide users with tools to manage their mental health effectively. Addressing the rising need for accessible mental health services, the application features include mood tracking, sentiment analysis, and stress-relieving exercises. The methodology adopted a user-centric approach through Agile development practices, ensuring the application's design and functionality are closely aligned with user needs and preferences. 

This project is the frontend of the application designed using React Native to detect users' moods through text journaling, breathing exercises, meditation, track users' progress, and short activities.

## Features
- Mood detection through user text/journaling
- Guided breathing exercises
- Meditation sessions
- Short activities for mood enhancement
- Mood tracking and history
- Quick emergency dial

## Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

## Usage
The application won't be able to detect moods through journaling or track your mood because the backend server is not currently hosted, and encryption and decryption services from AWS KMS are not subscribed due to cost. Authentication works with Firebase, but since its API key is not provided, you will need to create a Firebase project and link it with this project to use the login and sign-up features. Once it is linked and the project is running, you can engage in guided breathing exercises, participate in meditation sessions, and perform short activities to enhance your mood.

## Demo video
The video of the fully functional application can be found at the following link:
Demo Link: https://drive.google.com/file/d/1osiFdP2HoOR9vpEY5JCRvBrLrOxHcMcL/view