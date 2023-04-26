const form = document.querySelector("#register-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  console.log(data.get("password"), data.get("confirmPassword"));

  if (data.get("password") !== data.get("confirm-password")) {
    return alert("Passwords do not match");
  }

  const fd = {
    username: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    country: data.get("country"),
    question: data.get("securityQuestion"),
    answer: data.get("securityAnswer"),
    photo: data.get("photo") ?? "",
  };

  axios.post("/api/auth/signup", fd).then((res) => {
    if (res.status === 201) {
      window.location.href = "/signin";
    }
  });
});
