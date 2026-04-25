/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessToken: {
    store: typeof routes['access_token.store']
    destroy: typeof routes['access_token.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  interrested: {
    index: typeof routes['interrested.index']
    create: typeof routes['interrested.create']
    store: typeof routes['interrested.store']
    show: typeof routes['interrested.show']
    edit: typeof routes['interrested.edit']
    update: typeof routes['interrested.update']
    destroy: typeof routes['interrested.destroy']
  }
  member: {
    index: typeof routes['member.index']
    create: typeof routes['member.create']
    store: typeof routes['member.store']
    show: typeof routes['member.show']
    edit: typeof routes['member.edit']
    update: typeof routes['member.update']
    destroy: typeof routes['member.destroy']
  }
  project: {
    index: typeof routes['project.index']
    create: typeof routes['project.create']
    store: typeof routes['project.store']
    show: typeof routes['project.show']
    edit: typeof routes['project.edit']
    update: typeof routes['project.update']
    destroy: typeof routes['project.destroy']
  }
  team: {
    index: typeof routes['team.index']
    create: typeof routes['team.create']
    store: typeof routes['team.store']
    show: typeof routes['team.show']
    edit: typeof routes['team.edit']
    update: typeof routes['team.update']
    destroy: typeof routes['team.destroy']
  }
}
