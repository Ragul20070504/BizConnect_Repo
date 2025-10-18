from datetime import datetime, timedelta
from twilio.rest import Client
import time

# ---------------- Twilio Setup ----------------
account_sid = 'AC37e7f18aee731d0772f96466cd65c5d2'
auth_token = '159ac9596d7f35560f5872f333105ffb'
from_whatsapp_number = 'whatsapp:+14155238886'  # Twilio sandbox number
to_whatsapp_number = 'whatsapp:+916381307137'    # Recipient number

client = Client(account_sid, auth_token)

# ---------------- GST Dates Setup ----------------
# GST quarterly filing dates (13th Jan, Apr, Jul, Oct)
filing_dates = [
    (1, 13),   # Jan 13
    (4, 13),   # Apr 13
    (9, 16),   # Jul 13
    (10, 13)   # Oct 13
]

# Get GSTIN from user
gstin = input("Enter your GSTIN: ")

# Keep track of which dates we've already sent reminders today
sent_today = set()

# ---------------- Main Loop ----------------
while True:
    today = datetime.today()
    today_key = today.strftime("%Y-%m-%d")

    for month, day in filing_dates:
        filing_date = datetime(today.year, month, day)
        days_left = (filing_date - today).days

        # Check if we are within 10 days and haven't sent reminder today
        if 0 <= days_left <= 10 and (filing_date, today_key) not in sent_today:
            message_body = (
                f"Reminder: GST filing for GSTIN {gstin} is due on {filing_date.strftime('%d-%b-%Y')}.\n"
                f"Only {days_left} day{'s' if days_left != 1 else ''} left!"
            
    f"\n\nநினைவூட்டல்: GSTIN {gstin} க்கான GST தாக்கல் {filing_date.strftime('%d-%b-%Y')} அன்று முடிவடைகிறது.\n"
    f" {days_left} நாள்{'கள்' if days_left != 1 else ''} மட்டுமே  உள்ளன!"


            )

            try:
                client.messages.create(
                    body=message_body,
                    from_=from_whatsapp_number,
                    to=to_whatsapp_number
                )
                print("Reminder sent:", message_body)
                sent_today.add((filing_date, today_key))
            except Exception as e:
                print("Failed to send WhatsApp message:", e)

    # Wait 24 hours before checking again
    # (or you can adjust the sleep interval for testing)
    time.sleep(20)

