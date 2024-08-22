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
    (1, 'Other');


INSERT INTO budget_categories (user_id, category_name)
VALUES
    (1, 'Salary'),
    (1, 'Business Income'),
    (1, 'Investments'),
    (1, 'Freelancing'),
    (1, 'Gifts');


