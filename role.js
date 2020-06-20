const RBAC = require("rbac");

module.exports = async function checkRole() {
    const rbac = new RBAC.RBAC({
        roles: ["admin", "user"],
        permissions: {
            user: ["create", "read", "delete"],
            book: ["read", "create", "update", "delete"],
            review: ["create", "read", "delete"]
        },
        grants: {
            user: ["read_book", "create_book", "update_book", "create_review", "read_review"],
            admin: ["user", "delete_book", "read_user", "create_user", "delete_user", "read_review", "delete_review"]
        }
    });
    await rbac.init();
    return rbac;
};
