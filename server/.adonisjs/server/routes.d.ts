import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'interrested.index': { paramsTuple?: []; params?: {} }
    'interrested.create': { paramsTuple?: []; params?: {} }
    'interrested.store': { paramsTuple?: []; params?: {} }
    'interrested.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'interrested.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'interrested.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'interrested.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.index': { paramsTuple?: []; params?: {} }
    'member.create': { paramsTuple?: []; params?: {} }
    'member.store': { paramsTuple?: []; params?: {} }
    'member.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.index': { paramsTuple?: []; params?: {} }
    'project.create': { paramsTuple?: []; params?: {} }
    'project.store': { paramsTuple?: []; params?: {} }
    'project.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.index': { paramsTuple?: []; params?: {} }
    'team.create': { paramsTuple?: []; params?: {} }
    'team.store': { paramsTuple?: []; params?: {} }
    'team.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_token.store': { paramsTuple?: []; params?: {} }
    'access_token.destroy': { paramsTuple?: []; params?: {} }
    'interrested.store': { paramsTuple?: []; params?: {} }
    'member.store': { paramsTuple?: []; params?: {} }
    'project.store': { paramsTuple?: []; params?: {} }
    'team.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'interrested.index': { paramsTuple?: []; params?: {} }
    'interrested.create': { paramsTuple?: []; params?: {} }
    'interrested.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'interrested.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.index': { paramsTuple?: []; params?: {} }
    'member.create': { paramsTuple?: []; params?: {} }
    'member.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.index': { paramsTuple?: []; params?: {} }
    'project.create': { paramsTuple?: []; params?: {} }
    'project.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.index': { paramsTuple?: []; params?: {} }
    'team.create': { paramsTuple?: []; params?: {} }
    'team.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'interrested.index': { paramsTuple?: []; params?: {} }
    'interrested.create': { paramsTuple?: []; params?: {} }
    'interrested.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'interrested.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.index': { paramsTuple?: []; params?: {} }
    'member.create': { paramsTuple?: []; params?: {} }
    'member.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.index': { paramsTuple?: []; params?: {} }
    'project.create': { paramsTuple?: []; params?: {} }
    'project.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.index': { paramsTuple?: []; params?: {} }
    'team.create': { paramsTuple?: []; params?: {} }
    'team.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'interrested.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'interrested.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'interrested.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'member.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'project.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'team.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}