from flask import Flask, jsonify
from flask_cors import CORS
import requests
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from twilio.rest import Client
import pytz

app = Flask(__name__)
CORS(app)

# -------------------- API Keys --------------------
RAPID_API_KEY = "1929a790d4msh5a14cab1d16a290p1d083fjsn17f5a6bc3337"

TWILIO_SID = "AC37e7f18aee731d0772f96466cd65c5d2"
TWILIO_AUTH = "159ac9596d7f35560f5872f333105ffb"
FROM_WHATSAPP = "whatsapp:+14155238886"

# Twilio client
client = Client(TWILIO_SID, TWILIO_AUTH)

# -------------------- User Store --------------------
# In production you’d use a DB
registered_users = [
    {
        "gstin": "27AAJCM9929L1ZM",
        "phone": "whatsapp:+916381307137",
        "state": "Maharashtra"
    }
]

# -------------------- Helper Functions --------------------

def get_gst_return_data(gstin):
    """Fetch GST data using RapidAPI"""
    url = f"https://gst-return-status.p.rapidapi.com/free/gstin/{gstin}"
    headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": "gst-return-status.p.rapidapi.com",
        "x-rapidapi-key": RAPID_API_KEY,
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()


def filing_frequency(filling_freq):
    """Detect monthly or quarterly filer"""
    return "Monthly" if any(v == "M" for v in filling_freq.values()) else "Quarterly"


def upcoming_due_dates(frequency, state, today=None):
    """Compute next GST due dates"""
    if today is None:
        today = datetime.now()

    if frequency == "Monthly":
        next_month = today.replace(day=1) + timedelta(days=32)
        gstr1 = datetime(next_month.year, next_month.month, 11)
        gstr3b = datetime(next_month.year, next_month.month, 20)
        return {"GSTR1": gstr1, "GSTR3B": gstr3b}

    else:
        q_end_months = [3, 6, 9, 12]
        months = sorted([m for m in q_end_months if m > today.month])
        if not months:
            next_q_month = 3
            year = today.year + 1
        else:
            next_q_month = months[0]
            year = today.year

        gstr1 = datetime(year, next_q_month + 1, 13)
        gstr3b_day = 22 if state in [
            "Maharashtra", "Gujarat", "Karnataka", "Goa", "Kerala",
            "Tamil Nadu", "Telangana", "Andhra Pradesh",
            "Chhattisgarh", "Madhya Pradesh"
        ] else 24
        gstr3b = datetime(year, next_q_month + 1, gstr3b_day)
        return {"GSTR1": gstr1, "GSTR3B": gstr3b}


def generate_reminders(due_dates):
    
    """Generate reminders 7, 3, 1 days before due"""
    advance_days = [7, 3, 1]
    today = datetime.now()
    reminders = {}
    for return_type, due_date in due_dates.items():
        reminders[return_type] = [
            (due_date - timedelta(days=d)).strftime("%Y-%m-%d")
            for d in advance_days if (due_date - timedelta(days=d)) > today
        ]
    return reminders



# -------------------- Twilio WhatsApp --------------------

def send_whatsapp_message(phone, gstin, return_type, due_date, days_left):
    body = (
        f"🧾 *GST Reminder*\n"
        f"GSTIN: {gstin}\nReturn: {return_type}\n"
        f"Due Date: {due_date.strftime('%d-%b-%Y')}\n"
        f"⏳ Only {days_left} day{'s' if days_left != 1 else ''} left!\n\n"
        f"நினைவூட்டல்: GSTIN {gstin} க்கான {return_type} தாக்கல் "
        f"{due_date.strftime('%d-%b-%Y')} அன்று முடிவடைகிறது.\n"
        f"{days_left} நாள்{'கள்' if days_left != 1 else ''} மட்டுமே உள்ளன!"
    )
    try:
        client.messages.create(from_=FROM_WHATSAPP, to=phone, body=body)
        print(f"✅ Reminder sent to {phone} for {gstin}")
    except Exception as e:
        print(f"❌ Failed to send reminder to {phone}: {e}")


# -------------------- Flask API --------------------

@app.route("/api/gst/<gstin>", methods=["GET"])
def gst_due_dates(gstin):
    try:
        data = get_gst_return_data(gstin)
        freq = filing_frequency(data["data"]["fillingFreq"])
        state = data["data"]["adr"]

        due_dates = upcoming_due_dates(freq, state)
        reminders = generate_reminders(due_dates)

        return jsonify({
            "gstin": gstin,
            "filingFrequency": freq,
            "dueDates": {k: v.strftime("%Y-%m-%d") for k, v in due_dates.items()},
            "reminders": reminders
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Reminder Scheduler --------------------

def send_daily_reminders():
    print("🔄 Checking and sending reminders...")
    india_tz = pytz.timezone("Asia/Kolkata")
    today = datetime.now(india_tz).strftime("%Y-%m-%d")

    for user in registered_users:
        try:
            data = get_gst_return_data(user["gstin"])
            freq = filing_frequency(data["data"]["fillingFreq"])
            state = state = data["data"].get("adr", "Maharashtra")


            due_dates = upcoming_due_dates(freq, state)
            reminders = generate_reminders(due_dates)

            for rtype, reminder_dates in reminders.items():
                if today in reminder_dates:
                    due = due_dates[rtype]
                    days_left = (due.date() - datetime.now(india_tz).date()).days
                    send_whatsapp_message(user["phone"], user["gstin"], rtype, due, days_left)
        except Exception as e:
            print(f"❌ Error for {user['gstin']}: {e}")


@app.route("/send-reminders-now", methods=["GET"])
def manual_trigger():
    send_daily_reminders()
    return jsonify({"status": "Manual reminder check complete"})


# -------------------- Start Scheduler --------------------
scheduler = BackgroundScheduler(timezone="Asia/Kolkata")
scheduler.add_job(send_daily_reminders, "interval", hours=24)
scheduler.start()


# -------------------- Run Server --------------------
if __name__ == "__main__":
    print("🚀 Flask GST + WhatsApp Reminder Server running on port 5000")
    app.run(host="0.0.0.0", port=5000, debug=True)

