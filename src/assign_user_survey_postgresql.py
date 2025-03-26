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

# Insert user IDs and assign them to survey sets
try:
    insert_query = "INSERT INTO user_assignments (user_id, survey_set_id) VALUES (%s, %s);"
    
    for i in range(1, 304, 3):  # Assign 3 users per survey set
        survey_set_id = (i // 3) + 1
        cursor.execute(insert_query, (i, survey_set_id))
        cursor.execute(insert_query, (i + 1, survey_set_id))
        cursor.execute(insert_query, (i + 2, survey_set_id))
    
    # Commit changes
    conn.commit()
    print("User assignments inserted successfully.")

except Exception as e:
    print("Error inserting data:", e)
    conn.rollback()

finally:
    cursor.close()
    conn.close()
