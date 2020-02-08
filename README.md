# serverless-password

A simple set of routes for securly storing and testing ad-hoc passwords:

## How to use

1. Go enter the password you want to use here: https://paassword.now.sh

2. Copy the URL given to you from step 1

3. Make a `POST` request to the URL you receive

```JavaScript
import fetch from "unfetch"

const response = await fetch("<YOUR_URL>", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pwd: 'your password attempt' })
})

if (response.ok) {
    const { valid } = await response.json()

    console.log(valid) // true || false
}
```

## Live example

You can run this in a modern browser console.

> be careful of CORS 😡

```JavaScript
async function validatePassword(pwd) {
    const response = await fetch("https://svrlss.now.sh/api/get/rec3T73O3WNZk3IZj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pwd }) /* the real password is dev.to */
    })

    if (response.ok) {
        const { valid } = await response.json()

        console.log(
            valid
                ? "You entered the correct password! 👏"
                : "The password you entered is incorrect. 😭"
        )
    }
}

validatePassword("test")
```
