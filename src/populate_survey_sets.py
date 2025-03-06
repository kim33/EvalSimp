import psycopg2
from psycopg2.extras import execute_values
import os
from dotenv import load_dotenv

# Load environment variables (optional)
load_dotenv()

# Database connection settings
DB_CONFIG = {
    "dbname": os.getenv("DB_NAME", "survey_db"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "postgres"),
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432"),
}

def create_survey_sets():
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # Fetch all passage IDs randomly
        cur.execute("SELECT id FROM passages ORDER BY RANDOM()")
        passage_ids = [row[0] for row in cur.fetchall()]

        # Divide into survey sets (20 passages each)
        batch_size = 20
        survey_sets = [passage_ids[i:i + batch_size] for i in range(0, len(passage_ids), batch_size)]

        print(f"Creating {len(survey_sets)} survey sets...")

        for idx, passages in enumerate(survey_sets, start=1):
            # Insert new survey set
            cur.execute("INSERT INTO survey_sets (name) VALUES (%s) RETURNING id", (f"Survey Set {idx}",))
            survey_set_id = cur.fetchone()[0]

            # Link 20 passages to this survey set
            execute_values(cur, 
                "INSERT INTO survey_set_passages (survey_set_id, passage_id) VALUES %s", 
                [(survey_set_id, passage_id) for passage_id in passages]
            )

        # Commit changes
        conn.commit()
        print("Survey sets populated successfully!")

    except Exception as e:
        print("Error:", e)
    finally:
        cur.close()
        conn.close()

# Run the script
if __name__ == "__main__":
    create_survey_sets()
