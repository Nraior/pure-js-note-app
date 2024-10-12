export class Note {
  identifier = null;
  domObj = null;

  constructor(identifier, obj, domObj) {
    this.identifier = identifier;
    this.obj = obj;
    this.domObj = domObj;
  }
}
