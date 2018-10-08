import { AsyncStorage } from "react-native"


// the default URL of the server
export const baseUrl = "http://192.168.1.67:4000/graphql"

// storageKey
export const storageKey = "mobileDeviceSuperSecretStorageKeyDamn"

export const setStorageFunc = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item)
        return "Successfully set item in AsyncStorage!"
    } catch (error) {
        throw new Error("Can't set item in the AsyncStorage for some reason, read more: ", error)
    }
}

export const getStorageFunc = async (key) => {
    try {
        const item = AsyncStorage.getItem(key)
        if (item) {
            return item
        } else {
            return "Couldn't find item in AsyncStorage based on the key given ... #SAD"
        }
    } catch (error) {
        throw new Error("Can't get item from the AsyncStorage for some reason, read more: ", error)
    }
}

