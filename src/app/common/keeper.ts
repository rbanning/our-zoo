import { GUID } from './guid';
export interface IKeeper {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export const AVATARS = [
  "/assets/avatars/abby.svg",
  "/assets/avatars/alice.svg",
  "/assets/avatars/arnold.svg",
  "/assets/avatars/arthur.svg",
  "/assets/avatars/betty.svg",
  "/assets/avatars/bonnie.svg",
  "/assets/avatars/bridget.svg",
  "/assets/avatars/clyde.svg",
  "/assets/avatars/felix.svg",
  "/assets/avatars/franklin.svg",
  "/assets/avatars/lizabeth.svg",
  "/assets/avatars/midge.svg",
  "/assets/avatars/mr-incredible.svg",
  "/assets/avatars/pheona.svg",
  "/assets/avatars/randy.svg",
  "/assets/avatars/ruth.svg",
  "/assets/avatars/skippy.svg",
  "/assets/avatars/tiffany.svg",
  "/assets/avatars/tommy.svg",
  "/assets/avatars/tucker.svg"
];

export const avatarLookup = (name: string) => {
  return AVATARS.find(path => path === `/assets/avatars/${name}.svg`);
}

export const DEFAULT_AVATAR = AVATARS[0];

export class Keeper implements IKeeper {
  id: string;
  name: string;
  bio: string;
  avatar: string;

  constructor(obj: any = null) {
    this.id = GUID.create().toSimpleString();
    this.avatar = DEFAULT_AVATAR;

    if (obj) {
      this.id = obj.id || this.id;
      this.name = obj.name;
      this.bio = obj.bio;
      this.avatar = obj.avatar || this.avatar;
    }
  }

  public static create(id: string, name: string, bio: string, avatar: string): IKeeper {
    return new Keeper({id,name,bio,avatar});
  }
}

