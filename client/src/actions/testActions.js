export const TEST = "TEST"

export const sendTest = () => {
    return ({
        type: TEST,
        payload: ["Testing", " the",  " motherfucker!"]
    })
}