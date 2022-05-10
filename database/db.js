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

const setNewPass = ( password, email) => {
    console.log('prueba:', email, password);
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

const getUserById = (id) =>{
    const query = `SELECT * FROM users 
        WHERE id=$1
    `;

    return db.query(query, [id]).then((results)=>{
        return results.rows[0];
    });
};

const uploadProfilePic = (url, id) =>{
    const query = `
        UPDATE users 
        SET profile_picture_url=$1
        WHERE id=$2
        RETURNING *
    `;

    return db.query(query, [url, id]).then((results)=>{
        
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
    uploadProfilePic
};
