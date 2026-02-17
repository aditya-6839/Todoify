import express from 'express';
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addMember,
    removeMember,
    updateMemberRole,
    getProjectTodos,
    generateInviteLink,
    joinViaInvite,
    regenerateInviteLink,
    revokeInviteLink,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Project CRUD routes
router.route('/').get(getProjects).post(createProject);

router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

// Invite link routes (NEW - Primary method for adding members)
router.post('/:id/invite', generateInviteLink);
router.put('/:id/invite', regenerateInviteLink);
router.delete('/:id/invite', revokeInviteLink);
router.post('/join/:token', joinViaInvite);

// Member management routes (DEPRECATED - keep for backward compatibility)
// router.post('/:id/members', addMember); // Deprecated: Use invite links instead
router.delete('/:id/members/:userId', removeMember);
router.put('/:id/members/:userId', updateMemberRole);

// Project todos
router.get('/:id/todos', getProjectTodos);

export default router;
