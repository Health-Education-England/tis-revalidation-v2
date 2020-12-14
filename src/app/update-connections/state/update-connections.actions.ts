export class EnableUpdateConnections {
  constructor(public enableUpdateConnections: boolean) {}
  static readonly type = `[UpdateConnections] Enable Update Connections`;
}

export class Get {
  static readonly type = "[UpdateConnections] Get";
  constructor() {}
}
