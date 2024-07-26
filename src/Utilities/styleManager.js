const errorStyle = {
    borderColor: "red",
    backgroundColor: "#ffe6e6"
}

const okStyle = {
    borderColor: "#0ea5e9",
    backgroundColor: "#ffffff"
}

export const applyErrorStyles = (element) => {
    for (const property in errorStyle) {
        if (errorStyle.hasOwnProperty(property)) {
            element.style[property] = errorStyle[property];
        }
    }
}

export const applyOkStyles = (element) => {
    for (const property in okStyle) {
        if (okStyle.hasOwnProperty(property)) {
            element.style[property] = okStyle[property];
        }
    }
}