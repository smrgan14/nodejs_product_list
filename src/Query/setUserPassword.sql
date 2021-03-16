UPDATE
    users
SET
    password = @newPassword
WHERE
    userId = @userId
