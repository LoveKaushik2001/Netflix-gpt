const checkValidateData = (email, password, name) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (name !== null && name?.length < 3) {
        return "Name must be at least 3 characters long";
    }

    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    if (passwordRegex.test(password)) {
        return "Password must be at least 8 characters long and contain at least one letter and one number";
    }

    return null;
}

export { checkValidateData };