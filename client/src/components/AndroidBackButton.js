import { BackHandler, Alert } from "react-native"

const addAndroidBackListener = (callback) => {
    BackHandler.addEventListener("hardwareBackPress", () => {
        console.log(" __ Android BackHandler Listener  ADDED")
        return callback()
    })
}

const removeAndroidBackListener = (callback) => {
    BackHandler.removeEventListener('hardwareBackPress', () => {
        console.log(" __ Android BackHandler Listener  REMOVED")
        return callback()
    })
}

const exitAlert = () => {
    Alert.alert(
        'Exit App',
        'Exiting the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
    // BackHandler.exitApp()
}

export { addAndroidBackListener, removeAndroidBackListener, exitAlert }