import router from '../config/router.config';
import ChatController from '../controllers/chat.controller';
import MessageController from '../controllers/message.controller';
import authMidleware from '../midlewares/auth.midleware';

/**
 * @openapi
 * /chats:
 *   get:
 *     summary: List chats.
 *     description: This route list chats with pagination.
 *     tags:
 *       - Chat
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/access_token'
 *       - name: name
 *         description: Name of chat
 *         in: query
 *         schema:
 *           type: string
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the chat data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               id:
 *                 type: string
 *               first_user:
 *                  type: object
 *               second_user:
 *                  type: object
 *               not_readed_messages:
 *                 type: integer
 *               messages:
 *                  type: array
 *             examples:
 *               get_payload:
 *                 value:
 *                   id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                   first_user:
 *                     id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                     name: 'Maria Eduarda'
 *                     user_name: 'maria#0'
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                   second_user:
 *                     id: 'badd7b31-53af-4936-8044-95ead27d783e'
 *                     name: 'João Gabriel'
 *                     user_name: 'joão#0'
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                   unreaded_messages: 8
 *                   messages:
 *                     - id: 'a01835c6-0db7-4bd0-b1df-402c5b71bdf8'
 *                       sender_id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                       content: 'Olá, tudo bem?'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.get('/chats', authMidleware, ChatController.index);

/**
 * @openapi
 * /chats/{id}/messages:
 *   get:
 *     summary: List messages.
 *     description: This route list messages with pagination.
 *     tags:
 *       - Chat
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/access_token'
 *       - name: id
 *         description: Id of chat
 *         in: path
 *         schema:
 *           type: string
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Return the message data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               id:
 *                 type: string
 *               read:
 *                  type: boolean
 *               content:
 *                  type: string
 *               chat_id:
 *                 type: string
 *               sender:
 *                  type: object
 *               receiver:
 *                  type: object
 *             examples:
 *               get_payload:
 *                 value:
 *                   id: 'a99fb524-bfea-4dc1-a8f0-66410097266b'
 *                   read: false
 *                   content: 'Olá, tudo bem?'
 *                   chat_id: 'a8ff7455-dc4a-425d-87d2-2088465748d4'
 *                   sender:
 *                     id: '449e0bd0-3b89-495c-b311-57acec53f702'
 *                     name: 'Maria Eduarda'
 *                     user_name: 'maria#0'
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *                   receiver:
 *                     id: 'badd7b31-53af-4936-8044-95ead27d783e'
 *                     name: 'João Gabriel'
 *                     user_name: 'joão#0'
 *                     photo_url: 'http://localhost:5000/public/uploads/images/1f96b637e1b9b174ffc4d3030e87b71c-example-image.png'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 *       404:
 *         $ref: '#/components/responses/error'
 */
router.get('/chats/:id/messages', authMidleware, MessageController.index);

/**
 * @openapi
 * /chats:
 *   post:
 *     summary: Create a chat.
 *     description: This route create a chat.
 *     tags:
 *       - Chat
 *     parameters:
 *       - name:
 *         $ref: '#/components/parameters/access_token'
 *     security:
 *       - access_token: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               second_user_id:
 *                 type: string
 *             required:
 *               - second_user_id
 *           examples:
 *             create_chat:
 *               value:
 *                 second_user_id: 'a98fb524-bfea-4dc1-a8f0-66410097263a'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/success'
 *       400:
 *         $ref: '#/components/responses/error'
 *       401:
 *         $ref: '#/components/responses/error'
 */
router.post('/chats', authMidleware, ChatController.store);

export default router;