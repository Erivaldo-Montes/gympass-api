export class MaxCheckInPerDay extends Error {
  constructor() {
    super('Max check in reached')
  }
}
