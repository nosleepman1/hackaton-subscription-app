/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_token.store']['types'],
  },
  'access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_token.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'interrested.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/interrested',
    tokens: [{"old":"/api/v1/interrested","type":0,"val":"api","end":""},{"old":"/api/v1/interrested","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested","type":0,"val":"interrested","end":""}],
    types: placeholder as Registry['interrested.index']['types'],
  },
  'interrested.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/interrested/create',
    tokens: [{"old":"/api/v1/interrested/create","type":0,"val":"api","end":""},{"old":"/api/v1/interrested/create","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested/create","type":0,"val":"interrested","end":""},{"old":"/api/v1/interrested/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['interrested.create']['types'],
  },
  'interrested.store': {
    methods: ["POST"],
    pattern: '/api/v1/interrested',
    tokens: [{"old":"/api/v1/interrested","type":0,"val":"api","end":""},{"old":"/api/v1/interrested","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested","type":0,"val":"interrested","end":""}],
    types: placeholder as Registry['interrested.store']['types'],
  },
  'interrested.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/interrested/:id',
    tokens: [{"old":"/api/v1/interrested/:id","type":0,"val":"api","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"interrested","end":""},{"old":"/api/v1/interrested/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['interrested.show']['types'],
  },
  'interrested.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/interrested/:id/edit',
    tokens: [{"old":"/api/v1/interrested/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/interrested/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested/:id/edit","type":0,"val":"interrested","end":""},{"old":"/api/v1/interrested/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/interrested/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['interrested.edit']['types'],
  },
  'interrested.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/interrested/:id',
    tokens: [{"old":"/api/v1/interrested/:id","type":0,"val":"api","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"interrested","end":""},{"old":"/api/v1/interrested/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['interrested.update']['types'],
  },
  'interrested.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/interrested/:id',
    tokens: [{"old":"/api/v1/interrested/:id","type":0,"val":"api","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/interrested/:id","type":0,"val":"interrested","end":""},{"old":"/api/v1/interrested/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['interrested.destroy']['types'],
  },
  'member.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/member',
    tokens: [{"old":"/api/v1/member","type":0,"val":"api","end":""},{"old":"/api/v1/member","type":0,"val":"v1","end":""},{"old":"/api/v1/member","type":0,"val":"member","end":""}],
    types: placeholder as Registry['member.index']['types'],
  },
  'member.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/member/create',
    tokens: [{"old":"/api/v1/member/create","type":0,"val":"api","end":""},{"old":"/api/v1/member/create","type":0,"val":"v1","end":""},{"old":"/api/v1/member/create","type":0,"val":"member","end":""},{"old":"/api/v1/member/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['member.create']['types'],
  },
  'member.store': {
    methods: ["POST"],
    pattern: '/api/v1/member',
    tokens: [{"old":"/api/v1/member","type":0,"val":"api","end":""},{"old":"/api/v1/member","type":0,"val":"v1","end":""},{"old":"/api/v1/member","type":0,"val":"member","end":""}],
    types: placeholder as Registry['member.store']['types'],
  },
  'member.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/member/:id',
    tokens: [{"old":"/api/v1/member/:id","type":0,"val":"api","end":""},{"old":"/api/v1/member/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/member/:id","type":0,"val":"member","end":""},{"old":"/api/v1/member/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['member.show']['types'],
  },
  'member.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/member/:id/edit',
    tokens: [{"old":"/api/v1/member/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/member/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/member/:id/edit","type":0,"val":"member","end":""},{"old":"/api/v1/member/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/member/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['member.edit']['types'],
  },
  'member.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/member/:id',
    tokens: [{"old":"/api/v1/member/:id","type":0,"val":"api","end":""},{"old":"/api/v1/member/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/member/:id","type":0,"val":"member","end":""},{"old":"/api/v1/member/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['member.update']['types'],
  },
  'member.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/member/:id',
    tokens: [{"old":"/api/v1/member/:id","type":0,"val":"api","end":""},{"old":"/api/v1/member/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/member/:id","type":0,"val":"member","end":""},{"old":"/api/v1/member/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['member.destroy']['types'],
  },
  'project.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/project',
    tokens: [{"old":"/api/v1/project","type":0,"val":"api","end":""},{"old":"/api/v1/project","type":0,"val":"v1","end":""},{"old":"/api/v1/project","type":0,"val":"project","end":""}],
    types: placeholder as Registry['project.index']['types'],
  },
  'project.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/project/create',
    tokens: [{"old":"/api/v1/project/create","type":0,"val":"api","end":""},{"old":"/api/v1/project/create","type":0,"val":"v1","end":""},{"old":"/api/v1/project/create","type":0,"val":"project","end":""},{"old":"/api/v1/project/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['project.create']['types'],
  },
  'project.store': {
    methods: ["POST"],
    pattern: '/api/v1/project',
    tokens: [{"old":"/api/v1/project","type":0,"val":"api","end":""},{"old":"/api/v1/project","type":0,"val":"v1","end":""},{"old":"/api/v1/project","type":0,"val":"project","end":""}],
    types: placeholder as Registry['project.store']['types'],
  },
  'project.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/project/:id',
    tokens: [{"old":"/api/v1/project/:id","type":0,"val":"api","end":""},{"old":"/api/v1/project/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/project/:id","type":0,"val":"project","end":""},{"old":"/api/v1/project/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['project.show']['types'],
  },
  'project.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/project/:id/edit',
    tokens: [{"old":"/api/v1/project/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/project/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/project/:id/edit","type":0,"val":"project","end":""},{"old":"/api/v1/project/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/project/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['project.edit']['types'],
  },
  'project.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/project/:id',
    tokens: [{"old":"/api/v1/project/:id","type":0,"val":"api","end":""},{"old":"/api/v1/project/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/project/:id","type":0,"val":"project","end":""},{"old":"/api/v1/project/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['project.update']['types'],
  },
  'project.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/project/:id',
    tokens: [{"old":"/api/v1/project/:id","type":0,"val":"api","end":""},{"old":"/api/v1/project/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/project/:id","type":0,"val":"project","end":""},{"old":"/api/v1/project/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['project.destroy']['types'],
  },
  'team.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/team',
    tokens: [{"old":"/api/v1/team","type":0,"val":"api","end":""},{"old":"/api/v1/team","type":0,"val":"v1","end":""},{"old":"/api/v1/team","type":0,"val":"team","end":""}],
    types: placeholder as Registry['team.index']['types'],
  },
  'team.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/team/create',
    tokens: [{"old":"/api/v1/team/create","type":0,"val":"api","end":""},{"old":"/api/v1/team/create","type":0,"val":"v1","end":""},{"old":"/api/v1/team/create","type":0,"val":"team","end":""},{"old":"/api/v1/team/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['team.create']['types'],
  },
  'team.store': {
    methods: ["POST"],
    pattern: '/api/v1/team',
    tokens: [{"old":"/api/v1/team","type":0,"val":"api","end":""},{"old":"/api/v1/team","type":0,"val":"v1","end":""},{"old":"/api/v1/team","type":0,"val":"team","end":""}],
    types: placeholder as Registry['team.store']['types'],
  },
  'team.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/team/:id',
    tokens: [{"old":"/api/v1/team/:id","type":0,"val":"api","end":""},{"old":"/api/v1/team/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/team/:id","type":0,"val":"team","end":""},{"old":"/api/v1/team/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['team.show']['types'],
  },
  'team.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/team/:id/edit',
    tokens: [{"old":"/api/v1/team/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/team/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/team/:id/edit","type":0,"val":"team","end":""},{"old":"/api/v1/team/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/team/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['team.edit']['types'],
  },
  'team.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/team/:id',
    tokens: [{"old":"/api/v1/team/:id","type":0,"val":"api","end":""},{"old":"/api/v1/team/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/team/:id","type":0,"val":"team","end":""},{"old":"/api/v1/team/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['team.update']['types'],
  },
  'team.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/team/:id',
    tokens: [{"old":"/api/v1/team/:id","type":0,"val":"api","end":""},{"old":"/api/v1/team/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/team/:id","type":0,"val":"team","end":""},{"old":"/api/v1/team/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['team.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
