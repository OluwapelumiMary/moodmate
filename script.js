function trackMood()  {
    const mood = document.getElementById('moodInput').value.toLowerCase();
    const responsebox = document.getElementById('response');

    let response = "";
    let advice = "";

    if (mood === "happy") {
        response = "That's great to hear! Keep spreading positivity!";
        advice = "Share your happiness with others and do something nice for someone.";
    } else if (mood === "sad") {
        response = "I'm sorry to hear that. It's okay to have ups and downs.";
        advice = "Consider talking to someone about how you feel. It can really help.";
    } else if (mood === "angry") {
        response = "It's normal to feel angry sometimes. Acknowledge your feelings.";
        advice = "Try to find a healthy outlet for your anger, like exercise or art.";
    } else if (mood === "anxious") {
        response = "Feeling anxious? You're not alone in this.";
        advice = "Take deep breaths, and try to focus on the present moment.";
    } else {
        response = "Thanks for sharing your mood. It's important to express how you feel.";
        advice = "Remember, it's okay to have a range of emotions.";
    }

    responsebox.innerHTML = `<p>${response}</p><p><em>${advice}</em></p>`;
}

document.getElementById('moodForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all form values
    const nameInput = document.getElementById('nameInput').value.trim();
    const name = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();
    const age = document.getElementById('ageInput').value;
    const goal = document.getElementById('goalInput').value.trim();
    const reflect = document.getElementById('reflectInput').value;
    const mood = document.getElementById('moodInput').value.trim().toLowerCase();
    const sleep = document.getElementById('sleepInput').value === "";
    const eating = document.getElementById('eatingInput').value === "";
    const exercise = document.getElementById('exerciseInput').value === "";

    // Motivational quotes
    const quotes = [
        "Work on being in love with the person in the mirror who has been through so much but is still standing.",
        "Never regret anything from your past because one day, you'll look back and thank it for hurting you so much that you decided to become a stronger human being.",
        "Self love is finding true happiness.",
        "Put God first in all things and He will direct your path."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // Activity suggestions
    const activity_suggestions = {
        "sad": "try a walk in nature or writing 10 things you're grateful for.",
        "happy": "celebrate it! share your joy with family and friends.",
        "anxious": "pause and try breathing in and out. you've got this."
    };

    // Calculate score
    const score = [sleep, eating, exercise].filter(Boolean).length;

    // Vibe feedback
    let vibe = "";
    if (score === 3) {
        vibe = "<span class='emoji'> 🎇 </span> You're thriving today! Keep the energy going.";
    } else if (score === 2) {
        vibe = "<span class='emoji'> 😃 </span> You're feeling good, keep it up.";
    } else if (score === 1) {
        vibe = "<span class='emoji'> 🏋️‍♀️ </span> It's okay, you can start gym classes.";
    } else {
        vibe = "Everyday is a chance to build on yourself.";
    }

    if (["sad", "tired", "exhausted"].some(word => mood.includes(word))) {
        vibe += " Maybe take a break, stretch or go outside for a few minutes.";
    } else if (["happy", "excited"].some(word => mood.includes(word))) {
        vibe += " Spread love everywhere around you - you're glowing!";
    }

    // Activity suggestion
    let activity = "";
    if (activity_suggestions[mood]) {
        activity = `<div style="margin-top:0.7em;"><span class="emoji"> 🌸</span>  <strong>Because you feel <span style="color:#eb6e25;">${mood}</span>:</strong> ${activity_suggestions[mood]}</div>`;
    }

    // Motivational quote
    let quoteBlock = `<div style="margin-top:0.7em; color:#eb6e25;"><em> <span class="emoji"> 💡 </span> Motivational Quote: "${quote}"</em></div>`;

    // Show summary first
    document.getElementById('response').innerHTML = `
        <h3>--- MoodMate Summary ---</h3>
        <p>Hi ${name}, based on your check-in:</p>
        <p>${vibe}</p>
        ${activity}
        ${quoteBlock}
    `;

    // Ask if user wants to save
    setTimeout(() => {
        if (window.confirm("Would you like to save this entry to your mood log?")) {
            // Save to localStorage (as browser can't write files)
            let logs = JSON.parse(localStorage.getItem('moodLogs') || "[]");
            const time_now = new Date().toLocaleString();
            logs.push({ time_now, name, age, goal, reflect, mood, sleep, eating, exercise, score });
            localStorage.setItem('moodLogs', JSON.stringify(logs));

            // Mood progress encouragement
            let encouragement = "";
            if (logs.length >= 2) {
                const prev = logs[logs.length - 2];
                if (score > prev.score) {
                    encouragement = "Better than yesterday! Keep it up <span class='emoji'> 🎇🎇 </span>";
                } else if (score === prev.score) {
                    encouragement = "Same as last time, try a new activity today!";
                } else {
                    encouragement = "Not your best day, but remember progress is not linear <span class ='emoji'> 💕 </span>";
                }
            } else {
                encouragement = "Keep tracking your mood to see your progress!";
            }

            document.getElementById('response').innerHTML += `
                <div style="color:green; margin-top:1em;">
                    <strong>Entry saved to your mood log!</strong><br>
                    <span>${time_now} | ${name} | age: ${age} | mood: ${mood} | sleep: ${sleep} | eating: ${eating} | exercise: ${exercise} | score: ${score} | goal: ${goal} | reflect: ${reflect}</span>
                </div>
                <div style="margin-top:0.7em; color:#388e3c;">${encouragement}</div>
            `;
        }
        // Weekly goal encouragement and thank you
        document.getElementById('response').innerHTML += `
            <div style="margin-top:1.5em; color:#4f8cff; font-weight:bold;">
                ${name}, MoodMate is here to support your weekly goal:  ${goal}. <br>
                <span class="emoji"> 🔱 </span> Thank you for using MoodMate. Come back again!
            </div>
        `;
    }, 100); // slight delay so summary shows before confirm
});

window.addEventListener('DOMContentLoaded', function() {
    const quotes = [
        "Work on being in love with the person in the mirror who has been through so much but is still standing.",
        "Never regret anything from your past because one day, you'll look back and thank it for hurting you so much that you decided to become a stronger human being.",
        "Self love is finding true happiness.",
        "Put God first in all things and He will direct your path."
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent= `💡 Motivational Quote: "${quote}"`;

    // Show past log entries if any
    let logs = JSON.parse(localStorage.getItem('moodLogs') || "[]");
    if (logs.length > 0) {
        let past = logs.slice(-5).map(log =>
            `<div style="font-size:0.95em; margin-bottom:0.3em;">
                ${log.time_now} | ${log.name} | mood: ${log.mood} | score: ${log.score}
            </div>`
        ).join('');
        document.getElementById('response').innerHTML = `
            <div style="margin-bottom:1em; background:#f6f8fc; border-radius:6px; padding:0.7em;">
                <strong>📒 Your Past Mood Log Entries:</strong><br>${past}
            </div>
        `;
    }
});