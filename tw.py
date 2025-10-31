from datetime import datetime, timedelta
from twilio.rest import Client
import time

# ---------------- Twilio Setup ----------------
account_sid = 'AC93866fe45ffa0f50c05763d7fc239547'
auth_token = '8c1325916de498123e74d00babd163ab'
from_whatsapp_number = 'whatsapp:+14155238886'  # Twilio sandbox number
to_whatsapp_number = 'whatsapp:+919842267155'   # Recipient number

client = Client(account_sid, auth_token)

# ---------------- GST Dates Setup ----------------
# GST quarterly filing dates (13th Jan, Apr, Jul, Oct)
filing_dates = [
    (1, 13),   # Jan 13
    (4, 13),   # Apr 13
    (7, 13),   # Jul 13
    (10, 13)   # Oct 13
]

gstin = input("Enter your GSTIN: ")

# ---------------- Main Loop ----------------
while True:
    today = datetime.today()

    for month, day in filing_dates:
        filing_date = datetime(today.year, month, day)
        days_left = (filing_date - today).days

        if 0 <= days_left <= 10:
            message_body = (
                f"🔔 Reminder: GST filing for GSTIN {gstin} is due on {filing_date.strftime('%d-%b-%Y')}.\n"
                f"Only {days_left} day{'s' if days_left != 1 else ''} left!"
                f"\n\n📅 நினைவூட்டல்: GSTIN {gstin} க்கான GST தாக்கல் {filing_date.strftime('%d-%b-%Y')} அன்று முடிவடைகிறது.\n"
                f"⏳ {days_left} நாள்{'கள்' if days_left != 1 else ''} மட்டுமே உள்ளன!"
            )

            try:
                client.messages.create(
                    body=message_body,
                    from_=from_whatsapp_number,
                    to=to_whatsapp_number
                )
                print(f"✅ Reminder sent at {datetime.now().strftime('%H:%M:%S')}")
            except Exception as e:
                print("❌ Failed to send WhatsApp message:", e)

    # Wait 2 minutes (120 seconds) before sending the next message
    time.sleep(120)

