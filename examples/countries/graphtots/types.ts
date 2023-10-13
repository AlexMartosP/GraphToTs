// Helpers

type ObjectType = Record<string, any>;

type Nullable<T> = T;

type IsNullable<T> = T extends Nullable<any> ? true : false;

// Resolver with Arguments

type ResolverWithArguments<Arguments, Fields> = {
  arguments: Arguments;
  fields: Fields;
};

// Scalars
export type Scalars = {
  Any: any;
  String: string;
  ID: string;
  Int: number;
  Boolean: boolean;
  Date: any;
  Float: number;
  ObjectID: any;
  timestamptz: any;
  uuid: any;
  link__Import: any;
  federation__FieldSet: any;
  _Any: any;
};

// Input objects
export type CapsulesFind = {
  id?: Scalars["ID"];
  landings?: Scalars["Int"];
  mission?: Scalars["String"];
  original_launch?: Scalars["Date"];
  reuse_count?: Scalars["Int"];
  status?: Scalars["String"];
  type?: Scalars["String"];
};
export type CoresFind = {
  asds_attempts?: Scalars["Int"];
  asds_landings?: Scalars["Int"];
  block?: Scalars["Int"];
  id?: Scalars["String"];
  missions?: Scalars["String"];
  original_launch?: Scalars["Date"];
  reuse_count?: Scalars["Int"];
  rtls_attempts?: Scalars["Int"];
  rtls_landings?: Scalars["Int"];
  status?: Scalars["String"];
  water_landing?: Scalars["Boolean"];
};
export type HistoryFind = {
  end?: Scalars["Date"];
  flight_number?: Scalars["Int"];
  id?: Scalars["ID"];
  start?: Scalars["Date"];
};
export type LaunchFind = {
  apoapsis_km?: Scalars["Float"];
  block?: Scalars["Int"];
  cap_serial?: Scalars["String"];
  capsule_reuse?: Scalars["String"];
  core_flight?: Scalars["Int"];
  core_reuse?: Scalars["String"];
  core_serial?: Scalars["String"];
  customer?: Scalars["String"];
  eccentricity?: Scalars["Float"];
  end?: Scalars["Date"];
  epoch?: Scalars["Date"];
  fairings_recovered?: Scalars["String"];
  fairings_recovery_attempt?: Scalars["String"];
  fairings_reuse?: Scalars["String"];
  fairings_reused?: Scalars["String"];
  fairings_ship?: Scalars["String"];
  gridfins?: Scalars["String"];
  id?: Scalars["ID"];
  inclination_deg?: Scalars["Float"];
  land_success?: Scalars["String"];
  landing_intent?: Scalars["String"];
  landing_type?: Scalars["String"];
  landing_vehicle?: Scalars["String"];
  launch_date_local?: Scalars["Date"];
  launch_date_utc?: Scalars["Date"];
  launch_success?: Scalars["String"];
  launch_year?: Scalars["String"];
  legs?: Scalars["String"];
  lifespan_years?: Scalars["Float"];
  longitude?: Scalars["Float"];
  manufacturer?: Scalars["String"];
  mean_motion?: Scalars["Float"];
  mission_id?: Scalars["String"];
  mission_name?: Scalars["String"];
  nationality?: Scalars["String"];
  norad_id?: Scalars["Int"];
  orbit?: Scalars["String"];
  payload_id?: Scalars["String"];
  payload_type?: Scalars["String"];
  periapsis_km?: Scalars["Float"];
  period_min?: Scalars["Float"];
  raan?: Scalars["Float"];
  reference_system?: Scalars["String"];
  regime?: Scalars["String"];
  reused?: Scalars["String"];
  rocket_id?: Scalars["String"];
  rocket_name?: Scalars["String"];
  rocket_type?: Scalars["String"];
  second_stage_block?: Scalars["String"];
  semi_major_axis_km?: Scalars["Float"];
  ship?: Scalars["String"];
  side_core1_reuse?: Scalars["String"];
  side_core2_reuse?: Scalars["String"];
  site_id?: Scalars["String"];
  site_name_long?: Scalars["String"];
  site_name?: Scalars["String"];
  start?: Scalars["Date"];
  tbd?: Scalars["String"];
  tentative_max_precision?: Scalars["String"];
  tentative?: Scalars["String"];
};
export type MissionsFind = {
  id?: Scalars["ID"];
  manufacturer?: Scalars["String"];
  name?: Scalars["String"];
  payload_id?: Scalars["String"];
};
export type PayloadsFind = {
  apoapsis_km?: Scalars["Float"];
  customer?: Scalars["String"];
  eccentricity?: Scalars["Float"];
  epoch?: Scalars["Date"];
  inclination_deg?: Scalars["Float"];
  lifespan_years?: Scalars["Float"];
  longitude?: Scalars["Float"];
  manufacturer?: Scalars["String"];
  mean_motion?: Scalars["Float"];
  nationality?: Scalars["String"];
  norad_id?: Scalars["Int"];
  orbit?: Scalars["String"];
  payload_id?: Scalars["ID"];
  payload_type?: Scalars["String"];
  periapsis_km?: Scalars["Float"];
  period_min?: Scalars["Float"];
  raan?: Scalars["Float"];
  reference_system?: Scalars["String"];
  regime?: Scalars["String"];
  reused?: Scalars["Boolean"];
  semi_major_axis_km?: Scalars["Float"];
};
export type ShipsFind = {
  id?: Scalars["ID"];
  name?: Scalars["String"];
  model?: Scalars["String"];
  type?: Scalars["String"];
  role?: Scalars["String"];
  active?: Scalars["Boolean"];
  imo?: Scalars["Int"];
  mmsi?: Scalars["Int"];
  abs?: Scalars["Int"];
  class?: Scalars["Int"];
  weight_lbs?: Scalars["Int"];
  weight_kg?: Scalars["Int"];
  year_built?: Scalars["Int"];
  home_port?: Scalars["String"];
  status?: Scalars["String"];
  speed_kn?: Scalars["Int"];
  course_deg?: Scalars["Int"];
  latitude?: Scalars["Float"];
  longitude?: Scalars["Float"];
  successful_landings?: Scalars["Int"];
  attempted_landings?: Scalars["Int"];
  mission?: Scalars["String"];
};
export type String_comparison_exp = {
  _eq?: Scalars["String"];
  _gt?: Scalars["String"];
  _gte?: Scalars["String"];
  _ilike?: Scalars["String"];
  _in: Scalars["String"][];
  _is_null?: Scalars["Boolean"];
  _like?: Scalars["String"];
  _lt?: Scalars["String"];
  _lte?: Scalars["String"];
  _neq?: Scalars["String"];
  _nilike?: Scalars["String"];
  _nin: Scalars["String"][];
  _nlike?: Scalars["String"];
  _nsimilar?: Scalars["String"];
  _similar?: Scalars["String"];
};
export type timestamptz_comparison_exp = {
  _eq?: Scalars["timestamptz"];
  _gt?: Scalars["timestamptz"];
  _gte?: Scalars["timestamptz"];
  _in: Scalars["timestamptz"][];
  _is_null?: Scalars["Boolean"];
  _lt?: Scalars["timestamptz"];
  _lte?: Scalars["timestamptz"];
  _neq?: Scalars["timestamptz"];
  _nin: Scalars["timestamptz"][];
};
export type users_aggregate_order_by = {
  count?: Scalars["Any"];
  max?: users_max_order_by;
  min?: users_min_order_by;
};
export type users_arr_rel_insert_input = {
  data: users_insert_input;
  on_conflict?: users_on_conflict;
};
export type users_bool_exp = {
  _and?: users_bool_exp;
  _not?: users_bool_exp;
  _or?: users_bool_exp;
  id?: uuid_comparison_exp;
  name?: String_comparison_exp;
  rocket?: String_comparison_exp;
  timestamp?: timestamptz_comparison_exp;
  twitter?: String_comparison_exp;
};
export type users_insert_input = {
  id?: Scalars["uuid"];
  name?: Scalars["String"];
  rocket?: Scalars["String"];
  timestamp?: Scalars["timestamptz"];
  twitter?: Scalars["String"];
};
export type users_max_order_by = {
  name?: Scalars["Any"];
  rocket?: Scalars["Any"];
  timestamp?: Scalars["Any"];
  twitter?: Scalars["Any"];
};
export type users_min_order_by = {
  name?: Scalars["Any"];
  rocket?: Scalars["Any"];
  timestamp?: Scalars["Any"];
  twitter?: Scalars["Any"];
};
export type users_obj_rel_insert_input = {
  data: users_insert_input;
  on_conflict?: users_on_conflict;
};
export type users_on_conflict = {
  constraint: Scalars["Any"];
  update_columns: Scalars["Any"];
};
export type users_order_by = {
  id?: Scalars["Any"];
  name?: Scalars["Any"];
  rocket?: Scalars["Any"];
  timestamp?: Scalars["Any"];
  twitter?: Scalars["Any"];
};
export type users_set_input = {
  id?: Scalars["uuid"];
  name?: Scalars["String"];
  rocket?: Scalars["String"];
  timestamp?: Scalars["timestamptz"];
  twitter?: Scalars["String"];
};
export type uuid_comparison_exp = {
  _eq?: Scalars["uuid"];
  _gt?: Scalars["uuid"];
  _gte?: Scalars["uuid"];
  _in: Scalars["uuid"][];
  _is_null?: Scalars["Boolean"];
  _lt?: Scalars["uuid"];
  _lte?: Scalars["uuid"];
  _neq?: Scalars["uuid"];
  _nin: Scalars["uuid"][];
};

