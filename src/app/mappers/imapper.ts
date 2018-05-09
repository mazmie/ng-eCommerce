import { DataSnapshot } from '@firebase/database-types';
import { AngularFireAction } from 'angularfire2/database';

export interface IMapper<T> {
    toModel(action: AngularFireAction<DataSnapshot>): T;
}
