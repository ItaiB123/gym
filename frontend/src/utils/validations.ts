export const validateLogin = (name: string, phone: string) => {
    let errors = []
    if (name.length === 0) {
        errors.push("Name is required");
    }
    if (phone.length !== 10) {
        errors.push("Phone number must be 10 digits");
    }
    if (name.length < 3) {
        errors.push("Name must be at least 3 characters");
    }
    if (!phone.startsWith("0")) {
        errors.push("Phone number must start with 0");
    }
    return errors;
}