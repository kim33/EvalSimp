import psycopg2

# Database connection details
DB_NAME = "survey_db"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"  # Change if hosted remotely
DB_PORT = "5432"  # Default PostgreSQL port

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)
cursor = conn.cursor()

# Populate survey_set_passages table with 10 passages per survey set
try:
    # Fetch all survey set IDs
    cursor.execute("SELECT id FROM survey_sets;")
    survey_set_ids = cursor.fetchall()

    # Fetch all passage IDs in order
    cursor.execute("SELECT id FROM passages ORDER BY id;")
    passage_ids = cursor.fetchall()

    # Initialize variables
    passage_index = 0  # To keep track of which passage we're at
    num_passages = len(passage_ids)

    # Loop over each survey set
    for survey_set_id in survey_set_ids:
        survey_set_id = survey_set_id[0]  # Get the actual ID from the tuple

        # For each survey set, assign 10 passages (if there are enough passages left)
        for _ in range(10):
            if passage_index >= num_passages:
                break  # Exit if we have run out of passages

            passage_id = passage_ids[passage_index][0]  # Get passage ID

            # Insert the mapping into survey_set_passages table
            cursor.execute("""
                INSERT INTO survey_set_passages (survey_set_id, passage_id)
                VALUES (%s, %s);
            """, (survey_set_id, passage_id))

            passage_index += 1  # Move to the next passage

    # Commit changes
    conn.commit()
    print("Survey sets and passages mapped successfully.")

except Exception as e:
    print("Error inserting data:", e)
    conn.rollback()

finally:
    cursor.close()
    conn.close()
