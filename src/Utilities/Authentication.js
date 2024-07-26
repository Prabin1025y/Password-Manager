import { toastError } from "./toast";

const Authentication = (data) => {
    if (!data.isAuthenticated && !data.error) {
        toastError("Please Login First!");
        return false;
    } else if (data.error) {
        toastError("Some Error Occurred. Please Log In");
        return false;
    } else
        return true;
}

export default Authentication;