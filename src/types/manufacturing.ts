/**
 * Shared types for Vietnam production network map and facility directory.
 */

export type ManufacturingClusterKey = "quynhon" | "hcmc" | "hungyen" | "phutho";

export type ClusterInfo = {
  id: string;
  name: string;
  region: string;
  totalArea: string;
  furnitureArea: string;
  panelArea?: string;
  facilitiesCount: number;
  focus: string;
  ports: string;
  pin: { x: number; y: number };
  provinceNames: string[];
};

export type ManufacturingFacilityRow = {
  id: string;
  clusterId: ManufacturingClusterKey;
  facilityNumber: string;
  nameEn: string;
  nameVi: string;
  locationEn: string;
  locationVi: string;
  areaSqm: string;
  focusEn: string;
  focusVi: string;
  classificationEn: string;
  classificationVi: string;
  portEn: string;
  portVi: string;
  monthlyContainersEn: string;
  monthlyContainersVi: string;
  isUpstreamPanelPlant?: boolean;
};

export type VietnamProductionMapProps = {
  activeCluster: string;
  onSelectCluster: (clusterId: string) => void;
  clusters: ClusterInfo[];
  isVi?: boolean;
};

export type ExportPortId = "quynhon_port" | "south_ports" | "haiphong_port";

export type FacilityRowItem = {
  id: string;
  name: string;
  cluster: string;
  clusterId: ManufacturingClusterKey;
  area: string;
  category: string;
  isUpstreamPanel?: boolean;
  focus: string;
  port: string;
  portGroup: ExportPortId;
  monthlyVolume?: string;
};

export type ExportVolumeGroup = {
  id: ManufacturingClusterKey;
  label: string;
  industrialPark: string;
  facilityIds: string[];
  facilitiesLabel: string;
  facilityCount: number;
  volume: string;
  portName: string;
  portId: ExportPortId;
  note: string;
  pin: { x: number; y: number };
  portPin: { x: number; y: number };
  provinceNames: string[];
};

export type PortGatewayItem = {
  id: ExportPortId;
  name: string;
  region: string;
  facilitiesServed: string;
  volume: string;
  x: number;
  y: number;
};

export type VietnamExportVolumeMapProps = {
  selectedFilter: string;
  onSelectFilter: (filterId: string) => void;
  groups: ExportVolumeGroup[];
  ports: PortGatewayItem[];
  isVi?: boolean;
};

export type MarketRegionId = "na" | "eu" | "mea" | "apac";

export type MarketCountry = {
  name: string;
  nameVi: string;
  regionId: MarketRegionId;
  x: number;
  y: number;
};

export type MarketRegionItem = {
  id: MarketRegionId;
  name: string;
  nameVi: string;
  count: number;
  countries: MarketCountry[];
};
