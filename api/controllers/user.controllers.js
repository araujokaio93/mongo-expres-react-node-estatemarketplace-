import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const test = (req, res) => {
  res.json({
    message: 'A rota do API está funcionando!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'Você só pode atualizar sua própria conta!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'Você só pode deletar a própria conta!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    setTimeout(() => {
      res.clearCookie('access_token');
      res.status(200).json('O Usuário foi deletado!');
    }, 1200); // Atraso de 1200 milissegundos (1,2 segundos)
  } catch (error) {
    next(error);
  }
};

