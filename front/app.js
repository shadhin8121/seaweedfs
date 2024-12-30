const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("http://localhost:4000/data", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text()) // Handle the response here
        .then((data) => {
            console.log(data); // Process the response data
        })
        .catch((error) => console.error("Error:", error));

    console.log(formData);
});
