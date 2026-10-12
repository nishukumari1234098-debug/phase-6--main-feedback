let feedbackForm = document.getElementById("feedbackForm")
let names = document.getElementById("name")
let rate = document.getElementById("rate")
let comments = document.getElementById("comment")
let message = document.getElementById("message")
let feedbackContainer = document.getElementById("feedbackContainer")

feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    let studentName = names.value
    let rating = Number(rate.value)
    let comment = comments.value

    const studentForm = {
        studentName,
        rating,
        comment
    }

    const response = await fetch("/feedbacks", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(studentForm)
    })
    const data = await response.json()

    if (data.success) {
        message.textContent = "Feedback is submitted successfully!"
        getFeedbackData()
    } else {
        message.textContent = data.message
    }
})

async function getFeedbackData() {
    const response = await fetch("/feedbacks")
    const data = await response.json()

    feedbackContainer.innerHTML = ""

    data.data.forEach((element) => {
        const div = document.createElement("div")

        div.innerHTML = `
            <p>Name: ${element.studentName}</p>
            <p>Rating: ${element.rating}</p>
            <p>Comment: ${element.comment}</p>
            `
        feedbackContainer.appendChild(div)
    });
}

getFeedbackData()