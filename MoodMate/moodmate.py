import datetime
# 1  Welcome the user
print("  😊 Welcome to MoodMate - Your Daily Mood & Habit Tracker \n")
# 2  Ask for name and mood
name = input("What's your name? ").strip().upper()
mood = input("How are you feeling today(happy, sad, tired, exhausted, excited, etc)").strip().lower()
# 3 Habit questions - using boolean
sleep = input(" Did you sleep well last night? 😴 (yes/no): ") == "yes"
eating = input(" Do you like eating breakfast before drinking water, first? (yes/no): ") == "yes"
excerise = input(" Do you enjoy morning walkout ? (yes/no) : " ) == "yes"
# 4 calculate vibe score
score = sum([sleep, eating, excerise]) #true is 1, false is 0
# 5 feedback
print("\n --- Moodmate Summary ---\n")
print(f"Hi {name}, based on your check-in:")
if score == 3:
    vibe = " 🎇 You're thriving today! keep the energy going" 
elif score ==2:
    vibe = "😃 You're feeling good,  keep it up"
elif score ==1:
    vibe= "🏋️‍♀️ It's okay, you can  start gym classes"
else:
    vibe = "Everyday is a chance to build on yourself "
# add extra advice based on mood
if any(word in mood for word in  ["sad", "tired", "exhausted"]):
    vibe += "maybe take a break, stretch or go outside for a few minutes."
elif any( word in mood for word in ["happy", "exited" ]):
    vibe+= " spread love everywhere around you, - you're glowing"
# ✨ print complete feedback
print(vibe)
# 6 optional file saving with timestamp
save = input("\nWould you  like to save this entry to your mood log? (yes/no):").strip().lower()
if save =="yes" :
    with open( "mood_log.txt", "a") as file:
        time_now = datetime.datetime.now()
        file.write(f"{time_now}| {name}| mood :{mood}| sleep:{sleep}|eating:{eating}| exercise:{excerise}| score:{score}\n")
print(" Entry saved to mood_log.txt!")
print("\n 🔱 Thank you for using Moodmate. come back again \n")