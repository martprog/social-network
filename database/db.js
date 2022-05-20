const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

const createUser = (first, last, email, password) => {
    return hashPassword(password).then((hashed) => {
        const query = `
            INSERT INTO users (first, last, email, password_hash)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `;
        const params = [first, last, email, hashed];
        return db.query(query, params).then((results) => {
            return results.rows[0];
        });
    });
};

function getUserByEmail(email) {
    const query = `
            SELECT * FROM users
            WHERE email=$1
            `;
    const params = [email];
    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
}

const login = (email, password) => {
    return getUserByEmail(email)
        .then((results) => {
            if (!results) {
                return null;
            }
            return bcrypt
                .compare(password, results.password_hash)
                .then((value) => {
                    if (!value) {
                        return null;
                    }
                    return results;
                })
                .catch(() => console.log("false credeeentials!"));
        })
        .catch(() => console.log("inexistent email"));
};

const reset = (email, code) => {
    const query = `
        INSERT INTO gencodes (email, code)
        VALUES ($1, $2)
        RETURNING *
    `;

    const params = [email, code];

    return getUserByEmail(email)
        .then((results) => {
            if (!results) {
                return null;
            }
            return db.query(query, params).then((results) => {
                return results.rows[0];
            });
        })
        .catch(() => console.log("inexistent email"));
};

const getUserByCode = (code) => {
    const query = `
        SELECT * FROM gencodes
        WHERE code=$1
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    `;

    return db.query(query, [code]).then((results) => {
        return results.rows[0];
    });
};

const setNewPass = (password, email) => {
    console.log("prueba:", email, password);
    return hashPassword(password).then((hashed) => {
        const query = `
            UPDATE users
            SET password_hash=$1
            WHERE email=$2
            RETURNING *
        `;

        return db.query(query, [hashed, email]).then((results) => {
            return results.rows[0];
        });
    });
};

const getUserById = (id) => {
    const query = `SELECT * FROM users 
        WHERE id=$1
    `;

    return db.query(query, [id]).then((results) => {
        return results.rows[0];
    });
};

const uploadProfilePic = (url, id) => {
    const query = `
        UPDATE users 
        SET profile_picture_url=$1
        WHERE id=$2
        RETURNING *
    `;

    return db.query(query, [url, id]).then((results) => {
        return results.rows[0];
    });
};

const updateBio = (bio, id) => {
    const query = `
        UPDATE users
        SET bio=$1
        WHERE id=$2
        RETURNING *
    `;

    return db.query(query, [bio, id]).then((results) => {
        return results.rows[0];
    });
};

const getLatestUsers = () => {
    const query = `
        SELECT * FROM USERS
        ORDER BY created_at DESC
        LIMIT 3
    `;

    return db.query(query).then((results) => {
        return results.rows;
    });
};

const getUsersByQuery = (search, id) => {
    const query = `
        SELECT * FROM  USERS
        WHERE first ILIKE $1 
        AND id not in($2)
    `;

    return db.query(query, [search + "%", id]).then((results) => {
        return results.rows;
    });
};

const getOtherUserProfile = (id) => {
    const query = `
        SELECT * FROM users
        WHERE id=$1
    `;

    return db.query(query, [id]).then((results) => {
        return results.rows[0];
    });
};

const getFriendship = (userId, otherUserId) => {
    const query = `
        SELECT * FROM friendships
        WHERE (sender_id=$1 AND recipient_id=$2)
        OR (sender_id=$2 AND recipient_id=$1)
    `;

    const params = [userId, otherUserId];

    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
};

const sendFriendship = (userId, otherUserId) => {
    const query = `
        INSERT INTO friendships(sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *
    `;

    const params = [userId, otherUserId];

    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
};

const acceptFriendship = (userId, otherUserId) => {
    const query = `
        UPDATE friendships
        SET accepted='true'
        WHERE sender_id=$2 AND recipient_id=$1 
        RETURNING *
    `;

    const params = [userId, otherUserId];

    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
};

const removeFriendship = (userId, otherUserId) => {
    const query = `
        DELETE FROM friendships
        WHERE (sender_id=$1 AND recipient_id=$2) 
        OR (sender_id=$2 AND recipient_id=$1)
        RETURNING *
    `;

    const params = [userId, otherUserId];

    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
};

const getFriendsAndReqs = (id) => {
    const query = `
        SELECT users.id, friendships.sender_id, friendships.recipient_id, friendships.accepted, users.first, users.last, users.profile_picture_url
        from friendships
        JOIN users
        ON (friendships.sender_id = users.id OR friendships.recipient_id = users.id)
        WHERE (sender_id=$1 AND accepted='true')
        OR (recipient_id=$1)
    `;

    return db.query(query, [id]).then((results) => {
        return results.rows.filter((result) => {
            if (result.id !== id) {
                return result;
            }
        });
    });
};

const getAllMessages = () => {
    const query = `
        SELECT users.first, users.last, users.profile_picture_url, chat_messages.id, chat_messages.sender_id, chat_messages.text FROM chat_messages
        JOIN users
        ON chat_messages.sender_id=users.id
        LIMIT 10
    `;
    return db.query(query).then((results) => {
        return results.rows;
    });
};

const createNewMsg = (id, text) => {
    const query = `
        INSERT INTO chat_messages(sender_id, text)
        VALUES($1, $2)
        RETURNING *
    `;

    const params = [id, text];

    return db.query(query, params).then((results) => {
        return results.rows[0];
    });
};

module.exports = {
    createUser,
    login,
    reset,
    setNewPass,
    getUserByCode,
    getUserById,
    uploadProfilePic,
    updateBio,
    getLatestUsers,
    getUsersByQuery,
    getOtherUserProfile,
    getFriendship,
    sendFriendship,
    acceptFriendship,
    removeFriendship,
    getFriendsAndReqs,
    getAllMessages,
    createNewMsg
};
