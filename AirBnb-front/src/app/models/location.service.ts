export class Location {
  id: number;
  name: string;
  description: string;
  photo: string;
  likes: number; 
  createdAt: Date;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    photo: string, 
    likes: number = 0,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.likes = likes;
    this.createdAt = createdAt;
  }
}