// Objects
export type Address = {
  address: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
};
export type Capsule = {
  dragon: Dragon;
  id: Scalars["ID"];
  landings: Scalars["Int"];
  missions: CapsuleMission[];
  original_launch: Scalars["Date"];
  reuse_count: Scalars["Int"];
  status: Scalars["String"];
  type: Scalars["String"];
};
export type CapsuleMission = {
  flight: Scalars["Int"];
  name: Scalars["String"];
};
export type Core = {
  asds_attempts: Scalars["Int"];
  asds_landings: Scalars["Int"];
  block: Scalars["Int"];
  id: Scalars["ID"];
  missions: CapsuleMission[];
  original_launch: Scalars["Date"];
  reuse_count: Scalars["Int"];
  rtls_attempts: Scalars["Int"];
  rtls_landings: Scalars["Int"];
  status: Scalars["String"];
  water_landing: Scalars["Boolean"];
};
export type CoreMission = {
  flight: Scalars["Int"];
  name: Scalars["String"];
};
export type Distance = {
  feet: Scalars["Float"];
  meters: Scalars["Float"];
};
export type Dragon = {
  active: Scalars["Boolean"];
  crew_capacity: Scalars["Int"];
  description: Scalars["String"];
  diameter: Distance;
  dry_mass_kg: Scalars["Int"];
  dry_mass_lb: Scalars["Int"];
  first_flight: Scalars["String"];
  heat_shield: DragonHeatShield;
  height_w_trunk: Distance;
  id: Scalars["ID"];
  launch_payload_mass: Mass;
  launch_payload_vol: Volume;
  name: Scalars["String"];
  orbit_duration_yr: Scalars["Int"];
  pressurized_capsule: DragonPressurizedCapsule;
  return_payload_mass: Mass;
  return_payload_vol: Volume;
  sidewall_angle_deg: Scalars["Float"];
  thrusters: DragonThrust[];
  trunk: DragonTrunk;
  type: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type DragonHeatShield = {
  dev_partner: Scalars["String"];
  material: Scalars["String"];
  size_meters: Scalars["Float"];
  temp_degrees: Scalars["Int"];
};
export type DragonPressurizedCapsule = {
  payload_volume: Volume;
};
export type DragonThrust = {
  amount: Scalars["Int"];
  fuel_1: Scalars["String"];
  fuel_2: Scalars["String"];
  pods: Scalars["Int"];
  thrust: Force;
  type: Scalars["String"];
};
export type DragonTrunk = {
  cargo: DragonTrunkCargo;
  trunk_volume: Volume;
};
export type DragonTrunkCargo = {
  solar_array: Scalars["Int"];
  unpressurized_cargo: Scalars["Boolean"];
};
export type Force = {
  kN: Scalars["Float"];
  lbf: Scalars["Float"];
};
export type HistoriesResult = {
  data: History[];
  result: Result;
};
export type History = {
  details: Scalars["String"];
  event_date_unix: Scalars["Date"];
  event_date_utc: Scalars["Date"];
  flight: Launch;
  id: Scalars["ID"];
  links: Link;
  title: Scalars["String"];
};
export type Info = {
  ceo: Scalars["String"];
  coo: Scalars["String"];
  cto: Scalars["String"];
  cto_propulsion: Scalars["String"];
  employees: Scalars["Int"];
  founded: Scalars["Int"];
  founder: Scalars["String"];
  headquarters: Address;
  launch_sites: Scalars["Int"];
  links: InfoLinks;
  name: Scalars["String"];
  summary: Scalars["String"];
  test_sites: Scalars["Int"];
  valuation: Scalars["Float"];
  vehicles: Scalars["Int"];
};
export type InfoLinks = {
  elon_twitter: Scalars["String"];
  flickr: Scalars["String"];
  twitter: Scalars["String"];
  website: Scalars["String"];
};
export type Landpad = {
  attempted_landings: Scalars["String"];
  details: Scalars["String"];
  full_name: Scalars["String"];
  id: Scalars["ID"];
  landing_type: Scalars["String"];
  location: Location;
  status: Scalars["String"];
  successful_landings: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type Launch = {
  details: Scalars["String"];
  id: Scalars["ID"];
  is_tentative: Scalars["Boolean"];
  launch_date_local: Scalars["Date"];
  launch_date_unix: Scalars["Date"];
  launch_date_utc: Scalars["Date"];
  launch_site: LaunchSite;
  launch_success: Scalars["Boolean"];
  launch_year: Scalars["String"];
  links: LaunchLinks;
  mission_id: Scalars["String"][];
  mission_name: Scalars["String"];
  rocket: LaunchRocket;
  ships: Ship[];
  static_fire_date_unix: Scalars["Date"];
  static_fire_date_utc: Scalars["Date"];
  telemetry: LaunchTelemetry;
  tentative_max_precision: Scalars["String"];
  upcoming: Scalars["Boolean"];
};
export type LaunchLinks = {
  article_link: Scalars["String"];
  flickr_images: Scalars["String"][];
  mission_patch: Scalars["String"];
  mission_patch_small: Scalars["String"];
  presskit: Scalars["String"];
  reddit_campaign: Scalars["String"];
  reddit_launch: Scalars["String"];
  reddit_media: Scalars["String"];
  reddit_recovery: Scalars["String"];
  video_link: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type LaunchRocket = {
  fairings: LaunchRocketFairings;
  first_stage: LaunchRocketFirstStage;
  rocket: Rocket;
  rocket_name: Scalars["String"];
  rocket_type: Scalars["String"];
  second_stage: LaunchRocketSecondStage;
};
export type LaunchRocketFairings = {
  recovered: Scalars["Boolean"];
  recovery_attempt: Scalars["Boolean"];
  reused: Scalars["Boolean"];
  ship: Scalars["String"];
};
export type LaunchRocketFirstStage = {
  cores: LaunchRocketFirstStageCore[];
};
export type LaunchRocketFirstStageCore = {
  block: Scalars["Int"];
  core: Core;
  flight: Scalars["Int"];
  gridfins: Scalars["Boolean"];
  land_success: Scalars["Boolean"];
  landing_intent: Scalars["Boolean"];
  landing_type: Scalars["String"];
  landing_vehicle: Scalars["String"];
  legs: Scalars["Boolean"];
  reused: Scalars["Boolean"];
};
export type LaunchRocketSecondStage = {
  block: Scalars["Int"];
  payloads: Payload[];
};
export type LaunchSite = {
  site_id: Scalars["String"];
  site_name: Scalars["String"];
  site_name_long: Scalars["String"];
};
export type LaunchTelemetry = {
  flight_club: Scalars["String"];
};
export type LaunchesPastResult = {
  data: Launch[];
  result: Result;
};
export type Launchpad = {
  attempted_launches: Scalars["Int"];
  details: Scalars["String"];
  id: Scalars["ID"];
  location: Location;
  name: Scalars["String"];
  status: Scalars["String"];
  successful_launches: Scalars["Int"];
  vehicles_launched: Rocket[];
  wikipedia: Scalars["String"];
};
export type Link = {
  article: Scalars["String"];
  reddit: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type Location = {
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  name: Scalars["String"];
  region: Scalars["String"];
};
export type Mass = {
  kg: Scalars["Int"];
  lb: Scalars["Int"];
};
export type Mission = {
  description: Scalars["String"];
  id: Scalars["ID"];
  manufacturers: Scalars["String"][];
  name: Scalars["String"];
  payloads: Payload[];
  twitter: Scalars["String"];
  website: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type MissionResult = {
  data: Mission[];
  result: Result;
};
export type Payload = {
  customers: Scalars["String"][];
  id: Scalars["ID"];
  manufacturer: Scalars["String"];
  nationality: Scalars["String"];
  norad_id: Scalars["Int"][];
  orbit: Scalars["String"];
  orbit_params: PayloadOrbitParams;
  payload_mass_kg: Scalars["Float"];
  payload_mass_lbs: Scalars["Float"];
  payload_type: Scalars["String"];
  reused: Scalars["Boolean"];
};
export type PayloadOrbitParams = {
  apoapsis_km: Scalars["Float"];
  arg_of_pericenter: Scalars["Float"];
  eccentricity: Scalars["Float"];
  epoch: Scalars["Date"];
  inclination_deg: Scalars["Float"];
  lifespan_years: Scalars["Float"];
  longitude: Scalars["Float"];
  mean_anomaly: Scalars["Float"];
  mean_motion: Scalars["Float"];
  periapsis_km: Scalars["Float"];
  period_min: Scalars["Float"];
  raan: Scalars["Float"];
  reference_system: Scalars["String"];
  regime: Scalars["String"];
  semi_major_axis_km: Scalars["Float"];
};
export type Result = {
  totalCount: Scalars["Int"];
};
export type Roadster = {
  apoapsis_au: Scalars["Float"];
  details: Scalars["String"];
  earth_distance_km: Scalars["Float"];
  earth_distance_mi: Scalars["Float"];
  eccentricity: Scalars["Float"];
  epoch_jd: Scalars["Float"];
  inclination: Scalars["Float"];
  launch_date_unix: Scalars["Date"];
  launch_date_utc: Scalars["Date"];
  launch_mass_kg: Scalars["Int"];
  launch_mass_lbs: Scalars["Int"];
  longitude: Scalars["Float"];
  mars_distance_km: Scalars["Float"];
  mars_distance_mi: Scalars["Float"];
  name: Scalars["String"];
  norad_id: Scalars["Int"];
  orbit_type: Scalars["Float"];
  periapsis_arg: Scalars["Float"];
  periapsis_au: Scalars["Float"];
  period_days: Scalars["Float"];
  semi_major_axis_au: Scalars["Float"];
  speed_kph: Scalars["Float"];
  speed_mph: Scalars["Float"];
  wikipedia: Scalars["String"];
};
export type Rocket = {
  active: Scalars["Boolean"];
  boosters: Scalars["Int"];
  company: Scalars["String"];
  cost_per_launch: Scalars["Int"];
  country: Scalars["String"];
  description: Scalars["String"];
  diameter: Distance;
  engines: RocketEngines;
  first_flight: Scalars["Date"];
  first_stage: RocketFirstStage;
  height: Distance;
  id: Scalars["ID"];
  landing_legs: RocketLandingLegs;
  mass: Mass;
  name: Scalars["String"];
  payload_weights: RocketPayloadWeight[];
  second_stage: RocketSecondStage;
  stages: Scalars["Int"];
  success_rate_pct: Scalars["Int"];
  type: Scalars["String"];
  wikipedia: Scalars["String"];
};
export type RocketEngines = {
  engine_loss_max: Scalars["String"];
  layout: Scalars["String"];
  number: Scalars["Int"];
  propellant_1: Scalars["String"];
  propellant_2: Scalars["String"];
  thrust_sea_level: Force;
  thrust_to_weight: Scalars["Float"];
  thrust_vacuum: Force;
  type: Scalars["String"];
  version: Scalars["String"];
};
export type RocketFirstStage = {
  burn_time_sec: Scalars["Int"];
  engines: Scalars["Int"];
  fuel_amount_tons: Scalars["Float"];
  reusable: Scalars["Boolean"];
  thrust_sea_level: Force;
  thrust_vacuum: Force;
};
export type RocketLandingLegs = {
  material: Scalars["String"];
  number: Scalars["Int"];
};
export type RocketPayloadWeight = {
  id: Scalars["String"];
  kg: Scalars["Int"];
  lb: Scalars["Int"];
  name: Scalars["String"];
};
export type RocketSecondStage = {
  burn_time_sec: Scalars["Int"];
  engines: Scalars["Int"];
  fuel_amount_tons: Scalars["Float"];
  payloads: RocketSecondStagePayloads;
  thrust: Force;
};
export type RocketSecondStagePayloadCompositeFairing = {
  diameter: Distance;
  height: Distance;
};
export type RocketSecondStagePayloads = {
  composite_fairing: RocketSecondStagePayloadCompositeFairing;
  option_1: Scalars["String"];
};
export type RocketsResult = {
  data: Rocket[];
  result: Result;
};
export type Ship = {
  abs: Scalars["Int"];
  active: Scalars["Boolean"];
  attempted_landings: Scalars["Int"];
  class: Scalars["Int"];
  course_deg: Scalars["Int"];
  home_port: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  imo: Scalars["Int"];
  missions: ShipMission[];
  mmsi: Scalars["Int"];
  model: Scalars["String"];
  name: Scalars["String"];
  position: ShipLocation;
  roles: Scalars["String"][];
  speed_kn: Scalars["Float"];
  status: Scalars["String"];
  successful_landings: Scalars["Int"];
  type: Scalars["String"];
  url: Scalars["String"];
  weight_kg: Scalars["Int"];
  weight_lbs: Scalars["Int"];
  year_built: Scalars["Int"];
};
export type ShipLocation = {
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};
export type ShipMission = {
  flight: Scalars["String"];
  name: Scalars["String"];
};
export type ShipsResult = {
  data: Ship[];
  result: Result;
};
export type Volume = {
  cubic_feet: Scalars["Int"];
  cubic_meters: Scalars["Int"];
};
export type users = {
  id: Scalars["uuid"];
  name: Scalars["String"];
  rocket: Scalars["String"];
  timestamp: Scalars["timestamptz"];
  twitter: Scalars["String"];
};
export type users_aggregate = {
  aggregate: users_aggregate_fields;
  nodes: users[];
};
export type users_aggregate_fields = {
  count: Scalars["Int"];
  max: users_max_fields;
  min: users_min_fields;
};
export type users_max_fields = {
  name: Scalars["String"];
  rocket: Scalars["String"];
  timestamp: Scalars["timestamptz"];
  twitter: Scalars["String"];
};
export type users_min_fields = {
  name: Scalars["String"];
  rocket: Scalars["String"];
  timestamp: Scalars["timestamptz"];
  twitter: Scalars["String"];
};
export type users_mutation_response = {
  affected_rows: Scalars["Int"];
  returning: users[];
};
export type _Service = {
  sdl: Scalars["String"];
};

// Query
export type Query = {
  capsule: Nullable<Capsule>;
  capsules: Nullable<Capsule[]>;
  capsulesPast: Nullable<Capsule[]>;
  capsulesUpcoming: Nullable<Capsule[]>;
  company: Nullable<Info>;
  core: Nullable<Core>;
  cores: Nullable<Core[]>;
  coresPast: Nullable<Core[]>;
  coresUpcoming: Nullable<Core[]>;
  dragon: Nullable<Dragon>;
  dragons: Nullable<Dragon[]>;
  histories: Nullable<History[]>;
  historiesResult: Nullable<HistoriesResult>;
  history: Nullable<History>;
  landpad: Nullable<Landpad>;
  landpads: Nullable<Landpad[]>;
  launch: Nullable<Launch>;
  launchLatest: Nullable<Launch>;
  launchNext: Nullable<Launch>;
  launches: Nullable<Launch[]>;
  launchesPast: Nullable<Launch[]>;
  launchesPastResult: Nullable<LaunchesPastResult>;
  launchesUpcoming: Nullable<Launch[]>;
  launchpad: Nullable<Launchpad>;
  launchpads: Nullable<Launchpad[]>;
  mission: Nullable<Mission>;
  missions: Nullable<Mission[]>;
  missionsResult: Nullable<MissionResult>;
  payload: Nullable<Payload>;
  payloads: Nullable<Payload[]>;
  roadster: Nullable<Roadster>;
  rocket: Nullable<Rocket>;
  rockets: Nullable<Rocket[]>;
  rocketsResult: Nullable<RocketsResult>;
  ship: Nullable<Ship>;
  ships: Nullable<Ship[]>;
  shipsResult: Nullable<ShipsResult>;
  users: users[];
  users_aggregate: users_aggregate;
  users_by_pk: Nullable<users>;
  _service: _Service;
} & ObjectType;

// Schema

export type Schema = {
  query: Query;
};

// Internal objects
export type QueryAddress = {
  address?: boolean;
  city?: boolean;
  state?: boolean;
};
export type QueryCapsule = {
  dragon?: QueryDragon;
  id?: boolean;
  landings?: boolean;
  missions?: QueryCapsuleMission;
  original_launch?: boolean;
  reuse_count?: boolean;
  status?: boolean;
  type?: boolean;
};
export type QueryCapsuleMission = {
  flight?: boolean;
  name?: boolean;
};
export type QueryCore = {
  asds_attempts?: boolean;
  asds_landings?: boolean;
  block?: boolean;
  id?: boolean;
  missions?: QueryCapsuleMission;
  original_launch?: boolean;
  reuse_count?: boolean;
  rtls_attempts?: boolean;
  rtls_landings?: boolean;
  status?: boolean;
  water_landing?: boolean;
};
export type QueryCoreMission = {
  flight?: boolean;
  name?: boolean;
};
export type QueryDistance = {
  feet?: boolean;
  meters?: boolean;
};
export type QueryDragon = {
  active?: boolean;
  crew_capacity?: boolean;
  description?: boolean;
  diameter?: QueryDistance;
  dry_mass_kg?: boolean;
  dry_mass_lb?: boolean;
  first_flight?: boolean;
  heat_shield?: QueryDragonHeatShield;
  height_w_trunk?: QueryDistance;
  id?: boolean;
  launch_payload_mass?: QueryMass;
  launch_payload_vol?: QueryVolume;
  name?: boolean;
  orbit_duration_yr?: boolean;
  pressurized_capsule?: QueryDragonPressurizedCapsule;
  return_payload_mass?: QueryMass;
  return_payload_vol?: QueryVolume;
  sidewall_angle_deg?: boolean;
  thrusters?: QueryDragonThrust;
  trunk?: QueryDragonTrunk;
  type?: boolean;
  wikipedia?: boolean;
};
export type QueryDragonHeatShield = {
  dev_partner?: boolean;
  material?: boolean;
  size_meters?: boolean;
  temp_degrees?: boolean;
};
export type QueryDragonPressurizedCapsule = {
  payload_volume?: QueryVolume;
};
export type QueryDragonThrust = {
  amount?: boolean;
  fuel_1?: boolean;
  fuel_2?: boolean;
  pods?: boolean;
  thrust?: QueryForce;
  type?: boolean;
};
export type QueryDragonTrunk = {
  cargo?: QueryDragonTrunkCargo;
  trunk_volume?: QueryVolume;
};
export type QueryDragonTrunkCargo = {
  solar_array?: boolean;
  unpressurized_cargo?: boolean;
};
export type QueryForce = {
  kN?: boolean;
  lbf?: boolean;
};
export type QueryHistoriesResult = {
  data?: QueryHistory;
  result?: QueryResult;
};
export type QueryHistory = {
  details?: boolean;
  event_date_unix?: boolean;
  event_date_utc?: boolean;
  flight?: QueryLaunch;
  id?: boolean;
  links?: QueryLink;
  title?: boolean;
};
export type QueryInfo = {
  ceo?: boolean;
  coo?: boolean;
  cto?: boolean;
  cto_propulsion?: boolean;
  employees?: boolean;
  founded?: boolean;
  founder?: boolean;
  headquarters?: QueryAddress;
  launch_sites?: boolean;
  links?: QueryInfoLinks;
  name?: boolean;
  summary?: boolean;
  test_sites?: boolean;
  valuation?: boolean;
  vehicles?: boolean;
};
export type QueryInfoLinks = {
  elon_twitter?: boolean;
  flickr?: boolean;
  twitter?: boolean;
  website?: boolean;
};
export type QueryLandpad = {
  attempted_landings?: boolean;
  details?: boolean;
  full_name?: boolean;
  id?: boolean;
  landing_type?: boolean;
  location?: QueryLocation;
  status?: boolean;
  successful_landings?: boolean;
  wikipedia?: boolean;
};
export type QueryLaunch = {
  details?: boolean;
  id?: boolean;
  is_tentative?: boolean;
  launch_date_local?: boolean;
  launch_date_unix?: boolean;
  launch_date_utc?: boolean;
  launch_site?: QueryLaunchSite;
  launch_success?: boolean;
  launch_year?: boolean;
  links?: QueryLaunchLinks;
  mission_id?: boolean;
  mission_name?: boolean;
  rocket?: QueryLaunchRocket;
  ships?: QueryShip;
  static_fire_date_unix?: boolean;
  static_fire_date_utc?: boolean;
  telemetry?: QueryLaunchTelemetry;
  tentative_max_precision?: boolean;
  upcoming?: boolean;
};
export type QueryLaunchLinks = {
  article_link?: boolean;
  flickr_images?: boolean;
  mission_patch?: boolean;
  mission_patch_small?: boolean;
  presskit?: boolean;
  reddit_campaign?: boolean;
  reddit_launch?: boolean;
  reddit_media?: boolean;
  reddit_recovery?: boolean;
  video_link?: boolean;
  wikipedia?: boolean;
};
export type QueryLaunchRocket = {
  fairings?: QueryLaunchRocketFairings;
  first_stage?: QueryLaunchRocketFirstStage;
  rocket?: QueryRocket;
  rocket_name?: boolean;
  rocket_type?: boolean;
  second_stage?: QueryLaunchRocketSecondStage;
};
export type QueryLaunchRocketFairings = {
  recovered?: boolean;
  recovery_attempt?: boolean;
  reused?: boolean;
  ship?: boolean;
};
export type QueryLaunchRocketFirstStage = {
  cores?: QueryLaunchRocketFirstStageCore;
};
export type QueryLaunchRocketFirstStageCore = {
  block?: boolean;
  core?: QueryCore;
  flight?: boolean;
  gridfins?: boolean;
  land_success?: boolean;
  landing_intent?: boolean;
  landing_type?: boolean;
  landing_vehicle?: boolean;
  legs?: boolean;
  reused?: boolean;
};
export type QueryLaunchRocketSecondStage = {
  block?: boolean;
  payloads?: QueryPayload;
};
export type QueryLaunchSite = {
  site_id?: boolean;
  site_name?: boolean;
  site_name_long?: boolean;
};
export type QueryLaunchTelemetry = {
  flight_club?: boolean;
};
export type QueryLaunchesPastResult = {
  data?: QueryLaunch;
  result?: QueryResult;
};
export type QueryLaunchpad = {
  attempted_launches?: boolean;
  details?: boolean;
  id?: boolean;
  location?: QueryLocation;
  name?: boolean;
  status?: boolean;
  successful_launches?: boolean;
  vehicles_launched?: QueryRocket;
  wikipedia?: boolean;
};
export type QueryLink = {
  article?: boolean;
  reddit?: boolean;
  wikipedia?: boolean;
};
export type QueryLocation = {
  latitude?: boolean;
  longitude?: boolean;
  name?: boolean;
  region?: boolean;
};
export type QueryMass = {
  kg?: boolean;
  lb?: boolean;
};
export type QueryMission = {
  description?: boolean;
  id?: boolean;
  manufacturers?: boolean;
  name?: boolean;
  payloads?: QueryPayload;
  twitter?: boolean;
  website?: boolean;
  wikipedia?: boolean;
};
export type QueryMissionResult = {
  data?: QueryMission;
  result?: QueryResult;
};
export type QueryPayload = {
  customers?: boolean;
  id?: boolean;
  manufacturer?: boolean;
  nationality?: boolean;
  norad_id?: boolean;
  orbit?: boolean;
  orbit_params?: QueryPayloadOrbitParams;
  payload_mass_kg?: boolean;
  payload_mass_lbs?: boolean;
  payload_type?: boolean;
  reused?: boolean;
};
export type QueryPayloadOrbitParams = {
  apoapsis_km?: boolean;
  arg_of_pericenter?: boolean;
  eccentricity?: boolean;
  epoch?: boolean;
  inclination_deg?: boolean;
  lifespan_years?: boolean;
  longitude?: boolean;
  mean_anomaly?: boolean;
  mean_motion?: boolean;
  periapsis_km?: boolean;
  period_min?: boolean;
  raan?: boolean;
  reference_system?: boolean;
  regime?: boolean;
  semi_major_axis_km?: boolean;
};
export type QueryResult = {
  totalCount?: boolean;
};
export type QueryRoadster = {
  apoapsis_au?: boolean;
  details?: boolean;
  earth_distance_km?: boolean;
  earth_distance_mi?: boolean;
  eccentricity?: boolean;
  epoch_jd?: boolean;
  inclination?: boolean;
  launch_date_unix?: boolean;
  launch_date_utc?: boolean;
  launch_mass_kg?: boolean;
  launch_mass_lbs?: boolean;
  longitude?: boolean;
  mars_distance_km?: boolean;
  mars_distance_mi?: boolean;
  name?: boolean;
  norad_id?: boolean;
  orbit_type?: boolean;
  periapsis_arg?: boolean;
  periapsis_au?: boolean;
  period_days?: boolean;
  semi_major_axis_au?: boolean;
  speed_kph?: boolean;
  speed_mph?: boolean;
  wikipedia?: boolean;
};
export type QueryRocket = {
  active?: boolean;
  boosters?: boolean;
  company?: boolean;
  cost_per_launch?: boolean;
  country?: boolean;
  description?: boolean;
  diameter?: QueryDistance;
  engines?: QueryRocketEngines;
  first_flight?: boolean;
  first_stage?: QueryRocketFirstStage;
  height?: QueryDistance;
  id?: boolean;
  landing_legs?: QueryRocketLandingLegs;
  mass?: QueryMass;
  name?: boolean;
  payload_weights?: QueryRocketPayloadWeight;
  second_stage?: QueryRocketSecondStage;
  stages?: boolean;
  success_rate_pct?: boolean;
  type?: boolean;
  wikipedia?: boolean;
};
export type QueryRocketEngines = {
  engine_loss_max?: boolean;
  layout?: boolean;
  number?: boolean;
  propellant_1?: boolean;
  propellant_2?: boolean;
  thrust_sea_level?: QueryForce;
  thrust_to_weight?: boolean;
  thrust_vacuum?: QueryForce;
  type?: boolean;
  version?: boolean;
};
export type QueryRocketFirstStage = {
  burn_time_sec?: boolean;
  engines?: boolean;
  fuel_amount_tons?: boolean;
  reusable?: boolean;
  thrust_sea_level?: QueryForce;
  thrust_vacuum?: QueryForce;
};
export type QueryRocketLandingLegs = {
  material?: boolean;
  number?: boolean;
};
export type QueryRocketPayloadWeight = {
  id?: boolean;
  kg?: boolean;
  lb?: boolean;
  name?: boolean;
};
export type QueryRocketSecondStage = {
  burn_time_sec?: boolean;
  engines?: boolean;
  fuel_amount_tons?: boolean;
  payloads?: QueryRocketSecondStagePayloads;
  thrust?: QueryForce;
};
export type QueryRocketSecondStagePayloadCompositeFairing = {
  diameter?: QueryDistance;
  height?: QueryDistance;
};
export type QueryRocketSecondStagePayloads = {
  composite_fairing?: QueryRocketSecondStagePayloadCompositeFairing;
  option_1?: boolean;
};
export type QueryRocketsResult = {
  data?: QueryRocket;
  result?: QueryResult;
};
export type QueryShip = {
  abs?: boolean;
  active?: boolean;
  attempted_landings?: boolean;
  class?: boolean;
  course_deg?: boolean;
  home_port?: boolean;
  id?: boolean;
  image?: boolean;
  imo?: boolean;
  missions?: QueryShipMission;
  mmsi?: boolean;
  model?: boolean;
  name?: boolean;
  position?: QueryShipLocation;
  roles?: boolean;
  speed_kn?: boolean;
  status?: boolean;
  successful_landings?: boolean;
  type?: boolean;
  url?: boolean;
  weight_kg?: boolean;
  weight_lbs?: boolean;
  year_built?: boolean;
};
export type QueryShipLocation = {
  latitude?: boolean;
  longitude?: boolean;
};
export type QueryShipMission = {
  flight?: boolean;
  name?: boolean;
};
export type QueryShipsResult = {
  data?: QueryShip;
  result?: QueryResult;
};
export type QueryVolume = {
  cubic_feet?: boolean;
  cubic_meters?: boolean;
};
export type Queryusers = {
  id?: boolean;
  name?: boolean;
  rocket?: boolean;
  timestamp?: boolean;
  twitter?: boolean;
};
export type Queryusers_aggregate = {
  aggregate?: Queryusers_aggregate_fields;
  nodes?: Queryusers;
};
export type Queryusers_aggregate_fields = {
  count?: ResolverWithArguments<
    { columns: Scalars["Any"][]; distinct?: Scalars["Boolean"] },
    boolean
  >;
  max?: Queryusers_max_fields;
  min?: Queryusers_min_fields;
};
export type Queryusers_max_fields = {
  name?: boolean;
  rocket?: boolean;
  timestamp?: boolean;
  twitter?: boolean;
};
export type Queryusers_min_fields = {
  name?: boolean;
  rocket?: boolean;
  timestamp?: boolean;
  twitter?: boolean;
};
export type Queryusers_mutation_response = {
  affected_rows?: boolean;
  returning?: Queryusers;
};
export type Query_Service = {
  sdl?: boolean;
};

// Params
export type Params = {
  capsule?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryCapsule>;
  capsules?: ResolverWithArguments<
    {
      find?: CapsulesFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCapsule
  >;
  capsulesPast?: ResolverWithArguments<
    {
      find?: CapsulesFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCapsule
  >;
  capsulesUpcoming?: ResolverWithArguments<
    {
      find?: CapsulesFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCapsule
  >;
  company?: QueryInfo;
  core?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryCore>;
  cores?: ResolverWithArguments<
    {
      find?: CoresFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCore
  >;
  coresPast?: ResolverWithArguments<
    {
      find?: CoresFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCore
  >;
  coresUpcoming?: ResolverWithArguments<
    {
      find?: CoresFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryCore
  >;
  dragon?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryDragon>;
  dragons?: ResolverWithArguments<
    { limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryDragon
  >;
  histories?: ResolverWithArguments<
    {
      find?: HistoryFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryHistory
  >;
  historiesResult?: ResolverWithArguments<
    {
      find?: HistoryFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryHistoriesResult
  >;
  history?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryHistory>;
  landpad?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryLandpad>;
  landpads?: ResolverWithArguments<
    { limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryLandpad
  >;
  launch?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryLaunch>;
  launchLatest?: ResolverWithArguments<
    { offset?: Scalars["Int"] },
    QueryLaunch
  >;
  launchNext?: ResolverWithArguments<{ offset?: Scalars["Int"] }, QueryLaunch>;
  launches?: ResolverWithArguments<
    {
      find?: LaunchFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryLaunch
  >;
  launchesPast?: ResolverWithArguments<
    {
      find?: LaunchFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryLaunch
  >;
  launchesPastResult?: ResolverWithArguments<
    {
      find?: LaunchFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryLaunchesPastResult
  >;
  launchesUpcoming?: ResolverWithArguments<
    {
      find?: LaunchFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryLaunch
  >;
  launchpad?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryLaunchpad>;
  launchpads?: ResolverWithArguments<
    { limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryLaunchpad
  >;
  mission?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryMission>;
  missions?: ResolverWithArguments<
    { find?: MissionsFind; limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryMission
  >;
  missionsResult?: ResolverWithArguments<
    { find?: MissionsFind; limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryMissionResult
  >;
  payload?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryPayload>;
  payloads?: ResolverWithArguments<
    {
      find?: PayloadsFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryPayload
  >;
  roadster?: QueryRoadster;
  rocket?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryRocket>;
  rockets?: ResolverWithArguments<
    { limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryRocket
  >;
  rocketsResult?: ResolverWithArguments<
    { limit?: Scalars["Int"]; offset?: Scalars["Int"] },
    QueryRocketsResult
  >;
  ship?: ResolverWithArguments<{ id: Scalars["ID"] }, QueryShip>;
  ships?: ResolverWithArguments<
    {
      find?: ShipsFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryShip
  >;
  shipsResult?: ResolverWithArguments<
    {
      find?: ShipsFind;
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order?: Scalars["String"];
      sort?: Scalars["String"];
    },
    QueryShipsResult
  >;
  users?: ResolverWithArguments<
    {
      distinct_on: Scalars["Any"][];
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order_by: Scalars["Any"][];
      where?: users_bool_exp;
    },
    Queryusers
  >;
  users_aggregate?: ResolverWithArguments<
    {
      distinct_on: Scalars["Any"][];
      limit?: Scalars["Int"];
      offset?: Scalars["Int"];
      order_by: Scalars["Any"][];
      where?: users_bool_exp;
    },
    Queryusers_aggregate
  >;
  users_by_pk?: ResolverWithArguments<{ id: Scalars["uuid"] }, Queryusers>;
  _service?: Query_Service;
};

type GraphResponseResolver<
  Resolver extends any,
  Comparer extends ObjectType,
> = Comparer extends any[]
  ? GraphResponseResolver<Resolver, Comparer[number]>[]
  : {
      [K in keyof Resolver & string]: Comparer[K] extends object[]
        ? Resolver[K] extends ResolverWithArguments<any, any>
          ? GraphResponseResolver<Resolver[K]["fields"], Comparer[K][number]>[]
          : GraphResponseResolver<Resolver[K], Comparer[K][number]>[]
        : Comparer[K] extends object
        ? GraphResponseResolver<Resolver[K], Comparer[K]>
        : Comparer[K];
    };

// Root resolver

export type QueryResponseResolver<Resolver extends Params> = {
  [K in keyof Resolver & string]: Resolver[K] extends ResolverWithArguments<
    any,
    any
  >
    ? IsNullable<Query[K]> extends true
      ? GraphResponseResolver<Resolver[K]["fields"], Query[K]> | null
      : GraphResponseResolver<Resolver[K]["fields"], Query[K]>
    : IsNullable<Query[K]> extends true
    ? GraphResponseResolver<Resolver[K], Query[K]> | null
    : GraphResponseResolver<Resolver[K], Query[K]>;
};
