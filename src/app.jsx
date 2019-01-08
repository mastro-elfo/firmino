import React, { Component } from 'react';

import ErrorWrapper from './Components/ErrorWrapper';
import ThemeWrapper from './Components/ThemeWrapper';
import NotifyWrapper from './Components/NotifyWrapper';

import Router from './Components/Router';
import Collection from './Actions/Collection';
import { Local } from './Utils/Storage';

// console.log('process.env', process.env);

export default class App extends Component {
  componentDidMount() {
    Promise.resolve()
      .then(() => this.createMissingFiles())
      .then(() => this.clearArchive())
      .catch(err => console.error('Init Error', err));
  }

  render() {
    return (
      <ErrorWrapper>
        <ThemeWrapper>
          <NotifyWrapper>
            <Router />
          </NotifyWrapper>
        </ThemeWrapper>
      </ErrorWrapper>
    );
  }

  createMissingFiles() {
    return 'authors books genres loans positions publishers users'.split(' ').reduce(
      (previous, current) =>
        previous.then(() => {
          const cll = new Collection(current);
          return cll.Stats().catch((err) => {
            if (err.code === 'ENOENT') {
              return cll.Create();
            }
            throw new Error(err);
          });
        }),
      Promise.resolve(1),
    );
  }

  clearArchive() {
    const now = +new Date();
    const { keepArchived = 'week' } = Local.get('Settings') || {};

    if (keepArchived === 'forever') {
      return;
    }

    const timeDelta = {
      day: 86400000,
      week: 86400000 * 7,
      month: 86400000 * 30,
      year: 86400000 * 365,
    }[keepArchived];

    if (!timeDelta) {
      console.error('Time delta not found', keepArchived);
      return;
    }

    return 'authors books genres loans positions publishers users'.split(' ').reduce(
      (previous, current) =>
        previous.then(() => {
          const cll = new Collection(current);
          return cll.Read().then((json) => {
            const filtered = json.filter(item => !item.archived || item.archived + timeDelta > now);
            return cll.Update(filtered);
          });
        }),
      Promise.resolve(1),
    );
  }
}
