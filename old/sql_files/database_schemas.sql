CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE budget_categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_name TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

create table income(
    income_id integer primary_key autoincrement,
    forTimeStamoubt number not null,
    created_at CURRENT_TIMESTAMP DEFAULT
);


CREATE TABLE budget_allocated (
    allocation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_id INTEGER,
    month TEXT NOT NULL, -- Format as 'YYYY-MM'
    budget REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES budget_categories(category_id) ON DELETE CASCADE
);


CREATE TABLE budget_expenses (
    expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    category_id INTEGER,
    expense_date DATETIME NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES budget_categories(category_id) ON DELETE CASCADE
);
