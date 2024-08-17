-- Insert dummy users
INSERT INTO users (username, email, password_hash, created_at, updated_at)
VALUES
    ('alice', 'alice@example.com', 'hashedpassword1', datetime('now'), datetime('now')),
    ('bob', 'bob@example.com', 'hashedpassword2', datetime('now'), datetime('now')),
    ('carol', 'carol@example.com', 'hashedpassword3', datetime('now'), datetime('now'));

-- Insert dummy categories
INSERT INTO budget_categories (user_id, category_name)
VALUES
    (1, 'Food'),
    (1, 'Transportation'),
    (1, 'Entertainment'),
    (1, 'Utilities'),
    (1, 'Other'),
    (2, 'Food'),
    (2, 'Transportation'),
    (2, 'Entertainment'),
    (2, 'Utilities'),
    (2, 'Other'),
    (3, 'Food'),
    (3, 'Transportation'),
    (3, 'Entertainment'),
    (3, 'Utilities'),
    (3, 'Other');
