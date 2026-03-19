import { SelectInterface } from '../../../../../../core/interfaces/select.interface';
import { UserDetailsRouterLinksEnum } from '../enums/user-details-router-links.enum';

export interface UserDetailsRoutesSelectWithIconInterface extends SelectInterface<UserDetailsRouterLinksEnum> {
  icon: string;
}
