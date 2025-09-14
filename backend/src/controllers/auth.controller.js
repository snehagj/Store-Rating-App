const bcrypt = require('bcrypt');
const { User, Role } = require('../models');
const { sign } = require('../utils/jwt');
const { signupSchema, loginSchema } = require('../validators/auth.validator');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

const signup = async (req, res, next) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existing = await User.findOne({ where: { email: value.email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const role = await Role.findOne({ where: { name: 'Normal User' } });
    const hash = await bcrypt.hash(value.password, saltRounds);
    const user = await User.create({ ...value, password: hash, roleId: role.id });

    const token = sign({ id: user.id, roleId: user.roleId });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, roleId: user.roleId } });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await User.findOne({ where: { email: value.email }, include: Role });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(value.password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = sign({ id: user.id, roleId: user.roleId });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, address: user.address, role: user.Role.name }
    });
  } catch (err) { next(err); }
};

const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Provide old and new password' });
    // Validate new password with same constraints
    const passwordSchema = require('joi').string().min(8).max(16).pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])')).required();
    const { error } = passwordSchema.validate(newPassword);
    if (error) return res.status(400).json({ message: error.message });
    const user = await User.findByPk(req.user.id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Old password incorrect' });
    const hash = await bcrypt.hash(newPassword, saltRounds);
    await user.update({ password: hash });
    res.json({ message: 'Password updated' });
  } catch (err) { next(err); }
};

module.exports = { signup, login, updatePassword };
