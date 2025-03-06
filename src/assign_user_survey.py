import psycopg2
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

        # Step 1: Retrieve all text pairs (passage_ids) in order of passage_id
        cur.execute("SELECT id FROM passages ORDER BY id")
        passages = [row[0] for row in cur.fetchall()]
        
        # Step 2: Retrieve all survey sets (survey_set_ids) from the survey_sets table
        cur.execute("SELECT id FROM survey_sets ORDER BY id")
        survey_sets = [row[0] for row in cur.fetchall()]

        # Step 3: Determine the number of sets
        num_passages = len(passages)
        num_sets = len(survey_sets)  # Number of survey sets available

        # Step 4: Divide passages into sets of 20 (except the last ones)
        survey_set_passages = []
        passages_per_set = num_passages // num_sets  # Distribute passages as evenly as possible
        remaining_passages = num_passages % num_sets  # Handle remaining passages

        index = 0
        for set_id in range(1, num_sets + 1):
            num_pairs = passages_per_set + (1 if set_id <= remaining_passages else 0)  # Distribute leftover pairs
            passage_subset = passages[index:index + num_pairs]
            index += num_pairs

            for passage_id in passage_subset:
                survey_set_passages.append((set_id, passage_id))

        # Step 5: Insert the survey set and passage assignments into survey_set_passages
        cur.executemany(
            "INSERT INTO survey_set_passages (survey_set_id, passage_id) VALUES (%s, %s)",
            survey_set_passages
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