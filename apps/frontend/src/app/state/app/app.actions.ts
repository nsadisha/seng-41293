export class ShowLoading {
  static readonly type = '[App] ShowLoading';
  constructor(public loading: boolean) {}
}

export class ShowEmail {
  static readonly type = '[App] ShowEmail';
  constructor(public email: string) {}
}

export class ShowToken {
  static readonly type = '[App] ShowToken';
  constructor(public token: string) {}
}