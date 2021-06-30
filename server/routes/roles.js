const express = require('express')

const router = express.Router()

const rolesController = require('../controllers/roles')

router.get("/", rolesController.getRoles)

router.get("/users", rolesController.getRolesWithUsers)
router.post("/users", rolesController.postAddRoleToUser)
router.delete("/users", rolesController.deleteRoleFromUser)

module.exports = router