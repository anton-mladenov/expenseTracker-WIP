import { BackHandler, Alert } from "react-native"

const addAndroidBackListener = (callback) => {
    BackHandler.addEventListener("hardwareBackPress", () => {
        callback()
        return true
    })
}

const removeAndroidBackListener = (callback) => {
    BackHandler.removeEventListener('hardwareBackPress', () => {
        callback()
    })
}

const exitAlert = () => {
    BackHandler.exitApp()
    // Alert.alert(
    //     "Confirm Exit",
    //     "Do you want to quit the app?"
    //     [
    //         { text: "Cancel", onPress: () => null },
    //         { text: "OK", onPress: () => BackHandler.exitApp() }
    //     ]
    // )
}

export { addAndroidBackListener, removeAndroidBackListener, exitAlert }