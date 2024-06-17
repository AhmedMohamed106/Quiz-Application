document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit-btn").addEventListener("click", validation);
});

const setError = (ele, msg) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = msg;
        box.classList.add("error");
        box.classList.remove("success");
    }
};

const setSuccess = (ele) => {
    if (ele && ele.parentElement) {
        let box = ele.parentElement;
        let error = box.querySelector(".error");
        error.innerText = "";
        box.classList.add("success");
        box.classList.remove("error");
    }
};
function userFormat(u) {
    const re = /[^0-9]/;
    return re.test(u);
}
const mailFormat = (e) => {
    const re = /\w+@\w+\.\w+/;
    return re.test(String(e).toLowerCase());
};

const passFormat = (p) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return re.test(p);
};

function validation() {
    let user = document.getElementById("username").value.trim();
    let mail = document.getElementById("useremail").value.trim();
    let pass1 = document.getElementById("userpassword").value.trim();
    let pass2 = document.getElementById("Confirmpassword").value.trim();

    setSuccess(document.getElementById("username"));
    setSuccess(document.getElementById("useremail"));
    setSuccess(document.getElementById("userpassword"));
    setSuccess(document.getElementById("Confirmpassword"));

    if (user === "") {
        setError(document.getElementById("username"), "Username is required");
    } else if (!userFormat(user)) {
        setError(document.getElementById("username"), "Digits are not allowed in the username");
    }

    if (mail === "") {
        setError(document.getElementById("useremail"), "Email is required");
    } else if (!mailFormat(mail)) {
        setError(document.getElementById("useremail"), "Please enter a valid email");
    }

    if (pass1 === "") {
        setError(document.getElementById("userpassword"), "Password is required");
    } else if (!passFormat(pass1)) {
        setError(document.getElementById("userpassword"), "Password must meet the criteria");
    }

    if (pass2 === "") {
        setError(document.getElementById("Confirmpassword"), "Please confirm your password");
    } else if (pass2 !== pass1) {
        setError(document.getElementById("Confirmpassword"), "Passwords don't match");
    } else if (!passFormat(pass2)) {
        setError(document.getElementById("Confirmpassword"), "Password must meet the criteria");
    }
   
}  

   
    
