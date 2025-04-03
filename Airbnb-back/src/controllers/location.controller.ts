import { Request, Response } from 'express';
import { locationService } from '../services/location.service';

export class LocationController {
  async getAllLocations(req: Request, res: Response) {
    try {
      const locations = await locationService.findAll();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching locations', error });
    }
  }

  async getLocationById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const location = await locationService.findById(id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching location', error });
    }
  }

  async createLocation(req: Request, res: Response) {
    try {
      const locationData = {
        ...req.body,
        photo: req.file ? `/${req.file.filename}` : null,
      };
      const location = await locationService.create(locationData);
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ message: 'Error creating location', error });
    }
  }

  async updateLocation(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const locationData = {
        ...req.body,
        photo: req.file ? `/${req.file.filename}` : undefined,
      };
      const [affectedCount] = await locationService.update(id, locationData);
      if (affectedCount === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      const updatedLocation = await locationService.findById(id);
      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating location', error });
    }
  }

  async deleteLocation(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await locationService.delete(id);
      if (deleted === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting location', error });
    }
  }

  async likeLocation(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const [affectedCount] = await locationService.incrementLikes(id);
      if (affectedCount === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      const updatedLocation = await locationService.findById(id);
      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ message: 'Error liking location', error });
    }
  }
}

export const locationController = new LocationController();