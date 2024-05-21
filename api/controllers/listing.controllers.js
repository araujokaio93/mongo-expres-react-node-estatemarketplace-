import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Nenhum anúncio foi encontrado!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Você pode apenas deletar os anúncios de sua conta!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('O anúncio foi deletado com sucesso !');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Nenhum anúncio foi encontrado!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'Você pode apenas editar os anúncios de sua própria conta!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Nenhum anúncio foi encontrado!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

