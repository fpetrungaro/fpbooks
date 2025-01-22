DELIMITER //

CREATE PROCEDURE GenerateBooks(IN bookCount INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE prefix VARCHAR(20);
    DECLARE genre VARCHAR(50);

    -- Loop to insert books
    WHILE i <= bookCount DO
        -- Select a random prefix
        SET prefix = ELT(FLOOR(1 + (RAND() * 8)),
            'lion_book', 'tiger_book', 'cat_book', 'giraffe_book',
            'snake_book', 'frog_book', 'croco_book', 'dino_book');

        -- Assign genre based on prefix
        SET genre = CASE
            WHEN prefix = 'lion_book' THEN 'Adventure'
            WHEN prefix = 'tiger_book' THEN 'Action'
            WHEN prefix = 'cat_book' THEN 'Fiction'
            WHEN prefix = 'giraffe_book' THEN 'Children'
            WHEN prefix = 'snake_book' THEN 'Thriller'
            WHEN prefix = 'frog_book' THEN 'Fantasy'
            WHEN prefix = 'croco_book' THEN 'Mystery'
            WHEN prefix = 'dino_book' THEN 'History'
            ELSE 'General'
        END;

        -- Insert a book with unique title
        INSERT INTO books (title, genre, author, published_date)
        VALUES (
            CONCAT(prefix, i, '_', FLOOR(RAND() * 1000000)),
            genre,
            CONCAT('Author_', FLOOR(RAND() * 100)),
            DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 3650) DAY)
        );

        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;
