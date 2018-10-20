import { AsyncStorage } from "react-native"
import base64 from "react-native-base64"


// the default URL of the server
export const baseUrl = "http://192.168.1.74:4000/graphql"


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
        const item = await AsyncStorage.getItem(key)
        if (item) {
            return item
        } else {
            return "Couldn't find item in AsyncStorage based on the key given ... #SAD"
        }
    } catch (error) {
        throw new Error("Can't get item from the AsyncStorage for some reason, read more: ", error)
    }
}


// Sending JWT to Current User Reducer

export const getJWT = async () => {
    try {
        const jwt = await getStorageFunc(storageKey)

        if (jwt) {
            console.log("SECOND: ", jwt)
            return jwt
        }
    } catch (error) {
        console.log("There was error getting the JWT token from the AsyncStorage ", error)
    }
}

// JWT DECODING - NEED EXPIRATION DATE ONLY

function decode(jwt) {
    const [headerB64, payloadB64] = jwt.split('.');
    // These supports parsing the URL safe variant of Base64 as well.
    const headerStr = new Buffer(headerB64, 'base64').toString();
    const payloadStr = new Buffer(payloadB64, 'base64').toString();
    return {
        header: JSON.parse(headerStr),
        payload: JSON.parse(payloadStr)
    };
}

export const jwtDecodeToExpDate = (jwt) => { // this function returns TRUE if token has expired and FALSE it if is still valid
    const [_, payload] = jwt.split(".")
    const replacedPayload = payload.replace('-', '+').replace('_', '/')
    const payloadString = base64.decode(replacedPayload)
    const payloadStrParsed = JSON.parse(JSON.stringify(payloadString))
    const trueOrFalse = payloadStrParsed.exp < (Date.now() / 1000) ? true : false
    return trueOrFalse
}

// convert strings to integers
export const stringToInt = (data) => {
    if (typeof data === "object") {
        const newData = data.map((item) => {
            if (item.id && typeof item.id === "string") {
                const id = parseInt(item.id, 10)
                item.id = id
            }
            if (item.amount && typeof item.amount === "string") {
                const amount = parseInt(item.amount, 10)
                item.amount = amount
            }
            return item
        })
        return newData
    }
    return data
}

