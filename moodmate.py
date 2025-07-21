import os
import random
from datetime import datetime

# Motivational quotes
quotes = [
    "Work on being in love with the person in the mirror who has been through so much but is still standing.",
    "Never regret anything from your past because one day, you'll look back and thank it for hurting you so much that you decided to become a stronger human being.",
    "Self love is finding true happiness.",
    "Put God first in all things and He will direct your path."
]

# Activity suggestions based on mood
activity_suggestions = {
    "sad": "try a walk in nature or writing 10 things you're grateful for.",
    "happy": "celebrate it! share your joy with family and friends.",
    "anxious": "pause and try breathing in and out. you've got this."
}

# --- Welcome and About ---
print("  😊 Welcome to MoodMate - Your Daily Mood & Habit Tracker \n")
print("""
🌱 About MoodMate Tracker 🌱

MoodMate was created as a simple tool to help you reflect daily,
track habits, and support your emotional well-being. By checking
in with yourself regularly, you take control of your growth journey —
one day at a time.

Version: 1.0
Created by: [Oluwapelumi Mary]
""")

# --- Show a random motivational quote ---
quote = random.choice(quotes)
print(f"💡 Motivational Quote: \"{quote}\"\n")

# --- Show past log entries if file exists ---
if os.path.exists("mood_log.txt"):
    print("\n📒 Your Past Mood Log Entries:")
    with open("mood_log.txt", "r") as f:
        logs = f.readlines()
        for line in logs[-5:]:
            print(line.strip())
    print("-" * 30)

# --- User Input Section ---
Name = input("What's your name? ").strip().capitalize()
Age = input("What's your age group? (teen/adult/senior): ").strip().lower()
Goal = input("What's one goal you have this week?: ").strip()
Reflect_time = input("When do you prefer to reflect? (morning/night/both): ").strip().lower()
Mood = input("How are you feeling today (happy, sad, tired, exhausted, excited, etc): ").strip().lower()
Sleeping = input("Did you sleep well last night? 😴 (yes/no): ").strip().lower() == "yes"
Eating = input("Do you like eating breakfast before drinking water, first? (yes/no): ").strip().lower() == "yes"
Exercise = input("Do you enjoy morning workout? (yes/no): ").strip().lower() == "yes"

# --- Calculate vibe score ---
score = sum([Sleeping, Eating, Exercise])

# --- Feedback ---
print("\n --- MoodMate Summary ---\n")
print(f"Hi {Name}, based on your check-in:")

if score == 3:
    vibe = "🎇 You're thriving today! Keep the energy going."
elif score == 2:
    vibe = "😃 You're feeling good, keep it up."
elif score == 1:
    vibe = "🏋️‍♀️ It's okay, you can start gym classes."
else:
    vibe = "Everyday is a chance to build on yourself."

if any(word in Mood for word in ["sad", "tired", "exhausted"]):
    vibe += " Maybe take a break, stretch or go outside for a few minutes."
elif any(word in Mood for word in ["happy", "excited"]):
    vibe += " Spread love everywhere around you - you're glowing!"

print(vibe)

# --- Activity suggestion ---
if Mood in activity_suggestions:
    print("🌸 Suggested activity:", activity_suggestions[Mood])

# --- Save to log ---
save = input("\nWould you like to save this entry to your mood log? (yes/no): ").strip().lower()
if save == "yes":
    # Save to mood_log.txt (detailed log)
    with open("mood_log.txt", "a") as file:
        file.write(f"{datetime.now()} | {Name} | age: {Age} | mood: {Mood} | sleep: {Sleeping} | eating: {Eating} | exercise: {Exercise} | score: {score} | goal: {Goal} | reflect: {Reflect_time}\n")
    print("Entry saved to mood_log.txt!")

    # Save to mood_history.txt (short summary)
    with open("mood_history.txt", "a") as file:
        file.write(f"{datetime.now()}: {Name} felt '{Mood}' | Score: {score}\n")

    # --- Mood Progress Encouragement Feature ---
    with open("mood_log.txt", "r") as f:
        logs = f.readlines()
        if len(logs) >= 2:
            prev_line = logs[-2]
            try:
                prev_score = int(prev_line.strip().split("score:")[-1].split("|")[0].strip())
                if score > prev_score:
                    print("Better than yesterday! Keep it up 🎇🎇")
                elif score == prev_score:
                    print("Same as last time, try a new activity today!")
                else:
                    print("Not your best day, but remember progress is not linear💕")
            except Exception:
                pass
        else:
            print("Keep tracking your mood to see your progress!")

# --- Weekly goal encouragement ---
print(f"\nThanks {Name}, MoodMate is here to support your weekly goal: {Goal}")

# --- Always print thank you message at the end ---
print("\n🔱 Thank you for using MoodMate. Come back again!\n")