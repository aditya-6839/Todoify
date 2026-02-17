import Project from '../models/Project.js';
import Todo from '../models/Todo.js';

// @desc    Get all projects for user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ 'members.user': req.user._id })
            .populate('members.user', 'name email avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            'members.user',
            'name email avatar'
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if user is a member
        if (!project.isMember(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this project',
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
    try {
        const { name, description, status, priority, category, deadline, color } = req.body;

        // Create project with creator as owner
        const project = await Project.create({
            name,
            description,
            status,
            priority,
            category,
            deadline,
            color,
            members: [
                {
                    user: req.user._id,
                    role: 'owner',
                },
            ],
        });

        // Populate the creator's info
        await project.populate('members.user', 'name email avatar');

        res.status(201).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
export const updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if user is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can update the project',
            });
        }

        const { name, description, status, priority, category, deadline, permissions } = req.body;

        if (name) project.name = name;
        if (description !== undefined) project.description = description;
        if (status) project.status = status;
        if (priority) project.priority = priority;
        if (category) project.category = category;
        if (deadline !== undefined) project.deadline = deadline;
        if (permissions) project.permissions = { ...project.permissions, ...permissions };

        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if user is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can delete the project',
            });
        }

        // Optional: Delete all todos associated with this project
        await Todo.deleteMany({ project: req.params.id });

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Project and associated todos deleted successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add member to project
// @route   POST /api/projects/:id/members
// @access  Private (Admin only)
export const addMember = async (req, res, next) => {
    try {
        const { userId, role = 'member' } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a user ID',
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can add members',
            });
        }

        // Check if user is already a member
        if (project.isMember(userId)) {
            return res.status(400).json({
                success: false,
                message: 'User is already a member of this project',
            });
        }

        // Add member
        project.members.push({
            user: userId,
            role,
        });

        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove member from project
// @route   DELETE /api/projects/:id/members/:userId
// @access  Private (Admin only)
export const removeMember = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can remove members',
            });
        }

        // Check if member exists in the project
        const memberToRemove = project.members.find(m => {
            // Handle both populated and non-populated user references
            const memberId = m.user._id ? m.user._id.toString() : m.user.toString();
            return memberId === userId;
        });

        if (!memberToRemove) {
            return res.status(404).json({
                success: false,
                message: 'User is not a member of this project',
            });
        }

        // Don't allow removing the last admin
        const admins = project.getAdmins();
        if (memberToRemove.role === 'admin' && admins.length === 1) {
            return res.status(400).json({
                success: false,
                message: 'Cannot remove the last admin from the project',
            });
        }

        // Remove member
        project.members = project.members.filter(member => {
            // Handle both populated and non-populated user references
            const memberId = member.user._id ? member.user._id.toString() : member.user.toString();
            return memberId !== userId;
        });

        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update member role
// @route   PUT /api/projects/:id/members/:userId
// @access  Private (Admin only)
export const updateMemberRole = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!role || !['admin', 'member'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid role (admin or member)',
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can update member roles',
            });
        }

        const member = project.members.find(m => {
            // Handle both populated and non-populated user references
            const memberId = m.user._id ? m.user._id.toString() : m.user.toString();
            return memberId === userId;
        });

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'User is not a member of this project',
            });
        }

        // Don't allow demoting the last admin
        if (member.role === 'admin' && role === 'member') {
            const admins = project.getAdmins();
            if (admins.length === 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot demote the last admin',
                });
            }
        }

        member.role = role;

        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get project todos
// @route   GET /api/projects/:id/todos
// @access  Private (Members only)
export const getProjectTodos = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if user is a member
        if (!project.isMember(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this project',
            });
        }

        const todos = await Todo.find({ project: req.params.id })
            .populate('user', 'name email avatar')
            .populate('assignedTo', 'name email avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Generate invite link for project
// @route   POST /api/projects/:id/invite
// @access  Private (Admin only)
export const generateInviteLink = async (req, res, next) => {
    try {
        const { expiryHours = 168 } = req.body; // Default 7 days

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can generate invite links',
            });
        }

        // Generate the invite token
        const inviteToken = project.generateInviteToken(expiryHours);
        await project.save();

        // Construct the invite URL
        const inviteUrl = `${process.env.CLIENT_URL}/projects/join/${inviteToken}`;

        res.status(200).json({
            success: true,
            data: {
                inviteToken,
                inviteUrl,
                expiresAt: project.inviteTokenExpiry,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Join project via invite link
// @route   POST /api/projects/join/:token
// @access  Private
export const joinViaInvite = async (req, res, next) => {
    try {
        const { token } = req.params;

        const project = await Project.findOne({ inviteToken: token })
            .populate('members.user', 'name email avatar');

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Invalid invite link',
            });
        }

        // Check if token is still valid
        if (!project.isInviteTokenValid()) {
            return res.status(400).json({
                success: false,
                message: 'Invite link has expired',
            });
        }

        // Check if user is already a member
        if (project.isMember(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: 'You are already a member of this project',
            });
        }

        // Add user as a member
        project.members.push({
            user: req.user._id,
            role: 'member',
        });

        await project.save();
        await project.populate('members.user', 'name email avatar');

        res.status(200).json({
            success: true,
            message: 'Successfully joined the project',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Regenerate invite link
// @route   PUT /api/projects/:id/invite
// @access  Private (Admin only)
export const regenerateInviteLink = async (req, res, next) => {
    try {
        const { expiryHours = 168 } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can regenerate invite links',
            });
        }

        // Generate new token
        const inviteToken = project.generateInviteToken(expiryHours);
        await project.save();

        const inviteUrl = `${process.env.CLIENT_URL}/projects/join/${inviteToken}`;

        res.status(200).json({
            success: true,
            message: 'Invite link regenerated',
            data: {
                inviteToken,
                inviteUrl,
                expiresAt: project.inviteTokenExpiry,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Revoke/disable invite link
// @route   DELETE /api/projects/:id/invite
// @access  Private (Admin only)
export const revokeInviteLink = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Check if requester is project admin
        if (!project.isAdmin(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'Only project admins can revoke invite links',
            });
        }

        // Clear the invite token
        project.clearInviteToken();
        await project.save();

        res.status(200).json({
            success: true,
            message: 'Invite link revoked successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
