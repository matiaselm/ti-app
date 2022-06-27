const tendencies = [
  'Expansionist',
  'Economic',
  'Military',
  'Objective',
  'Political',
  'Scientific',
  'Unknown',
];

class System {
  constructor(number = 0, name = '', type = null, faction_id = null, anomaly_id = null, planets = []) {
      this.number = number;
      this.name = name;
      this.type = type;
      this.faction_id = faction_id;
      this.anomaly_id = anomaly_id;
      this.planets = planets;
  }
};

class Planet {
  constructor(system_id = null, name = '', type = null, is_special = null, production = 0, influence = 0) {
    this.system_id = system_id;
      this.name = name;
      this.type = type;
      this.is_special = is_special;
      this.production = production;
      this.influence = influence;
  }
};

export { tendencies, System, Planet };
