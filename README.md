# Challenge App

### Prerequisities

- Make sure that you have the latest version of `Xcode`, `Android Studio`, `nodeJS`, `cocoapods`, `TypeScript` installed.
- Make sure you have access to the internet as the data is received via an external source for realism. For a simple test, make sure that you can access https://6296455175c34f1f3b2cb120.mockapi.io/data url using your browser/postman. This is the only external api that is used to fetch the data. If this endpoint is not reachable, the app will not work.

### Installation

Please follow the steps bellow:

- `npm i --force`
- `cd ios && pod install & cd ..`
- Open the ios project in xcode and change the bundle identifier to something else, and from the signing section, select your account for code signing.
- `npx react-native run-ios --device` to install the app on IOS real device
- `npx react-native run-android` to install the app on Android real device (make sure that you don't have any proxy enable because some Gradle resources will not be accessible via proxy)
- If the bundler did not open automatically, use `npx react-native start` to start the bundler.
- `npm run web` to run the `React Native for Web` part. Access it via `http://localhost:8080/` (port may vary, check the console)

### Documentation

The `src` directory contains the actual source code:

`components`: Contains reusable components. For clean code, some elements have been extracted from the main files, modularity purposes.

`globals`: Contains the common styling, colors and images that are used throughout the project.

`navigation`: Contains the navigation logics. For now, a very simple stack navigation.

`screens`: Contains the screens of the app. For now, a single `OnboardingScreen` that implements the actual challenge.

`store`: My favorite section :) Contains Redux/RTK-Query logics. For now, a single `OnboardingSlice` handles the logic of fetching the data needed to render the challenge page.

### External libraries 

The only highlight can be `react-native-collapsible`, the rest of the packages can be found in most of the RN projects.

### The meaning of the data I used

Each category shows the area/topic in which some famous people released publication (scientific papers)
e.g. in category `Chemistry`, you will find the firstname of the researchers who published a paper in this area. There are more details available for each piece of publication, but we don't need them. I did a small modification to the data:
I added a boolean field called `selected` to keep track of the fact that if the user has already selected a person or not. So in my app, you can select people.

### Demo
You can find a demo here in my google drive: https://drive.google.com/file/d/1VuzcJfImaBOkutdbOb76b9ggzrCCs7lm/view?usp=sharing

I have run the app on Android real device, IOS real device, android browser. The reader is invited to run the app on a desktop browser with big screens. I tried to make it responsive in big screens as well.


