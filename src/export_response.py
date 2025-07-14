import psycopg2
import pandas as pd

# Database connection details
DB_HOST = "localhost"  # Replace with your host
DB_PORT = "5432"       # Replace with your port (default is 5432)
DB_NAME = "survey_db"  # Your database name
DB_USER = "postgres"  # Replace with your DB username
DB_PASSWORD = "postgres"  # Replace with your DB password

# Initialize the connection variable
conn = None

# Connect to the PostgreSQL database
try:
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    print("Connection to the database established successfully.")
except Exception as e:
    print("Error: Unable to connect to the database")
    print(e)

# Only proceed if the connection was successful
if conn:
    # Query to fetch all data from the responses table
    query = "SELECT * FROM responses;"

    # Exporting the data to CSV
    try:
        # Use pandas to execute the query and load data into a DataFrame
        df = pd.read_sql_query(query, conn)

        # Export the DataFrame to CSV
        df.to_csv("responses_export.csv", index=False)
        print("Data has been exported to responses_export.csv successfully.")
    except Exception as e:
        print("Error exporting data to CSV:")
        print(e)
    finally:
        # Close the database connection
        conn.close()
        print("Database connection closed.")
else:
    print("Database connection was not established, so no data was exported.")
