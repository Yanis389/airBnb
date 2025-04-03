import sequelize from '../config/database';
import { Location } from '../models/location.model';

export class LocationService {
  async findAll(): Promise<Location[]> {
    return Location.findAll();
  }

  async findById(id: number): Promise<Location | null> {
    return Location.findByPk(id);
  }

  async create(locationData: Partial<Location>): Promise<Location> {
    return Location.create(locationData);
  }

  async update(id: number, locationData: Partial<Location>): Promise<[number, Location[]]> {
    const [affectedCount, affectedRows] = await Location.update(locationData, {
      where: { id },
      returning: true,
    });
    return [affectedCount, affectedRows];
  }

  async delete(id: number): Promise<number> {
    return Location.destroy({
      where: { id },
    });
  }

  async incrementLikes(id: number): Promise<[number, Location[]]> {
    return Location.update(
      { likes: sequelize.literal('likes + 1') },
      { where: { id }, returning: true }
    );
  }
}

export const locationService = new LocationService();