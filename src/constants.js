const tendencies = [
  'Expansionist',
  'Economic',
  'Military',
  'Objective',
  'Political',
  'Scientific',
  'Unknown',
];

class Instance {
  constructor(id = null) {
    this.id = id;
  }
}

class System extends Instance {
  constructor(number = 0, name = '', type = null, faction_id = null, anomaly_id = null, planets = []) {
    super();
    this.number = number;
    this.name = name;
    this.type = type;
    this.faction_id = faction_id;
    this.anomaly_id = anomaly_id;
    this.planets = planets;
  }
};

class Planet extends Instance {
  constructor(system_id = null, name = '', type = null, is_special = null, production = 0, influence = 0) {
    super();
    this.system_id = system_id;
    this.name = name;
    this.type = type;
    this.is_special = is_special;
    this.production = production;
    this.influence = influence;
  }
};

class Faction extends Instance {
  constructor(name = '', tendency_id = null, commodities = 0) {
    super();
    this.name = name;
    this.tendency_id = tendency_id;
    this.commodities = commodities;
  }
};

class Technology extends Instance {
  constructor(name = '', faction_id = null, technology_type_id = null, level = null) {
    super();
    this.name = name;
    this.faction_id = faction_id;
    this.technology_type_id = technology_type_id;
    this.level = level;
  }
};

class TechnologyType extends Instance {
  constructor(name = '', color = '') {
    super();
    this.name = name;
    this.color = color;
  }
};

export { tendencies, System, Planet, Faction, Technology, TechnologyType };
