import { ConfigService } from './config.service';
import { KeeperService } from './keeper.service';
import { CreditService } from './credit.service';
import { AreaService } from './area.service';
import { ExhibitService } from './exhibit.service';
import { ContactService } from './contact.service';

export const services = [
  ConfigService,
  KeeperService,
  CreditService,
  AreaService,
  ExhibitService,
  ContactService,
];

export * from './config.service';
export * from './keeper.service';
export * from './credit.service';
export * from './area.service';
export * from './exhibit.service';
export * from './contact.service';
