import type { Originator } from '../utils/originators';
import { ComponentDTO } from './components.dto';

export type OriginatorType = Originator;

// ============================================
// Main DTO
// ============================================

export interface OperationTechnicalBladeDTO {
  originator?: Originator;
  components: ComponentDTO[];
}
