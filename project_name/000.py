import sqlite3

def create_database():
    # Connect to SQLite database (it will create db.sqlite3 if it doesn't exist)
    conn = sqlite3.connect('db1.sqlite3')
    cursor = conn.cursor()

    # Create the messages table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        receiver TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # Commit changes and close connection
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()
    print("Database and table created successfully.")
