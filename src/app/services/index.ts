import { KeeperService } from './keeper.service';
import { CreditService } from './credit.service';
import { AreaService } from './area.service';
import { ExhibitService } from './exhibit.service';

export const services = [
  KeeperService,
  CreditService,
  AreaService,
  ExhibitService,
];

export * from './keeper.service';
export * from './credit.service';
export * from './area.service';
export * from './exhibit.service';
