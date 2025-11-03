🛍️ FakeStore Mobile App

A React Native (0.82.1) mobile application built with modern libraries and architecture patterns.
This app demonstrates advanced usage of React Navigation, Zustand, React Query, NativeWind, and Reanimated, optimized for performance and scalability.

## Features And Process

- [x] Auth (login and signUp)
- [x] Product List and Detail
- [x] User Profile with Edit
- [x] Create, Update and Delete Product
- [ ] Cart List
- [ ] Unit Testing and E2E Testing
- [ ] CI/CD

> Currently, Android CI for release app is add with github action

## ⚙️ Setup

### Start your backend server

- Before starting our application, please clone the backend server from **https://github.com/minkgkyaw9899/fake-store-server** and follow instruction
- Read **README** file for more detail.

```bash
npm install

npm start
```

You should see something like:

```
Server running on http://localhost:8000 || http://192.168.x.x:8000
```

> 💡 Use the **local IP** for testing from a React Native app on your phone.

### Install dependencies

```bash
npm install
```

### For IOS

```bash
bundle install
cd ios
bundle exec pod install --repo-update
```

### Modify Env Configuration

```bash
cp .env.example .env
```

> 💡 Open .env file and modify **API_BASE_URL** with your local ip address eg- http://192.168.100.12:8000/api

### Start the metro server

```bash
npm start

# run ios app
npm run ios

# run android
npm run android
```

---
