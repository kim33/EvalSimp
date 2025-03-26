import pandas as pd
import psycopg2

# Database connection details
DB_NAME = "survey_db"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_HOST = "localhost"  # Change if hosted remotely
DB_PORT = "5432"  # Default PostgreSQL port

# Path to your XLSX file
xlsx_file = '../original_simplified_pairs.xlsx'  # Replace with your actual file path

# Read the Excel file using pandas
df = pd.read_excel(xlsx_file)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
)
cursor = conn.cursor()

# Insert data from each row into the 'passages' table
try:
    insert_query = """
    INSERT INTO passages (passage_a, passage_b, fake_complex)
    VALUES (%s, %s, %s);
    """
    
    for index, row in df.iterrows():
        cursor.execute(insert_query, (row['passage_a'], row['passage_b'], row['fake_complex']))
    
    # Commit changes
    conn.commit()
    print("Data inserted successfully.")

except Exception as e:
    print("Error inserting data:", e)
    conn.rollback()

finally:
    cursor.close()
    conn.close()
