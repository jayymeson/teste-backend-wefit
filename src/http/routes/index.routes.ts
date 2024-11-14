import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { makeAuthController } from "../factories/auth-controller.factory";
import { makeProfileController } from "../factories/profile-controller.factory";

const router = Router();


const authController = makeAuthController();
const profileController = makeProfileController();

// Rota de Autenticação
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login do Usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", (req, res) => authController.login(req, res));

// Rota de Perfil (Protegida por JWT)
/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Cria um novo perfil.
 *     description: Cria um novo perfil com base nos dados fornecidos.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileDto'
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProfileDto'
 *       400:
 *         description: Erro de validação
 */
router.post("/profile", authenticateJWT, (req, res) => profileController.create(req, res));

export default router;
